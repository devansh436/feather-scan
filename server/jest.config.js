import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  testMatch: ["**/__tests__/**/*.test.ts"],
  clearMocks: true,

  // test coverage
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/__tests__/**",
    "!src/index.ts",
  ]
};