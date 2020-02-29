import React from "react";

import classes from "./GanttCanvas.module.sass";

export const GanttCanvas = () => {
  const { gantt, gantt__title, gantt__chart } = classes;
  return (
    <div className={gantt}>
      <div className={gantt__title}>Canvas</div>
      <canvas className={gantt__chart} />
    </div>
  );
};
