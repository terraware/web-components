const getDateDisplayValue = (date: string | number) => new Date(date).toISOString().split('T')[0];

export const getTodaysDateFormatted = () => {
  return getDateDisplayValue(Date.now());
};

export const isInTheFuture = (date: any) => {
  const d = new Date(getDateDisplayValue(date)).getTime();

  return d > Date.now();
};

export default getDateDisplayValue;
