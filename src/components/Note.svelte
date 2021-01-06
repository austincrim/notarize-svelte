<script lang="ts">
    export let note: Note;

    import marked from "marked";
    import prism from "prismjs";
    import { afterUpdate } from "svelte";
    import { slide } from "svelte/transition";
    import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
    import { saveNote } from "../client/notes";
    import Button from "./Button.svelte";
    import type Note from "../types/Note";

    let editing = false;
    let initialContent = note.content;
    $: displayDate =
        new Date(note.dateEdited).getDate() === new Date().getDate()
            ? new Date(note.dateEdited).toLocaleTimeString()
            : new Date(note.dateEdited).toLocaleDateString();

    const queryClient = useQueryClient();

    const saveMutation = useMutation(saveNote, {
        onSuccess: () => {
            queryClient.invalidateQueries("notes");
        },
    });

    afterUpdate(() => {
        prism.highlightAll();
    });
</script>

<div transition:slide class="flex justify-between">
    <div class="flex flex-col gap-2">
        {#if !editing}
            <h2 class="text-2xl">{note.title}</h2>
        {:else}
            <input class="bg-gray-100 p-2 rounded" bind:value={note.title} />
        {/if}
        <div class="text-gray-600">{displayDate}</div>
    </div>
    <div class="space-x-2">
        {#if !editing}
            <Button on:click={() => (editing = true)}>Edit</Button>
        {:else}
            <Button
                on:click={() => {
                    editing = false;
                    $saveMutation.mutate({ ...note, dateEdited: new Date() });
                }}
                type="primary">
                Save
            </Button>
            <Button
                on:click={() => {
                    editing = false;
                    note.content = initialContent;
                }}>
                Cancel
            </Button>
        {/if}
    </div>
</div>

{#if editing}
    <textarea
        bind:value={note.content}
        class="bg-gray-100 mt-10 p-2 min-h-screen min-w-full rounded" />
{:else}
    <p class="mt-10 prose max-w-1/2">
        {@html marked(note.content)}
    </p>
{/if}
