import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	rootDir: '../../', 
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		"\\.(css|scss)$": "identity-obj-proxy",
	},
	testMatch: [
		'**/src/**/*.(test|spec).{ts,tsx}',
		'**/tests/**/*.(test|spec).{ts,tsx}',
	],
	globals: {
		TextEncoder: require('util').TextEncoder,
		TextDecoder: require('util').TextDecoder,
	},
};

export default config;
