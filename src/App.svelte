<script>
    import { v4 as uuid } from 'uuid';
    import { notes } from './stores/notes';
    import NotePreview from './components/NotePreview.svelte';
    import Button from './components/Button.svelte';
    import Note from './components/Note.svelte';
    import Nav from './components/Nav.svelte';
    import MobileNav from './components/MobileNav.svelte';

    let selectedNote = $notes[0];
</script>

<main>
    <MobileNav />
    <div class="grid min-h-screen grid-cols-1 p-8 lg:grid-cols-4 lg:gap-4">
        <ul class="row-start-3 pr-8 space-y-4 lg:row-start-auto lg:border-r">
            {#each $notes as note (note.id)}
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
                on:click={() => ($notes = [...$notes, { id: uuid(), dateEdited: new Date(), title: 'New Note', content: '' }])}
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
