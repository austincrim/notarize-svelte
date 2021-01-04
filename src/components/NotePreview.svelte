<script>
    export let note;
    export let selected;

    import { slide } from "svelte/transition";
</script>

<div
    on:click
    transition:slide
    class={`flex flex-col gap-2 p-4 rounded ${selected && 'bg-gray-200'} hover:bg-gray-200 active:bg-gray-300 transform hover:-translate-y-1 active:translate-y-1 hover:shadow-lg transition-all duration-100`}>
    <div class="text-lg font-mono">{note.title}</div>
    <div class="text-sm">{new Date(note.dateEdited).toLocaleDateString()}</div>
</div>
