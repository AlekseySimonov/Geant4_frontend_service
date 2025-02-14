import { describe, expect, test } from '@jest/globals';
import { Sum } from '@/shared/Sum';
describe('sum module', function () {
    test('adds 1 + 2 to equal 3', function () {
        expect(Sum(1, 2)).toBe(3);
    });
});
