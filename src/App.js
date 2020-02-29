import React from "react";

import { GanttCanvas } from "./components/GanttCanvas/GanttCanvas";

import classes from "./App.module.sass";

export const App = () => {
  const { app } = classes;
  return (
    <div className={app}>
      <GanttCanvas />
    </div>
  );
};
