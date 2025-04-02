import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	rootDir: '../../', 
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		"\\.(css|scss)$": "identity-obj-proxy",
	},
	transform: {
		".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub"
	},
	testMatch: [
		'**/src/**/*.(test|spec).{ts,tsx}',
		'**/tests/**/*.(test|spec).{ts,tsx}',
	],
	setupFilesAfterEnv: ["<rootDir>/config/tests/jest.setup.ts"],
};

export default config;
