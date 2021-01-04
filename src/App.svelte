<script>
	import { useQuery } from "@sveltestack/svelte-query";
	import NotePreview from "./components/NotePreview.svelte";
	import Note from "./components/Note.svelte";
	import { getNotes } from "./client/notes";

	let selectedNote = null;

	// $ is used when accessing result because useQuery is a Svelte store behind the scenes
	// https://svelte.dev/docs#4_Prefix_stores_with_$_to_access_their_values
	const queryResult = useQuery("/getNotes", getNotes, {
		onSuccess: (data) => (selectedNote = data[0]),
	});
</script>

<main>
	<div class="grid grid-cols-3 gap-4 p-2">
		{#if $queryResult.isLoading}
			<p class="text-lg">loading...</p>
		{:else if $queryResult.isError}
			<p class="text-lg">{queryResult.error}</p>
		{:else}
			<ul class="border-r min-h-screen px-4 space-y-4">
				{#each $queryResult.data as note}
					<NotePreview
						{note}
						selected={selectedNote === note}
						on:click={() => (selectedNote = note)} />
				{/each}
			</ul>
		{/if}
		{#if selectedNote}
			<div class="col-span-2 p-4 max-w-4xl">
				<Note note={selectedNote} />
			</div>
		{/if}
	</div>
</main>
