import React from "react";

import { GanttCanvas } from "./components/GanttCanvas/GanttCanvas";
import { GanttD3 } from "./components/GanttD3/GanttD3";

import { ganttDataCreator } from "./utils/ganttData";

import classes from "./App.module.sass";

export const App = () => {
  const { app } = classes;
  const { ganttData } = new ganttDataCreator(5);

  return (
    <div className={app}>
      <GanttD3 data={ganttData} />
      <GanttCanvas data={ganttData} />
    </div>
  );
};
