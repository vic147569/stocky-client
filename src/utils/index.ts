const format = (num?: number): number => Math.round((num as number) * 100) / 100;

export const mod = (num?: number) => {
  if ((num as number) / 1000000 >= 1) {
    return `${format((num as number) / 1000000)}m`;
  }
  return num;
};

export default format;
