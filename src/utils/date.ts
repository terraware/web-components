import { DateTime } from 'luxon';
import _ from 'lodash';

/**
 * Accepted date types for input are:
 * - string for any date ISO string representation
 * - number for timestamp
 * - JS Date
 * - luxon DateTime
 */
export type DateType = string | number | Date | DateTime;

/**
 * Helper util that returns default time zone as a fallback.
 */
export const tz = (timeZoneId?: string) => timeZoneId || 'Etc/UTC';

/**
 * Parse a date ISO string with zone implied.
 * eg. '2023-01-10 in 'America/Los_Angeles'
 */
const getDateFromISOString = (date: string, timeZoneId?: string) => {
  return DateTime.fromISO(date, { zone: tz(timeZoneId) });
};

/**
 * Parse a date from milliseconds, with time zone implied.
 */
const getDateFromMillis = (date: number, timeZoneId?: string) => {
  const millis = new Date(date).getTime();

  return DateTime.fromMillis(millis, { zone: tz(timeZoneId) });
};

/**
 * Return the display value for a date in ISO 8601 format.
 */
const getDisplayValue = (date: DateTime) => {
  if (date.isValid) {
    return date.toFormat('yyyy-MM-dd');
  }

  return date.toString();
};

/**
 * Utility that constructs a valid DateTime object from
 * any DateType value passed in (ISO string or epoch milliseconds or DateTime object).
 * Note: the DateTime object input support is mostly for ease of use and will essentially be a pass-through.
 */
export const getDate = (date: DateType, timeZoneId?: string) => {
  if (typeof date === 'string') {
    const fromString = getDateFromISOString(date as string, timeZoneId);
    if (fromString.isValid) {
      return fromString;
    }
  }

  if (typeof date === 'number') {
    const fromMillis = getDateFromMillis(date as number, timeZoneId);
    if (fromMillis.isValid) {
      return fromMillis;
    }
  }

  if (_.isDate(date)) {
    return DateTime.fromJSDate(date as Date, { zone: tz(timeZoneId) });
  }

  return (date as DateTime).setZone(tz(timeZoneId));
};

/**
 * Default export function that provides a display value for a date
 * with optional implied time zone.
 */
const getDateDisplayValue = (date: DateType, timeZoneId?: string) => {
  if (typeof date === 'string' && date.match(/^\d\d\d\d-\d\d-\d\d$/)) {
    // if already in display format, return as-is, do not apply time zone
    return date;
  }

  const dateObj = getDate(date, timeZoneId);

  return getDisplayValue(dateObj);
};

/**
 * Exported function that returns todays date in a specific (optional) time zone.
 */
export const getTodaysDateFormatted = (timeZoneId?: string) => {
  return getDisplayValue(DateTime.now().setZone(tz(timeZoneId)));
};

/**
 * Checks if a date is in the future, time zone for date is optional.
 */
export const isInTheFuture = (date: DateType, timeZoneId?: string) => {
  const d = getDate(date, timeZoneId);
  if (d.isValid) {
    return d.toMillis() > Date.now();
  }

  return false;
};

export default getDateDisplayValue;
