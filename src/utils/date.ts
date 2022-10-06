const getDateDisplayValue = (date: string | number) => new Date(date).toISOString().split('T')[0];

export const getTodaysDateFormatted = () => {
  return getDateDisplayValue(Date.now());
};

export const isInTheFuture = (date: any) => {
  const d = new Date(date);
  const utc = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());

  return utc > Date.now();
};

export default getDateDisplayValue;
