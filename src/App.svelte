<script lang="ts">
    import {
        useQuery,
        useMutation,
        useQueryClient,
    } from '@sveltestack/svelte-query';
    import { v4 as uuid } from 'uuid';
    import NotePreview from './components/NotePreview.svelte';
    import Button from './components/Button.svelte';
    import Note from './components/Note.svelte';
    import { getNotes, saveNote } from './client/notes';
    import type TNote from './types/Note';
    import Nav from './components/Nav.svelte';
    import MobileNav from './components/MobileNav.svelte';

    let selectedNote = null;

    const queryClient = useQueryClient();

    // $ is used when accessing result because useQuery is a Svelte store behind the scenes
    // https://svelte.dev/docs#4_Prefix_stores_with_$_to_access_their_values
    const queryResult = useQuery('notes', getNotes, {
        onSuccess: (data: Array<TNote>) => {
            if (!selectedNote) {
                selectedNote = data[0];
                return;
            }
            if (!data.find((note) => note.id === selectedNote.id)) {
                selectedNote = data[data.length - 1];
                return;
            }
        },
    });

    const mutation = useMutation(saveNote, {
        onMutate: async (newNote: TNote) => {
            await queryClient.cancelQueries('notes');
            const previousNotes = queryClient.getQueryData('notes');
            queryClient.setQueryData('notes', (old: Array<TNote>) => [
                ...old,
                newNote,
            ]);
            return { previousNotes };
        },
        onError: (error, newNote, context: any) => {
            queryClient.setQueryData('notes', context.previousNotes);
        },
        onSuccess: () => queryClient.invalidateQueries('notes'),
    });
</script>

<main>
    <MobileNav />
    <div class="grid min-h-screen grid-cols-1 p-8 lg:grid-cols-4 lg:gap-4">
        {#if $queryResult.isLoading}
            <p class="text-lg">loading...</p>
        {:else if $queryResult.isError}
            <p class="text-lg">{$queryResult.error}</p>
        {:else}
            <ul
                class="row-start-3 px-4 space-y-4 lg:row-start-auto lg:border-r"
            >
                {#each $queryResult.data as note (note.id)}
                    <NotePreview
                        {note}
                        selected={selectedNote === note}
                        on:click={() => (selectedNote = note)}
                    />
                {:else}
                    <li>No notes yet!</li>
                {/each}
                <Button
                    classList="flex justify-center items-center w-full"
                    type="primary"
                    on:click={() => {
                        $mutation.mutate({
                            id: uuid(),
                            title: 'New Note',
                            content: '',
                            dateEdited: new Date(),
                        });
                    }}
                >
                    <svg
                        class="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    Add Note
                </Button>
            </ul>
        {/if}
        <div class="px-4 lg:col-span-2">
            {#if selectedNote}
                <Note note={selectedNote} />
            {/if}
        </div>

        <div
            class="flex flex-col justify-end row-start-4 lg:row-start-auto lg:justify-between lg:border-l"
        >
            <Nav />
            <footer class="w-full text-sm text-center text-gray-500">
                Austin Crim | 2021
            </footer>
        </div>
    </div>
</main>
