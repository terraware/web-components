import { DateTime } from 'luxon';
import getDateDisplayValue, { getTodaysDateFormatted, isInTheFuture } from './date';

test('isInTheFuture should handle date ISO string and specified time zones', () => {
  expect(isInTheFuture('2023-01-10', 'Asia/Bangkok')).toBe(false);
  expect(isInTheFuture('2023-01-10', 'America/Los_Angeles')).toBe(false);
  expect(isInTheFuture('3023-01-10', 'America/Los_Angeles')).toBe(true);
});

test('isInTheFuture should handle date ISO string and default time zone', () => {
  expect(isInTheFuture('2023-01-10')).toBe(false);
  expect(isInTheFuture('3023-01-10')).toBe(true);
});

test('isInTheFuture should handle millis and specified time zones', () => {
  expect(isInTheFuture(Date.now(), 'Asia/Bangkok')).toBe(false);
  expect(isInTheFuture(new Date('3023-01-10').getTime(), 'Asia/Bangkok')).toBe(true);
});

test('isInTheFuture should handle millis and default time zone', () => {
  expect(isInTheFuture(Date.now())).toBe(false);
  expect(isInTheFuture(new Date('3023-01-10').getTime())).toBe(true);
});

test('isInTheFuture should handle JS Date object and specified time zones', () => {
  expect(isInTheFuture(new Date(), 'Asia/Bangkok')).toBe(false);
  expect(isInTheFuture(new Date('3023-01-10'), 'Asia/Bangkok')).toBe(true);
});

test('isInTheFuture should handle JS Date object and default time zone', () => {
  expect(isInTheFuture(new Date())).toBe(false);
  expect(isInTheFuture(new Date('3023-01-10'))).toBe(true);
});

test('isInTheFuture should handle DateTime object and specified time zones', () => {
  expect(isInTheFuture(DateTime.now(), 'Asia/Bangkok')).toBe(false);
  expect(isInTheFuture(DateTime.fromISO('3023-01-10'), 'Asia/Bangkok')).toBe(true);
  // check that a DateTime with preset zone is a no-op
  expect(isInTheFuture(DateTime.now().setZone('Asia/Bangkok'), 'Asia/Bangkok')).toBe(false);
  expect(isInTheFuture(DateTime.fromISO('3023-01-10').setZone('Asia/Bangkok'), 'Asia/Bangkok')).toBe(true);
});

test('isInTheFuture should handle JS Date object and default time zone', () => {
  expect(isInTheFuture(DateTime.now())).toBe(false);
  expect(isInTheFuture(DateTime.fromISO('3023-01-10'))).toBe(true);
});

test('should show todays date formatted for a time zone', () => {
  const formatted = getTodaysDateFormatted('Asia/Bangkok');
  expect(!!formatted.match(/\d\d\d\d-\d\d-\d\d/)).toBe(true);
});

test('should show todays date formatted for default time zone', () => {
  const formatted = getTodaysDateFormatted();
  expect(!!formatted.match(/\d\d\d\d-\d\d-\d\d/)).toBe(true);
});

test('should return valid date display value for ISO date string with time zones', () => {
  expect(getDateDisplayValue('2021-08-05T19:39:16Z', 'America/Los_Angeles')).toBe('2021-08-05');
  expect(getDateDisplayValue('2021-08-05T19:39:16Z', 'Asia/Bangkok')).toBe('2021-08-06');
});

test('should return valid date display value for ISO date string with default time zone', () => {
  expect(getDateDisplayValue('2021-08-05T19:39:16Z')).toBe('2021-08-05');
});

test('should return valid date display value for default date ISO string with time zones', () => {
  expect(getDateDisplayValue('2021-08-05', 'America/Los_Angeles')).toBe('2021-08-05');
  expect(getDateDisplayValue('2021-08-05', 'Asia/Bangkok')).toBe('2021-08-05');
});

test('should return valid date display value for default date string with default time zone', () => {
  expect(getDateDisplayValue('2021-08-05')).toBe('2021-08-05');
});

test('should return valid date display value for millis with default time zone', () => {
  expect(getDateDisplayValue(new Date('2021-08-05T19:39:16Z').getTime())).toBe('2021-08-05');
});

test('should return valid date display value for JS Date object with default time zone', () => {
  expect(getDateDisplayValue(new Date('2021-08-05T19:39:16Z'))).toBe('2021-08-05');
});

test('should return valid date display value for DateTime object with default time zone', () => {
  expect(getDateDisplayValue(DateTime.fromISO('2021-08-05T19:39:16Z'))).toBe('2021-08-05');
});

test('should return valid date display value for millis with time zones', () => {
  expect(getDateDisplayValue(new Date('2021-08-05T19:39:16Z').getTime(), 'America/Los_Angeles')).toBe('2021-08-05');
  expect(getDateDisplayValue(new Date('2021-08-05T19:39:16Z').getTime(), 'Asia/Bangkok')).toBe('2021-08-06');
});

test('should return valid date display value for JS Date object with time zones', () => {
  expect(getDateDisplayValue(new Date('2021-08-05T19:39:16Z'), 'America/Los_Angeles')).toBe('2021-08-05');
  expect(getDateDisplayValue(new Date('2021-08-05T19:39:16Z'), 'Asia/Bangkok')).toBe('2021-08-06');
});

test('should return valid date display value for DateTime object with time zones', () => {
  expect(getDateDisplayValue(DateTime.fromISO('2021-08-05T19:39:16Z'), 'America/Los_Angeles')).toBe('2021-08-05');
  expect(getDateDisplayValue(DateTime.fromISO('2021-08-05T19:39:16Z'), 'Asia/Bangkok')).toBe('2021-08-06');
  // check that a DateTime with preset zone is a no-op
  expect(getDateDisplayValue(DateTime.fromISO('2021-08-05T19:39:16Z').setZone('America/Los_Angeles'), 'America/Los_Angeles')).toBe('2021-08-05');
  expect(getDateDisplayValue(DateTime.fromISO('2021-08-05T19:39:16Z').setZone('America/Los_Angeles'), 'Asia/Bangkok')).toBe('2021-08-06');
});
