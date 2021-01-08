export async function getNotes() {
    const res = await fetch('/.netlify/functions/getNotes');
    const data = await res.json();
    return data.sort((a, b) => {
        if (a.dateEdited > b.dateEdited) return 1;
        if (a.dateEdited < b.dateEdited) return -1;
        return 0;
    });
}

export async function saveNote(note) {
    return await fetch('/.netlify/functions/saveNote', {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function deleteNote(note) {
    return await fetch('/.netlify/functions/deleteNote', {
        method: 'POST',
        body: JSON.stringify({ id: note.id }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
