import { writable } from 'svelte/store';

const notes = fetch(`${process.env.URL}/.netlify/functions/hello`).then(res => res.json());

export const notesStore = writable(notes);
