import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	testMatch: [
		'**/src/**/*.(test|spec).{ts,tsx}',
		'**/tests/**/*.(test|spec).{ts,tsx}',
	],
	rootDir: '../../', 
};

export default config;
