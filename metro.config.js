const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const {withNativeWind} = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = (() => {
  const {transformer, resolver} = config;
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"]
  };
  return config;
})();

module.exports = withNativeWind(config, {input: './src/assets/style/global.css'})
// module.exports = config;