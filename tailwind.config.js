module.exports = {
    purge: {
        mode: 'all',
        content: ['./**/**/*.html', './**/**/*.svelte'],

        options: {
            whitelistPatterns: [/svelte-/],
            defaultExtractor: content =>
                [...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
                    ([_match, group, ..._rest]) => group
                ),
        },
    },

    theme: {
        extend: {},
    },
    variants: {
        extend: {
            backgroundColor: ['active'],
            translate: ['active'],
        },
    },
    plugins: [require('@tailwindcss/typography')],
    future: {
        // purgeLayersByDefault: true,
        // removeDeprecatedGapUtilities: true,
    },
};
