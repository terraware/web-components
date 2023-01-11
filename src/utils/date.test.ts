import getDateDisplayValue, { getTodaysDateFormatted, isInTheFuture } from './date';

test('isInTheFuture should handle date string and specified time zones', () => {
   expect(isInTheFuture('2023-01-10', 'Asia/Bangkok')).toBe(false);
   expect(isInTheFuture('2023-01-10', 'America/Los_Angeles')).toBe(false);
   expect(isInTheFuture('3023-01-10', 'America/Los_Angeles')).toBe(true);
});

test('isInTheFuture should handle date string and default time zone', () => {
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

test('should show todays date formatted for a time zone', () => {
  const formatted = getTodaysDateFormatted('Asia/Bangkok');
  expect(!!formatted.match(/\d\d\d\d-\d\d-\d\d/)).toBe(true);
});

test('should show todays date formatted for default time zone', () => {
  const formatted = getTodaysDateFormatted();
  expect(!!formatted.match(/\d\d\d\d-\d\d-\d\d/)).toBe(true);
});

test('should return valid date display value for javascript date string with time zones', () => {
  expect(getDateDisplayValue('2021-08-05T19:39:16Z', 'America/Los_Angeles')).toBe('2021-08-05');
  expect(getDateDisplayValue('2021-08-05T19:39:16Z', 'Asia/Bangkok')).toBe('2021-08-06');
});

test('should return valid date display value for javascript date string with default time zone', () => {
  expect(getDateDisplayValue('2021-08-05T19:39:16Z')).toBe('2021-08-05');
});

test('should return valid date display value for default date format string with time zones', () => {
  expect(getDateDisplayValue('2021-08-05', 'America/Los_Angeles')).toBe('2021-08-05');
  expect(getDateDisplayValue('2021-08-05', 'Asia/Bangkok')).toBe('2021-08-05');
});

test('should return valid date display value for default date string with default time zone', () => {
  expect(getDateDisplayValue('2021-08-05')).toBe('2021-08-05');
});

test('should return valid date display value for millis with default time zone', () => {
  expect(getDateDisplayValue(new Date('2021-08-05T19:39:16Z').getTime())).toBe('2021-08-05');
});

test('should return valid date display value for millis with time zones', () => {
  expect(getDateDisplayValue(new Date('2021-08-05T19:39:16Z').getTime(), 'America/Los_Angeles')).toBe('2021-08-05');
  expect(getDateDisplayValue(new Date('2021-08-05T19:39:16Z').getTime(), 'Asia/Bangkok')).toBe('2021-08-06');
});
