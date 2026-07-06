module.exports = {
  preset: 'jest-preset-angular',
  testPathIgnorePatterns: ['/node_modules/', '/src/test\\.ts$'],
  testRunner: 'jest-jasmine2',
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': ['jest-preset-angular', {
      stringifyContentPathRegex: '\\.(html|svg)$',
      tsconfig: '<rootDir>/tsconfig.spec.json',
      allowSyntheticDefaultImports: true,
    }]
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|date-fns/esm)'],
  setupFiles: ['<rootDir>/tests/mocks/matchMedia.js'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  modulePathIgnorePatterns: ['package.json'],
  moduleNameMapper: {
    'lodash-es/(.*)': 'lodash/$1',
    'lodash-es': 'lodash',
    'ob-ui-libs/(.*)': '<rootDir>/dist/$1',
    '@secureapigateway/secure-api-gateway-ob-uk-ui-common//(.*)': '<rootDir>/dist/$1',
    '@secureapigateway/secure-api-gateway-ob-uk-ui-common/(.*)': '<rootDir>/dist/$1',
    '<rootDir>/projects/utils/package.json': '<rootDir>/tests/mocks/jsonMock.json',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/mocks/fileMock.js',
    '\\.(css|scss|less)$': '<rootDir>/tests/mocks/styleMock.js'
  }
};
