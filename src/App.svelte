<script>
	import Tailwindcss from "./Tailwindcss.svelte";
	import NotePreview from "./components/NotePreview.svelte";
	import { notesStore } from "./stores/notesStore";
</script>

<Tailwindcss />
<main>
	<div class="grid grid-cols-3 gap-4 p-2">
		<ul class="border-r min-h-screen px-4">
			{#each $notesStore as note}
				<NotePreview
					title={note.title}
					dateEdited={notesStore.dateEdited} />
			{/each}
		</ul>
		<div class="col-span-2 p-4 max-w-4xl">
			<div class="flex flex-col gap-2">
				<h2 class="text-2xl font-bold">I'm a note!</h2>
				<div>12/28/2020</div>
			</div>
			<p class="mt-4">
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Molestiae unde necessitatibus alias dolorum nesciunt officia
				doloribus ipsam. Iste repellendus deleniti ipsam incidunt
				commodi quod quaerat! At soluta temporibus natus inventore!
			</p>
		</div>
	</div>
</main>
