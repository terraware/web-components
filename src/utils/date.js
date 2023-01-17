const { DateTime } = require('luxon');

/**
 * Helper util that returns default time zone as a fallback.
 */
const tz = (timeZoneId) => timeZoneId || 'Etc/UTC';

/**
 * Parse a date string with zone implied.
 * eg. '2023-01-10 in 'America/Los_Angeles'
 */
const getDateFromString = (date, timeZoneId) => {
  return DateTime.fromFormat(`${date} ${tz(timeZoneId)}`, 'yyyy-MM-dd z');
};

/**
 * Parse a date from milliseconds, with time zone implied.
 */
const getDateFromMillis = (date, timeZoneId) => {
  const millis = new Date(date).getTime();

  return DateTime.fromMillis(millis, { zone: tz(timeZoneId) });
};

/**
 * Return the display value for a date in ISO 8601 format.
 */
const getDisplayValue = (date) => {
  if (date.isValid) {
    return date.toFormat('yyyy-MM-dd');
  }

  return date.toString();
};

/**
 * Utility that constructs a valid DateTime object from
 * any date value passed in ('2023-01-10' or millis or a utc string).
 */
const getDate = (date, timeZoneId) => {
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
 * Default  function that provides a display value for a date
 * with optional implied time zone.
 */
const getDateDisplayValue = (date, timeZoneId) => {
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
 const getTodaysDateFormatted = (timeZoneId) => {
  return getDisplayValue(DateTime.now().setZone(tz(timeZoneId)));
};

/**
 * Checks if a date is in the future, time zone for date is optional.
 */
 const isInTheFuture = (date, timeZoneId) => {
  const d = getDate(date, timeZoneId);
  if (d.isValid) {
    return d.toMillis() > Date.now();
  }

  return false;
};

const d = Date.now();
console.log(d);
console.log(getDate(d, 'America/Los_Angeles'));
console.log(getDateDisplayValue(d, 'Australia/Sydney'));
