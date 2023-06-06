import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ClockStore } from "./ClockStore";

type MoneyList = {
  id: string;
  money: number;
};

type OverviewStore = {
  timerOn: boolean;
  timerStart: number;
  timerTime: number;
  money: string;
  moneyList: MoneyList[];
  currency: string;
  startOverviewClock: () => void;
  stopOverviewClock: () => void;
  resetOverviewClock: () => void;
  updateOverviewClock: () => void;
  setCurrency: (name: string) => void;
  setMoney: (money?: string) => void;
  updateMoneyList: (id: string, money: number) => void;
  resetStop: () => void;
};

export const OverviewStore = create<OverviewStore>()(
  immer<OverviewStore>((set) => ({
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    money: "0.00",
    moneyList: [],
    currency: "EUR",
    startOverviewClock: () =>
      set((state) => {
        if (!state.timerOn) {
          state.timerOn = true;
          state.timerStart = Date.now() - state.timerTime;
        }
      }),
    stopOverviewClock: () =>
      set((state) => {
        const clockList = ClockStore.getState().clockList;
        const activeClock = clockList.find((clock) => clock.timerOn === true);
        if (!clockList.length || !activeClock) {
          state.timerOn = false;
        }
        state.money = state.moneyList
          .reduce((prev, cur) => prev + cur.money, 0)
          .toFixed(2);
      }),
    resetOverviewClock: () =>
      set((state) => {
        ClockStore.getState().stopClocks();
        state.timerOn = false;
        state.timerTime = 0;
      }),
    updateOverviewClock: () =>
      set((state) => {
        state.timerTime = Date.now() - state.timerStart;
      }),
    setCurrency: (name) =>
      set((state) => {
        state.currency = name;
      }),
    setMoney: (money = "0.00") =>
      set((state) => {
        ClockStore.getState().stopResetClocks();
        state.money = money;
        state.moneyList = [];
      }),
    updateMoneyList: (id, money) =>
      set((state) => {
        const { moneyList } = state;
        const i = moneyList.findIndex((money) => money.id === id);

        if (i < 0) {
          moneyList.push({ id, money });
        } else {
          moneyList[i].money = money;
        }

        state.money = state.moneyList
          .reduce((prev, cur) => prev + cur.money, 0)
          .toFixed(2);
      }),
    resetStop: () =>
      set((state) => {
        ClockStore.getState().stopResetClocks();
        state.money = "0.00";
        state.moneyList = [];
        state.timerOn = false;
        state.timerTime = 0;
      }),
  }))
);
