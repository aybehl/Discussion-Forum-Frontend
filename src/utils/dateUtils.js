import {format, parseISO} from 'date-fns';

export const formatISODate = (isoString) => {
  const date = parseISO(isoString);
  const day = format(date, 'do'); // Adds ordinal suffix (e.g., 5th)
  const month = format(date, 'MMM'); // Month abbreviation (e.g., Nov)
  const year = format(date, 'yy'); // Two-digit year (e.g., 24)
  return `${day} ${month} ${year}`;
};

