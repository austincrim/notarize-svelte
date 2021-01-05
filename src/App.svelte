<script>
	import {
		useQuery,
		useMutation,
		useQueryClient,
	} from "@sveltestack/svelte-query";
	import { v4 as uuid } from "uuid";
	import NotePreview from "./components/NotePreview.svelte";
	import Button from "./components/Button.svelte";
	import Note from "./components/Note.svelte";
	import { getNotes, saveNote } from "./client/notes";

	let selectedNote = null;

	const queryClient = useQueryClient();

	// $ is used when accessing result because useQuery is a Svelte store behind the scenes
	// https://svelte.dev/docs#4_Prefix_stores_with_$_to_access_their_values
	const queryResult = useQuery("notes", getNotes, {
		onSuccess: (data) => {
			if (!selectedNote) {
				selectedNote = data[0];
				return;
			}
			if (!data.find((note) => note.id === selectedNote.id)) {
				selectedNote = data[data.length - 1];
				return;
			}
		},
	});

	const mutation = useMutation(saveNote, {
		onMutate: async (newNote) => {
			await queryClient.cancelQueries("notes");
			const previousNotes = queryClient.getQueryData("notes");
			queryClient.setQueryData("notes", (old) => [...old, newNote]);
			return { previousNotes };
		},
		onError: (error, newNote, context) => {
			queryClient.setQueryData("notes", context.previousNotes);
		},
		onSuccess: () => queryClient.invalidateQueries("notes"),
	});
</script>

<main>
	<div class="grid grid-cols-4 gap-4 p-8">
		{#if $queryResult.isLoading}
			<p class="text-lg">loading...</p>
		{:else if $queryResult.isError}
			<p class="text-lg">{$queryResult.error}</p>
		{:else}
			<ul class="border-r min-h-screen px-4 space-y-4">
				{#each $queryResult.data as note}
					<NotePreview
						{note}
						selected={selectedNote === note}
						on:click={() => (selectedNote = note)} />
				{:else}
					<li>No notes yet!</li>
				{/each}
				<Button
					classList="hover:bg-blue-300"
					on:click={() => {
						$mutation.mutate({
							id: uuid(),
							title: 'New Note',
							content: '',
							dateEdited: new Date(),
						});
					}}>
					New Note
				</Button>
			</ul>
		{/if}
		<div class="col-span-2 p-4">
			{#if selectedNote}
				<Note note={selectedNote} />
			{/if}
		</div>
		<div class="border-l" />
	</div>
</main>
