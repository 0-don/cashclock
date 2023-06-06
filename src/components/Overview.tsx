import React, { useEffect, useRef } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";
import { FaBalanceScale } from "react-icons/fa";
import { OverviewStore } from "../store/OverviewStore";
import { ClockStore } from "../store/XlockStore";
import { timeString } from "../utils";

const currencies = [
  { id: 1, name: "USD" },
  { id: 2, name: "EUR" },
  { id: 3, name: "CHF" },
  { id: 4, name: "GBP" },
  { id: 5, name: "CAD" },
];

const Overview: React.FC = () => {
  const interval = useRef<number>(0);
  const { clockList } = ClockStore();
  const {
    timerOn,
    timerTime,
    currency,
    money,
    updateOverviewClock,
    resetOverviewClock,
    setCurrency,
    setMoney,
  } = OverviewStore();

  useEffect(() => {
    if (timerOn && !interval.current) {
      interval.current = window.setInterval(() => {
        updateOverviewClock();
      }, 100);
    }
    if (!timerOn && interval.current) {
      clearInterval(interval.current);
      interval.current = 0;
    }
  }, [timerOn, updateOverviewClock, clockList]);

  const cards = [
    { name: "Cashclocks", icon: FaBalanceScale, amount: clockList.length },
    {
      name: "Time",
      icon: AiOutlineClockCircle,
      amount: timeString(timerTime),
      reset: resetOverviewClock,
    },
    {
      name: "Money",
      icon: BsCashCoin,
      amount: `${money} ${currency}`,
      reset: setMoney,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium leading-6 text-white">Overview</h1>
        <div className="group inline-block">
          <button className="flex items-center rounded-sm border bg-white px-3 py-1 outline-none focus:outline-none">
            <span className="flex-1 pr-1 font-semibold">{currency}</span>
            <span>
              <svg
                className="h-4 w-4 transform fill-current transition
    duration-150 ease-in-out group-hover:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </span>
          </button>
          <ul
            className="absolute origin-top scale-0 transform rounded-sm border bg-white 
transition duration-150 ease-in-out group-hover:scale-100"
          >
            {currencies.map((currency) => (
              <li
                key={currency.id}
                className="rounded-sm px-3 py-1 hover:bg-gray-100"
                onClick={() => setCurrency(currency.name)}
              >
                {currency.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.name}
            className="overflow-hidden rounded-lg bg-white shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <card.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">
                      {card.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {card.amount}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-1">
              {card.reset && (
                <span onClick={() => card.reset()} className="text-sm">
                  Reset
                </span>
              )}
              {!card.reset && <span className="text-sm">&nbsp;</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
