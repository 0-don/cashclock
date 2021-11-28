import React, { useEffect, useRef, useState } from 'react';
import {
  MinusIcon,
  PauseIcon,
  PlayIcon,
  ClockIcon,
  RefreshIcon,
  PlusIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/outline';
import useClockStore, { Clock } from '../store/clockStore';
import useStatsStore from '../store/overviewStore';
import { timeString } from '../utils';
import { ArrowContainer, Popover } from 'react-tiny-popover';

interface StopwatchProps {
  clock: Clock;
}

const Stopwatch: React.FC<StopwatchProps> = ({ clock }) => {
  let interval = useRef<number>(0);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const {
    startClock,
    stopClock,
    deleteClock,
    updateClock,
    resetClock,
    updateClockTime,
    changeName,
    changeMoneyHour,
  } = useClockStore();
  const { currency, startOverviewClock, stopOverviewClock } = useStatsStore();

  useEffect(() => {
    if (clock.timerOn && !interval.current) {
      interval.current = window.setInterval(() => {
        updateClock(clock.id);
      }, 100);
    }
    if (!clock.timerOn && interval.current) {
      clearInterval(interval.current);
      interval.current = 0;
    }
  }, [clock, updateClock]);

  return (
    <tr className='bg-white'>
      <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500'>
        <input
          type='text'
          className='text-center shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          value={clock.name}
          placeholder='Label'
          onChange={(e) => changeName(clock.id, e.target.value)}
        />
      </td>

      <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500'>
        <div className='mt-1 relative rounded-md shadow-sm'>
          <div>
            <input
              type='text'
              className='text-center shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={clock.moneyHour}
              onChange={(e) => changeMoneyHour(clock.id, e.target.value)}
            />
          </div>
        </div>
      </td>

      <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500'>
        {!clock.timerOn && (
          <button
            onClick={() => {
              startClock(clock.id);
              startOverviewClock();
            }}
            className='inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            <PlayIcon className='h-5 w-5' aria-hidden='true' />
          </button>
        )}
        {clock.timerOn && (
          <button
            onClick={() => {
              stopClock(clock.id);
              stopOverviewClock();
            }}
            className='inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            <PauseIcon className='h-5 w-5' aria-hidden='true' />
          </button>
        )}
      </td>

      <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500'>
        <div className='group inline-flex space-x-2 truncate text-sm'>
          <Popover
            isOpen={isPopoverOpen}
            positions={['top', 'left']}
            padding={5}
            reposition={false}
            onClickOutside={() => setIsPopoverOpen(false)}
            content={({ position, childRect, popoverRect }) => (
              <ArrowContainer
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowColor={'gray'}
                arrowSize={10}
                arrowStyle={{ opacity: 0.7 }}
                className='popover-arrow-container'
                arrowClassName='popover-arrow'
              >
                <div className='bg-white shadow align-middle p-2 grid grid-cols-3 gap-1 justify-items-center items-center'>
                  <button
                    // Hour+
                    onClick={() => {
                      updateClockTime(clock.id, 3600000);
                    }}
                    className='rounded-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    <PlusIcon
                      className='h-5 w-5 text-white'
                      aria-hidden='true'
                    />
                  </button>

                  <button
                    // Minute+
                    onClick={() => updateClockTime(clock.id, 60000)}
                    className='rounded-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    <ChevronUpIcon
                      className='h-5 w-5 text-white'
                      aria-hidden='true'
                    />
                  </button>

                  <button
                    // Second+
                    onClick={() => updateClockTime(clock.id, 1000)}
                    className='rounded-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    <ArrowUpIcon
                      className='h-5 w-5 text-white'
                      aria-hidden='true'
                    />
                  </button>

                  <div className='text-center'>h</div>
                  <div className='text-center'>m</div>
                  <div className='text-center'>s</div>

                  <button
                    // Hour-
                    onClick={() => updateClockTime(clock.id, -3600000)}
                    className='rounded-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    <MinusIcon
                      className='h-5 w-5 text-white'
                      aria-hidden='true'
                    />
                  </button>

                  <button
                    // Minute-
                    onClick={() => updateClockTime(clock.id, -60000)}
                    className='rounded-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    <ChevronDownIcon
                      className='h-5 w-5 text-white'
                      aria-hidden='true'
                    />
                  </button>

                  <button
                    // Second-
                    onClick={() => updateClockTime(clock.id, -1000)}
                    className='rounded-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    <ArrowDownIcon
                      className='h-5 w-5 text-white'
                      aria-hidden='true'
                    />
                  </button>
                </div>
              </ArrowContainer>
            )}
          >
            <div
              className='flex'
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              <ClockIcon
                className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                aria-hidden='true'
              />
              <span className='text-gray-500 pl-1 truncate group-hover:text-gray-900'>
                {timeString(clock.timerTime)}
              </span>
            </div>
          </Popover>
        </div>
      </td>

      <td className='px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500'>
        <span className='text-gray-900 font-medium'>
          {`${clock.money.toFixed(2)} ${currency}`}
        </span>
      </td>

      <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
        <button
          onClick={() => {
            stopClock(clock.id);
            resetClock(clock.id);
            stopOverviewClock();
          }}
          className='inline-flex mr-1 items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          <RefreshIcon className='h-5 w-5' aria-hidden='true' />
        </button>
        <button
          onClick={() => {
            stopClock(clock.id);
            deleteClock(clock.id);
            stopOverviewClock();
          }}
          className='inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          <MinusIcon className='h-5 w-5' aria-hidden='true' />
        </button>
      </td>
    </tr>
  );
};

export default Stopwatch;
