export async function saveNote(note) {
    return await fetch('/.netlify/functions/saveNote', {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function getNotes() {
    const res = await fetch('/.netlify/functions/getNotes');
    return await res.json();
}
