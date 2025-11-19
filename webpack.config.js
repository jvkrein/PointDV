// webpack.config.js

const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Esta é a "mágica":
  // Diz ao Expo: "Quando o código pedir 'react-native-maps',
  // se estivermos na web, use 'react-native-web-maps' no lugar."
  config.resolve.alias['react-native-maps'] = 'react-native-web-maps';

  return config;
};