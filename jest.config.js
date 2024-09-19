// module.exports = {
//     transform: {
//       '^.+\\.[tj]sx?$': 'babel-jest',
//     },
//     transformIgnorePatterns: [
//       '/node_modules/(?!(@nanostores|nanostores)/)', // Transforma nanostores y @nanostores/react
//     ],
//     moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx']
//   };
module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(@nanostores|nanostores)/)', // Transforma nanostores y @nanostores/react
    ],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  };  
  