module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: true,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
          app: './app',
          components: './app/components',
          variables: './app/variables',
          screens: './app/screens',
          theme: './app/theme',
          navigation: './app/navigation',
          types: './app/types',
          enum: './app/enum',
          hooks: './app/hooks',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
