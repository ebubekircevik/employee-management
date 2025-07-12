import {getObjectKeys, toISODate, fromISODate} from '../src/helperFunctions.js';
import {assert} from '@open-wc/testing';

suite('helperFunctions', () => {
  suite('getObjectKeys', () => {
    test('returns object keys excluding id', () => {
      const obj = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      };
      const result = getObjectKeys(obj);
      assert.deepEqual(result, ['firstName', 'lastName', 'email']);
    });

    test('returns empty array for null input', () => {
      const result = getObjectKeys(null);
      assert.deepEqual(result, []);
    });

    test('returns empty array for undefined input', () => {
      const result = getObjectKeys(undefined);
      assert.deepEqual(result, []);
    });

    test('returns empty array for array input', () => {
      const result = getObjectKeys([1, 2, 3]);
      assert.deepEqual(result, []);
    });

    test('returns empty array for string input', () => {
      const result = getObjectKeys('test');
      assert.deepEqual(result, []);
    });

    test('returns empty array for empty object', () => {
      const result = getObjectKeys({});
      assert.deepEqual(result, []);
    });

    test('excludes custom key when specified', () => {
      const obj = {id: 1, firstName: 'John', lastName: 'Doe'};
      const result = getObjectKeys(obj, 'firstName');
      assert.deepEqual(result, ['id', 'lastName']);
    });
  });

  suite('toISODate', () => {
    test('converts DD/MM/YYYY to YYYY-MM-DD', () => {
      const result = toISODate('25/12/1990');
      assert.equal(result, '1990-12-25');
    });

    test('handles single digit day and month', () => {
      const result = toISODate('05/08/1995');
      assert.equal(result, '1995-08-05');
    });

    test('returns empty string for null input', () => {
      const result = toISODate(null);
      assert.equal(result, '');
    });

    test('returns empty string for undefined input', () => {
      const result = toISODate(undefined);
      assert.equal(result, '');
    });

    test('returns empty string for empty string input', () => {
      const result = toISODate('');
      assert.equal(result, '');
    });

    test('returns empty string for invalid format', () => {
      const result = toISODate('1990-12-25');
      assert.equal(result, '');
    });

    test('returns empty string for incomplete date', () => {
      const result = toISODate('25/12');
      assert.equal(result, '');
    });

    test('returns empty string for malformed date', () => {
      const result = toISODate('25-12-1990');
      assert.equal(result, '');
    });
  });

  suite('fromISODate', () => {
    test('converts YYYY-MM-DD to DD/MM/YYYY', () => {
      const result = fromISODate('1990-12-25');
      assert.equal(result, '25/12/1990');
    });

    test('handles single digit day and month', () => {
      const result = fromISODate('1995-08-05');
      assert.equal(result, '05/08/1995');
    });

    test('returns empty string for null input', () => {
      const result = fromISODate(null);
      assert.equal(result, '');
    });

    test('returns empty string for undefined input', () => {
      const result = fromISODate(undefined);
      assert.equal(result, '');
    });

    test('returns empty string for empty string input', () => {
      const result = fromISODate('');
      assert.equal(result, '');
    });

    test('returns empty string for invalid format', () => {
      const result = fromISODate('25/12/1990');
      assert.equal(result, '');
    });

    test('returns empty string for incomplete date', () => {
      const result = fromISODate('1990-12');
      assert.equal(result, '');
    });

    test('returns empty string for malformed date', () => {
      const result = fromISODate('1990/12/25');
      assert.equal(result, '');
    });
  });

  suite('date conversion round trip', () => {
    test('toISODate and fromISODate are inverse operations', () => {
      const originalDate = '25/12/1990';
      const isoDate = toISODate(originalDate);
      const convertedBack = fromISODate(isoDate);
      assert.equal(convertedBack, originalDate);
    });

    test('fromISODate and toISODate are inverse operations', () => {
      const originalISODate = '1990-12-25';
      const formattedDate = fromISODate(originalISODate);
      const convertedBack = toISODate(formattedDate);
      assert.equal(convertedBack, originalISODate);
    });
  });
});
