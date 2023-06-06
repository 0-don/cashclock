import React, { useEffect, useRef, useState } from "react";
import {
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiOutlineClockCircle,
  AiOutlineMinusSquare,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { SlRefresh } from "react-icons/sl";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { Clock, ClockStore } from "../store/xClockStore";
import { OverviewStore } from "../store/xOverviewStore";
import { timeString } from "../utils";

interface StopwatchProps {
  clock: Clock;
}

const Stopwatch: React.FC<StopwatchProps> = ({ clock }) => {
  const interval = useRef<number>(0);
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
  } = ClockStore();
  const { currency, startOverviewClock, stopOverviewClock } = OverviewStore();

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
    <tr className="bg-white">
      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
        <input
          type="text"
          className="focus:shadow-outline w-full appearance-none rounded border px-1 py-1 text-center leading-tight text-gray-700 shadow focus:outline-none"
          value={clock.name}
          placeholder="Label"
          onChange={(e) => changeName(clock.id, e.target.value)}
        />
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
        <div className="relative mt-1 rounded-md shadow-sm">
          <div>
            <input
              type="text"
              className="focus:shadow-outline w-full appearance-none rounded border px-1 py-1 text-center leading-tight text-gray-700 shadow focus:outline-none"
              value={clock.moneyHour}
              onChange={(e) => changeMoneyHour(clock.id, e.target.value)}
            />
          </div>
        </div>
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
        {!clock.timerOn && (
          <button
            onClick={() => {
              startClock(clock.id);
              startOverviewClock();
            }}
            className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <AiFillPlayCircle className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        {clock.timerOn && (
          <button
            onClick={() => {
              stopClock(clock.id);
              stopOverviewClock();
            }}
            className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <AiFillPauseCircle className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
        <div className="group inline-flex space-x-2 truncate text-sm">
          <Popover
            isOpen={isPopoverOpen}
            positions={["top", "left"]}
            padding={5}
            reposition={false}
            onClickOutside={() => setIsPopoverOpen(false)}
            content={({ position, childRect, popoverRect }) => (
              <ArrowContainer
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowColor={"gray"}
                arrowSize={10}
                arrowStyle={{ opacity: 0.7 }}
                className="popover-arrow-container"
                arrowClassName="popover-arrow"
              >
                <div className="grid grid-cols-3 items-center justify-items-center gap-1 bg-white p-2 align-middle shadow">
                  <button
                    // Hour+
                    onClick={() => {
                      updateClockTime(clock.id, 3600000);
                    }}
                    className="rounded-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <AiOutlinePlusCircle
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    // Minute+
                    onClick={() => updateClockTime(clock.id, 60000)}
                    className="rounded-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <BsChevronUp
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    // Second+
                    onClick={() => updateClockTime(clock.id, 1000)}
                    className="rounded-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <FaChevronUp
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </button>

                  <div className="text-center">h</div>
                  <div className="text-center">m</div>
                  <div className="text-center">s</div>

                  <button
                    // Hour-
                    onClick={() => updateClockTime(clock.id, -3600000)}
                    className="rounded-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <AiOutlineMinusSquare
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    // Minute-
                    onClick={() => updateClockTime(clock.id, -60000)}
                    className="rounded-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <BsChevronDown
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    // Second-
                    onClick={() => updateClockTime(clock.id, -1000)}
                    className="rounded-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <FaChevronDown
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </ArrowContainer>
            )}
          >
            <div
              className="flex"
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              <AiOutlineClockCircle
                className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="truncate pl-1 text-gray-500 group-hover:text-gray-900">
                {timeString(clock.timerTime)}
              </span>
            </div>
          </Popover>
        </div>
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
        <span className="font-medium text-gray-900">
          {`${clock.money.toFixed(2)} ${currency}`}
        </span>
      </td>

      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
        <button
          onClick={() => {
            stopClock(clock.id);
            resetClock(clock.id);
            stopOverviewClock();
          }}
          className="mr-1 inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <SlRefresh className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          onClick={() => {
            stopClock(clock.id);
            deleteClock(clock.id);
            stopOverviewClock();
          }}
          className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <AiOutlineMinusSquare className="h-5 w-5" aria-hidden="true" />
        </button>
      </td>
    </tr>
  );
};

export default Stopwatch;
