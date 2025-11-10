export function formatRate(rate: number, defaultDigits = 2) {
  if (rate == null || isNaN(rate)) return '–';

  let digits = defaultDigits;
  let formatted = rate.toFixed(digits);

  while (Number(formatted) === 0 && digits < 8) {
    digits++;
    formatted = rate.toFixed(digits);
  }

  return Number(formatted);
}
