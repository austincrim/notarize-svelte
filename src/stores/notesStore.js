import { writable } from 'svelte/store';

const notes = fetch(
    `https://vibrant-snyder-1d0131.netlify.app/.netlify/functions/hello`
).then(res => res.json());

export const notesStore = writable(notes);
