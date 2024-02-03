const min2Digits = (int: number): string => {
  if (int < 10) {
    return `0${int}`;
  }
  return String(int);
};

export function msToHMS(ms: number): string {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / 1000 / 3600) % 24);

  return [
    min2Digits(hours),
    min2Digits(minutes),
    min2Digits(seconds).substring(0, 6),
  ].join(":");
}
