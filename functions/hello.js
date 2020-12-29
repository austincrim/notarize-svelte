const notes = [
    {
        id: 'abc-123',
        title: 'Test note 1',
        dateEdited: new Date('2020-3-22'),
        content: '# Hello World! This is a testing note for the Notary app',
    },
];

exports.handler = async function (event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify(notes),
    };
};
