<script lang="ts">
    export let note: Note;
    export let selected: boolean;

    import { slide } from 'svelte/transition';
    import { notes } from '../stores/notes';
    import type Note from '../types/Note';

    $: displayDate =
        new Date(note.dateEdited).getDate() === new Date().getDate()
            ? new Date(note.dateEdited).toLocaleTimeString()
            : new Date(note.dateEdited).toLocaleDateString();
</script>

<li
    on:click
    transition:slide
    class={`flex justify-between gap-2 p-4 rounded ${selected && 'bg-gray-200'} hover:bg-gray-200 active:bg-gray-300 transition-all duration-100`}
>
    <div class="flex flex-col gap-2">
        <div class="font-serif text-lg">{note.title}</div>
        <div class="text-sm">{displayDate}</div>
    </div>
    <button
        class="focus:ring ring-red-500"
        on:click|stopPropagation={() => ($notes = $notes.filter((n) => n.id !== note.id))}
    >
        <svg
            class="w-6 h-6 text-red-500 hover:text-red-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            focusable="false"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
        </svg>
        <span class="sr-only">Delete Note</span>
    </button>
</li>
