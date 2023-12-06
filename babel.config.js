module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
      },
    ],

    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        envName: 'APP_ENV',
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
