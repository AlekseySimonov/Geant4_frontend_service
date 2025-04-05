import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;