module.exports = {
    addons: ['@storybook/addon-actions', {
        name: '@storybook/addon-postcss',
        options: {
            postcssLoaderOptions: {
                implementation: require('postcss'),
            },
        },
    }, '@storybook/addon-viewport', '@storybook/addon-backgrounds', 'storybook-addon-styled-component-theme/dist/preset'],
    stories: ['../stories/**/*.stories.tsx'],
    typescript: {
        check: false,
        checkOptions: {},
    },
};