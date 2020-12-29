<script>
	import Tailwindcss from "./Tailwindcss.svelte";
	import NotePreview from "./components/NotePreview.svelte";
	import Note from "./components/Note.svelte";
	const notes = fetch("/.netlify/functions/hello").then((res) => res.json());

	let selectedNote = null;
</script>

<Tailwindcss />
<main>
	<div class="grid grid-cols-3 gap-4 p-2">
		{#await notes}
			<p class="text-lg">loading...</p>
		{:then notes}
			<ul class="border-r min-h-screen px-4 space-y-4">
				{#each notes as note}
					<NotePreview
						title={note.title}
						dateEdited={new Date(note.dateEdited)}
						selected={selectedNote === note}
						on:click={() => (selectedNote = note)} />
				{/each}
			</ul>
			{#if selectedNote}
				<div class="col-span-2 p-4 max-w-4xl">
					<Note note={selectedNote} />
				</div>
			{/if}
		{:catch error}
			{error}
		{/await}
	</div>
</main>
