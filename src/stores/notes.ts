import { writable } from 'svelte/store';
import type TNote from '../types/Note';
import { v4 as uuid } from 'uuid';

const localStore = (key: string, initial: Array<TNote>) => {
    if (window.localStorage.getItem(key) === null) {
        window.localStorage.setItem(key, JSON.stringify(initial));
    }

    const saved = JSON.parse(window.localStorage.getItem(key));

    const { subscribe, set, update } = writable(saved);

    return {
        subscribe,
        set: (value) => {
            window.localStorage.setItem(key, JSON.stringify(value));
            return set(value);
        },
        update,
    };
};

export const notes = localStore('notes', [
    { id: uuid(), dateEdited: new Date(), title: 'New Note', content: '' },
]);
