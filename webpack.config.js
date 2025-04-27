const createConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async (env, argv) => {
  const config = await createConfigAsync(
    {
      ...env,
      babel: {
        // dangerouslyAddModulePathsToTranspile: ['qoorify-adv-sdk'],
      },
    },
    argv
  );

  return config;
};
