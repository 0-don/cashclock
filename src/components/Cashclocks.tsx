import React, { Fragment } from "react";
import { BsPlusCircle } from "react-icons/bs";

import { ClockStore } from "../store/ClockStore";
import { OverviewStore } from "../store/OverviewStore";
import Clock from "./Clock";

const Cashclocks: React.FC = () => {
  const { clockList, createClock } = ClockStore();
  const { currency } = OverviewStore();

  return (
    <div>
      <div className="mx-auto mt-6 max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-medium leading-6 text-white">Cashclocks</h2>
      </div>

      <div className="">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-2 flex flex-col">
            <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
              <table className="min-w-full table-fixed divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="w-1/6 bg-gray-50 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                      Label
                    </th>
                    <th className="w-1/6 bg-gray-50 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                      {currency} / hour
                    </th>
                    <th className="w-1/6 bg-gray-50 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                      Controls
                    </th>
                    <th className="w-1/6 bg-gray-50 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                      Time
                    </th>
                    <th className="w-1/6 bg-gray-50 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                      Amount
                    </th>
                    <th className="w-1/6 bg-gray-50 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      Reset/Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {clockList.map((clock) => (
                    <Fragment key={clock.id}>
                      <Clock clock={clock} />
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex max-w-6xl justify-end sm:px-6">
              <button
                onClick={createClock}
                type="button"
                className=" rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <BsPlusCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cashclocks;
