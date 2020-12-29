<script>
	import Tailwindcss from "./Tailwindcss.svelte";
	import NotePreview from "./components/NotePreview.svelte";
</script>

<Tailwindcss />
<main>
	<div class="grid grid-cols-3 gap-4 p-2">
		<ul class="border-r min-h-screen px-4">
			<NotePreview title="I'm a note!" dateEdited={new Date()} />
			<NotePreview
				title="Me too, but a little different"
				dateEdited={new Date('2020-11-10')} />
			<NotePreview
				title="I have a loooong title, but that's ok, I'm still valuable!"
				dateEdited={new Date('2019-03-23')} />
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
