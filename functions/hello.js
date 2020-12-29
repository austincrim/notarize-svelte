const notes = [
    {
        id: 'abc-123',
        title: 'Test note 1',
        dateEdited: new Date('2020-3-22'),
        content: '# Hello World!\nThis is a testing note for the Notary app',
    },
    {
        id: 'def-123',
        title: 'Another testing note',
        dateEdited: new Date('2019-1-13'),
        content: "# It's me again!\nThis is a slightly different testing note for the Notary app.",
    },
];

exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify(notes),
    };
};
