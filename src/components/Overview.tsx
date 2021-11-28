import { ScaleIcon, CashIcon, ClockIcon } from '@heroicons/react/outline';
import React, { useEffect, useRef } from 'react';
import useClockStore from '../store/clockStore';
import useOverviewStore from '../store/overviewStore';
import { timeString } from '../utils';

const currencies = [
  { id: 1, name: 'USD' },
  { id: 2, name: 'EUR' },
  { id: 3, name: 'CHF' },
  { id: 4, name: 'GBP' },
  { id: 5, name: 'CAD' },
];

const Overview: React.FC = () => {
  let interval = useRef<number>(0);

  const { clockList } = useClockStore();
  const {
    timerOn,
    timerTime,
    currency,
    money,
    updateOverviewClock,
    resetOverviewClock,
    setCurrency,
    setMoney,
  } = useOverviewStore();

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
    { name: 'Cashclocks', icon: ScaleIcon, amount: clockList.length },
    {
      name: 'Time',
      icon: ClockIcon,
      amount: timeString(timerTime),
      reset: resetOverviewClock,
    },
    {
      name: 'Money',
      icon: CashIcon,
      amount: `${money} ${currency}`,
      reset: setMoney,
    },
  ];

  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg leading-6 font-medium text-white'>Overview</h1>
        <div className='group inline-block'>
          <button className='outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center'>
            <span className='pr-1 font-semibold flex-1'>{currency}</span>
            <span>
              <svg
                className='fill-current h-4 w-4 transform group-hover:-rotate-180
    transition duration-150 ease-in-out'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </span>
          </button>
          <ul
            className='bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
transition duration-150 ease-in-out origin-top'
          >
            {currencies.map((currency) => (
              <li
                key={currency.id}
                className='rounded-sm px-3 py-1 hover:bg-gray-100'
                onClick={() => setCurrency(currency.name)}
              >
                {currency.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        {cards.map((card) => (
          <div
            key={card.name}
            className='bg-white overflow-hidden shadow rounded-lg'
          >
            <div className='p-5'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <card.icon
                    className='h-6 w-6 text-gray-400'
                    aria-hidden='true'
                  />
                </div>
                <div className='ml-5 w-0 flex-1'>
                  <dl>
                    <dt className='text-sm font-medium text-gray-500 truncate'>
                      {card.name}
                    </dt>
                    <dd>
                      <div className='text-lg font-medium text-gray-900'>
                        {card.amount}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-5 py-1'>
              {card.reset && (
                <span onClick={() => card.reset()} className='text-sm'>
                  Reset
                </span>
              )}
              {!card.reset && <span className='text-sm'>&nbsp;</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
