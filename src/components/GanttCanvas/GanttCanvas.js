import React, { useRef } from "react";

import classes from "./GanttCanvas.module.sass";

export const GanttCanvas = () => {
  const { gantt, gantt__title, gantt__chart } = classes;
  const canvasRef = useRef(null);

  function createCanvas(canvas) {
    const context2D = canvas.getContext("2d");
  }

  return (
    <div className={gantt}>
      <div className={gantt__title}>Canvas</div>
      <canvas ref={canvasRef} id="gantt-canvas" className={gantt__chart}>
        Данный виджет не поддерживается вашим браузером
      </canvas>
    </div>
  );
};
