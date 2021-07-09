const path = require("path");

module.exports = {
  // 3 options below are to fix Metro not following symlinks in node_modules
  // https://github.com/facebook/metro/issues/1
  // https://github.com/facebook/metro/pull/257#issuecomment-694292507
  resolver: {
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
      }
    ),
  },
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, "../../packages/react-native"),
    path.resolve(__dirname, "../../data"),
  ],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        // https://github.com/facebook/react-native/issues/28801
        inlineRequires: true,
      },
    }),
  },
};
