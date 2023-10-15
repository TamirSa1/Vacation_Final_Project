export default {
    preset: 'ts-jest',
    transform: { '^.+\\.ts?$': 'ts-jest' },
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    "moduleNameMapper": {
        "\\.(css|less)$": "identity-obj-proxy"
      }
 
  }