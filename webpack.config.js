const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development", // "production" | "development" | "none"
    entry: {
        "chromium/contentScript": "./src/chromium/contentScript/index.js",
        "chromium/serviceWorker": "./src/chromium/serviceWorker.js"
    },
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, "buildResults"),
        filename: "[name].js",
        publicPath:"chrome-extension://gjkikholgenelfadphkdbimailkhkonb/"
    }, plugins: [
        new CopyPlugin({
            patterns: [
                {from: "./src/chromium/manifest.json", to: "chromium"},
            ],
        }),
    ],
}