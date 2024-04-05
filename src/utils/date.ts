import { DateTime } from 'luxon';

/**
 * Helper util that returns default time zone as a fallback.
 */
const tz = (timeZoneId?: string) => timeZoneId || 'Etc/UTC';

/**
 * Parse a date string with zone implied.
 * eg. '2023-01-10 in 'America/Los_Angeles'
 */
const getDateFromString = (date: string | number, timeZoneId?: string) => {
  return DateTime.fromFormat(`${date} ${tz(timeZoneId)}`, 'yyyy-MM-dd z');
};

/**
 * Parse a date from milliseconds, with time zone implied.
 */
const getDateFromMillis = (date: string | number, timeZoneId?: string) => {
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
 * any date value passed in ('2023-01-10' or millis or a utc string).
 */
const getDate = (date: string | number, timeZoneId?: string) => {
  const fromString = getDateFromString(date, timeZoneId);
  if (fromString.isValid) {
    return fromString;
  }

  const millis = new Date(date).getTime();
  const fromMillis = getDateFromMillis(date, timeZoneId);
  if (fromMillis.isValid) {
    return fromMillis;
  }

  return DateTime.fromJSDate(new Date(date), { zone: tz(timeZoneId) });
};

/**
 * Default export function that provides a display value for a date
 * with optional implied time zone.
 */
const getDateDisplayValue = (date: string | number, timeZoneId?: string) => {
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
export const isInTheFuture = (date: string | number, timeZoneId?: string) => {
  const d = getDate(date, timeZoneId);
  if (d.isValid) {
    return d.toMillis() > Date.now();
  }

  return false;
};

export default getDateDisplayValue;
