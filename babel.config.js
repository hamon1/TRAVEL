module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        blacklist: null, // 제외할 변수
        whitelist: null, // 포함할 변수
        safe: false, // .env.example 파일로 검증 여부
        allowUndefined: true, // undefined 허용 여부
      },
    ],
  ],
};
