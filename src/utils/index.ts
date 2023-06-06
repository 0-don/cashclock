


export const timeString = (time: number): string => {
  const s = ('0' + Math.floor((time / 1000) % 60)).slice(-2);
  const m = ('0' + Math.floor((time / 60000) % 60)).slice(-2);
  const h = ('0' + Math.floor((time / 3600000) % 3600000)).slice(-2);
  return `${h} : ${m} : ${s}`;
};

export const randomId = (): string => {
  return Math.random().toString(36).substring(2, 7);
};

export const moneyTime = (time: number, money: string): number => {
  const parsedMoney = parseFloat(money.replace(',', '.'));
  return (time * parsedMoney) / 3600000;
};
