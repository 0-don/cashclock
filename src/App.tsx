import React, { useEffect } from "react";
import Cashclocks from "./components/Cashclocks";
import Stats from "./components/Overview";
import { OverviewStore } from "./store/OverviewStore";

const App: React.FC = () => {
  const { resetStop } = OverviewStore();

  useEffect(() => {
    resetStop();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="background m-0 h-full w-full">
      <div className="mt-5">
        <Stats />
        <Cashclocks />
      </div>
    </div>
  );
};

export default App;
