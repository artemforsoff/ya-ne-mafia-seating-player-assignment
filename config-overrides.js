// Overrides create-react-app webpack configs without ejecting
// https://github.com/timarney/react-app-rewired

const { override, addWebpackAlias } = require("customize-cra");
const path = require('path');

module.exports = {
    paths: (paths) => {
        paths.appIndexJs = path.resolve(__dirname, 'src/app/index.tsx');
        paths.appSrc = path.resolve(__dirname, 'src');
        return paths;
    },
    webpack: override(
        addWebpackAlias({
            '@': path.resolve(__dirname, './src'),
        })
    ),
};
