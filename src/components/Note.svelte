<script lang="ts">
    export let note: Note;

    import marked from 'marked';
    import prism from 'prismjs';
    import { afterUpdate } from 'svelte';
    import { slide } from 'svelte/transition';
    import { notes } from '../stores/notes';
    import Button from './Button.svelte';
    import type Note from '../types/Note';

    let editing = false;
    $: initialContent = note.content;
    $: displayDate =
        new Date(note.dateEdited).getDate() === new Date().getDate()
            ? new Date(note.dateEdited).toLocaleTimeString()
            : new Date(note.dateEdited).toLocaleDateString();

    afterUpdate(() => {
        prism.highlightAll();
    });
</script>

<div transition:slide class="flex justify-between">
    <div class="flex flex-col gap-2">
        {#if !editing}
            <h2 class="text-2xl">{note.title}</h2>
        {:else}
            <input
                class="p-2 bg-gray-100 rounded focus:ring"
                bind:value={note.title}
            />
        {/if}
        <div class="text-gray-600">{displayDate}</div>
    </div>
    <div class="space-x-2">
        {#if !editing}
            <Button on:click={() => (editing = true)}>Edit</Button>
        {:else}
            <div class="flex flex-col space-y-2 md:block md:space-x-4">
                <Button
                    on:click={() => {
                        editing = false;
                        note.dateEdited = new Date();
                        $notes = $notes;
                    }}
                    type="primary"
                >
                    Save
                </Button>
                <Button
                    on:click={() => {
                        editing = false;
                        note.content = initialContent;
                    }}
                >
                    Cancel
                </Button>
            </div>
        {/if}
    </div>
</div>

{#if editing}
    <textarea
        bind:value={note.content}
        class="min-w-full min-h-screen p-2 mt-10 bg-gray-100 rounded focus:ring"
    />
{:else}
    <p class="mt-10 prose max-w-1/2">
        {@html marked(note.content)}
    </p>
{/if}
