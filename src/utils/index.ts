import produce, { Draft } from 'immer';
import { State, StateCreator } from 'zustand';

export const immer =
  <T extends State>(
    config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
  ): StateCreator<T> =>
  (set, get, api) =>
    config((fn) => set(produce<T>(fn)), get, api);

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
