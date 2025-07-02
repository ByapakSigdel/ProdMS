const { getDefaultConfig } = require('expo/metro-config'); // If using Expo
// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config'); // If using React Native CLI

const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });