<script>
    export let note;

    import marked from "marked";
</script>

<div class="flex flex-col gap-2">
    <h2 class="text-2xl">{note.title}</h2>
    <div class="text-gray-600">
        {new Date(note.dateEdited).toLocaleDateString()}
    </div>
</div>
<p class="mt-10 prose max-w-1/2">
    {@html marked(note.content)}
</p>
