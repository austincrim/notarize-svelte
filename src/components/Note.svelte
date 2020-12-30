<script>
    export let note;

    import marked from "marked";

    let editing = false;
    let initialContent = note.content;
</script>

<div class="flex justify-between">
    <div class="flex flex-col gap-2">
        <h2 class="text-2xl">{note.title}</h2>
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
                    fetch('/.netlify/functions/saveNote', {
                        method: 'POST',
                        body: JSON.stringify(note),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
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
{#if !editing}
    <p class="mt-10 prose max-w-1/2">
        {@html marked(note.content)}
    </p>
{/if}

{#if editing}
    <textarea
        bind:value={note.content}
        class="mt-10 p-2 min-h-screen min-w-full rounded" />
{/if}
