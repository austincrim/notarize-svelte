<script>
    export let note;

    import marked from "marked";
    import prism from "prismjs";
    import { afterUpdate } from "svelte";
    import { slide } from "svelte/transition";
    import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
    import { saveNote } from "../client/notes";

    let editing = false;
    let initialContent = note.content;

    const queryClient = useQueryClient();

    const mutation = useMutation("/saveNote", saveNote, {
        onSuccess: () => {
            queryClient.invalidateQueries("/getNotes");
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
        {:else}<input class="p-2 rounded" bind:value={note.title} />{/if}
        <div class="text-gray-600">
            {new Date(note.dateEdited).toLocaleDateString()}
        </div>
    </div>
    <div>
        {#if !editing}
            <button
                on:click={() => (editing = true)}
                class="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 hover:-translate-y-1 hover:shadow active:translate-y-0 transform transition-all">
                Edit
            </button>
        {:else}
            <button
                on:click={() => {
                    editing = false;
                    $mutation.mutate(note);
                }}
                class="px-4 py-2 rounded bg-green-200 text-green-900 hover:bg-green-300 hover:-translate-y-1 hover:shadow active:translate-y-0 transform transition-all">
                Save
            </button>
            <button
                on:click={() => {
                    editing = false;
                    note.content = initialContent;
                }}
                class="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 hover:-translate-y-1 hover:shadow active:translate-y-0 transform transition-all">
                Cancel
            </button>
        {/if}
    </div>
</div>

{#if editing}
    <textarea
        bind:value={note.content}
        class="mt-10 p-2 min-h-screen min-w-full rounded" />
{:else}
    <p class="mt-10 prose max-w-1/2">
        {@html marked(note.content)}
    </p>
{/if}
