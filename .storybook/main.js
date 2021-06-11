module.exports = {
    addons: ['@storybook/addon-actions', {
        name: '@storybook/addon-postcss',
        options: {
            postcssLoaderOptions: {
                implementation: require('postcss'),
            },
        },
    }, '@storybook/addon-viewport', '@storybook/addon-backgrounds'],
    stories: ['../stories/*.stories.tsx'],
    typescript: {
        check: false,
        checkOptions: {},
    },
};