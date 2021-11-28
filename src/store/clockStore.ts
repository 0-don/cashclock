import create from 'zustand';
import { randomId, immer, moneyTime } from '../utils';
import { persist } from 'zustand/middleware';
import useOverviewStore from './overviewStore';

export type Clock = {
  id: string;
  name: string;
  timerOn: boolean;
  timerStart: number;
  timerTime: number;
  money: number;
  moneyHour: string;
};

type ClockStore = {
  clockList: Clock[];
  startClock: (id: string) => void;
  stopClock: (id: string) => void;
  deleteClock: (id: string) => void;
  createClock: () => void;
  updateClock: (id: string) => void;
  resetClock: (id: string) => void;
  updateClockTime: (id: string, time: number) => void;
  changeName: (id: string, name: string) => void;
  changeMoneyHour: (id: string, moneyHour: string) => void;
  stopResetClocks: () => void;
  stopClocks: () => void;
};

const useClockStore = create<ClockStore>(
  persist(
    immer(
      (set): ClockStore => ({
        clockList: [
          {
            id: randomId(),
            name: '',
            timerOn: false,
            timerStart: 0,
            timerTime: 0,
            money: 0,
            moneyHour: '180',
          },
        ],
        startClock: (id) =>
          set((state) => {
            const { clockList } = state;
            const i = clockList.findIndex((clock) => clock.id === id);
            clockList[i].timerOn = true;
            clockList[i].timerStart = Date.now() - clockList[i].timerTime;
          }),
        stopClock: (id) =>
          set((state) => {
            const { clockList } = state;
            const i = clockList.findIndex((clock) => clock.id === id);
            clockList[i].timerOn = false;
          }),
        deleteClock: (id) =>
          set((state) => {
            const i = state.clockList.findIndex((clock) => clock.id === id);
            state.clockList.splice(i, 1);
          }),
        createClock: () =>
          set((state) => {
            state.clockList.push({
              id: randomId(),
              name: '',
              timerOn: false,
              timerStart: 0,
              timerTime: 0,
              money: 0,
              moneyHour: '180',
            });
          }),
        updateClock: (id) =>
          set((state) => {
            const { clockList } = state;
            const i = clockList.findIndex((clock) => clock.id === id);
            const money = moneyTime(
              clockList[i].timerTime,
              clockList[i].moneyHour
            );

            clockList[i].money = money;
            clockList[i].timerTime = Date.now() - clockList[i].timerStart;

            useOverviewStore.getState().updateMoneyList(clockList[i].id, money);
          }),
        updateClockTime: (id, time) => {
          const clock = useClockStore
            .getState()
            .clockList.find((clock) => clock.id === id);
          const clockTimerOn = clock?.timerOn ? true : false;

          useClockStore.getState().stopClock(id);
          useOverviewStore.getState().stopOverviewClock();
          
          set((state) => {
            const { clockList } = state;
            const i = clockList.findIndex((clock) => clock.id === id);

            if (clockList[i].timerTime + time >= 0) {
              clockList[i].timerTime += time;
            } else {
              clockList[i].timerTime = 0;
            }

            clockList[i].money = moneyTime(
              clockList[i].timerTime,
              clockList[i].moneyHour
            );
            useOverviewStore.getState().updateMoneyList(id, clockList[i].money);
          });
          if (clockTimerOn) {
            useClockStore.getState().startClock(id);
            useOverviewStore.getState().startOverviewClock();
          }
        },
        resetClock: (id) =>
          set((state) => {
            const { clockList } = state;
            const i = clockList.findIndex((clock) => clock.id === id);
            clockList[i].money = 0;
            clockList[i].timerTime = 0;
            useOverviewStore.getState().updateMoneyList(id, clockList[i].money);
          }),
        changeName: (id, name) =>
          set((state) => {
            const i = state.clockList.findIndex((clock) => clock.id === id);
            state.clockList[i].name = name;
          }),
        changeMoneyHour: (id, moneyHour) =>
          set((state) => {
            const i = state.clockList.findIndex((clock) => clock.id === id);
            state.clockList[i].moneyHour = moneyHour;
          }),
        stopResetClocks: () =>
          set((state) => {
            state.clockList.map((clock) => {
              clock.timerOn = false;
              clock.money = 0;
              clock.timerTime = 0;
              return clock;
            });
          }),
        stopClocks: () =>
          set((state) => {
            state.clockList.map((clock) => {
              clock.timerOn = false;
              return clock;
            });
          }),
      })
    ),
    {
      name: 'Clock-Store',
      getStorage: () => localStorage,
    }
  )
);

export default useClockStore;
