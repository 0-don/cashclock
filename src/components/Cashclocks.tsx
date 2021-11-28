import { PlusIcon } from '@heroicons/react/outline';
import React, { Fragment } from 'react';
import Clock from './Clock';
import useClockStore from '../store/clockStore';
import useStatsStore from '../store/overviewStore';

const Cashclocks: React.FC = () => {
  const { clockList, createClock } = useClockStore();
  const { currency } = useStatsStore();

  return (
    <div>
      <div className='max-w-6xl mt-6 mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-lg leading-6 font-medium text-white'>Cashclocks</h2>
      </div>

      <div className=''>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col mt-2'>
            <div className='align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg'>
              <table className='table-fixed min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr>
                    <th className='w-1/6 px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Label
                    </th>
                    <th className='w-1/6 px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      {currency} / hour
                    </th>
                    <th className='w-1/6 px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Controls
                    </th>
                    <th className='w-1/6 px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Time
                    </th>
                    <th className='w-1/6 px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Amount
                    </th>
                    <th className='w-1/6 px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Reset/Delete
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {clockList.map((clock) => (
                    <Fragment key={clock.id}>
                      <Clock clock={clock} />
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='max-w-6xl flex justify-end mt-3 sm:px-6'>
              <button
                onClick={createClock}
                type='button'
                className=' p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                <PlusIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cashclocks;
