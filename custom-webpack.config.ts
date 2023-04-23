// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require("webpack");
const keyPrefix = "BLOG_";
const keys = Object.keys(process.env).filter((key) =>
    key.startsWith(keyPrefix),
);
const env: {
    [key: string]: string;
} = {};
keys.forEach((key) => {
    env[key] = JSON.stringify(process.env[key]);
});
console.log("\n", "env =", env);
module.exports = {
    plugins: [new webpack.DefinePlugin({ ENV_VARS: env })],
};
