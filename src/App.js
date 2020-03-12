import React from "react";

import { GanttCanvas } from "./components/GanttCanvas/GanttCanvas";

import { ganttDataCreator } from "./utils/ganttData";

import classes from "./App.module.sass";

export const App = () => {
  const { app } = classes;
  const { ganttData } = new ganttDataCreator(5);

  return (
    <div className={app}>
      <GanttCanvas data={ganttData} />
    </div>
  );
};
