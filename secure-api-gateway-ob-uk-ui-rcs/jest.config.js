module.exports = {
  preset: 'jest-preset-angular',
  resolver: '<rootDir>/jest.resolver.js',
  testPathIgnorePatterns: ['/node_modules/', '/src/test\\.ts$'],
  testRunner: 'jest-jasmine2',
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': ['jest-preset-angular', { stringifyContentPathRegex: '\\.(html|svg)$' }]
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|date-fns/esm)'],
  globals: {
    'ts-jest': {
      allowSyntheticDefaultImports: true,
      isolatedModules: true,
      tsconfig: '<rootDir>/projects/rcs/tsconfig.spec.json'
    }
  },
  globalSetup: 'jest-preset-angular/global-setup',
  setupFiles: ['<rootDir>/tests/mocks/matchMedia.js'],
  setupFilesAfterEnv: ['jest-preset-angular/setup-jest'],
  moduleNameMapper: {
    'lodash-es/(.*)': 'lodash/$1',
    'lodash-es': 'lodash',
    '@secureapigateway/secure-api-gateway-ob-uk-ui-common//(.*)': '<rootDir>/../secure-api-gateway-ob-uk-ui-common/dist/$1',
    '@secureapigateway/secure-api-gateway-ob-uk-ui-common/(.*)': '<rootDir>/../secure-api-gateway-ob-uk-ui-common/dist/$1',
    '@tests/(.*)': '<rootDir>/tests/$1',
    '@utils/(.*)': '<rootDir>/utils/$1',
    '@fuse/(.*)': '<rootDir>/projects/@fuse/$1',
    'analytics/(.*)': '<rootDir>/projects/analytics/$1',
    'rcs/(.*)': '<rootDir>/projects/rcs/$1',
    'auth/(.*)': '<rootDir>/projects/auth/$1',
    'directory/(.*)': '<rootDir>/projects/directory/$1',
    'manual-onboarding/(.*)': '<rootDir>/projects/manual-onboarding/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/mocks/fileMock.js',
    '\\.(css|scss|less)$': '<rootDir>/tests/mocks/styleMock.js'
  }
};
