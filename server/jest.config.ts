/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  moduleNameMapper: {
    '@middlewares/(.*)': '<rootDir>/src/middlewares/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@consts/(.*)': '<rootDir>/src/consts/$1',
    '@tcTypes/(.*)': '<rootDir>/src/tcTypes/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@shared/(.*)': '<rootDir>/../shared/$1',
    '@tcExceptions/(.*)': '<rootDir>/src/tcExceptions/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
  automock: false,
  setupFiles: ['<rootDir>/jest.setup.ts', 'dotenv/config'],
};

export default config;
