const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const webpack = require("webpack");
const path = require("path");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          "@solana/web3.js",
          "@solana/spl-token",
        ],
      },
    },
    argv
  );

  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    })
  );

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
    })
  );

  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });

  // Add the fallback modules here
  config.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer"),
  };

  return config;
};
