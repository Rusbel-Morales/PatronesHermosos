export default {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    verbose: true,
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    setupFiles: ["<rootDir>/src/__tests__/jest.setup.ts"], // Load the mock setup
};