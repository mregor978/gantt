import React, { useCallback, useEffect, useRef } from "react";

import { fills } from "./fills";

import classes from "./GanttCanvas.module.sass";

export const GanttCanvas = () => {
  const { gantt, gantt__title, gantt__chart } = classes;
  const { RED } = fills;

  const canvasRef = useRef(null);
  const ganttRef = useRef(null);

  const drawRect = useCallback(
    chart => {
      chart.fillStyle = RED;
      chart.fillRect(0, 200, 100, 12);
    },
    [RED]
  );

  const drawChart = useCallback(
    chart => {
      chart.scale(1, 1);
      chart.translate(0, 0);
      drawRect(chart);
    },
    [drawRect]
  );

  useEffect(() => {
    const chart = canvasRef.current.getContext("2d");

    const onResize = () => {
      const PIXEL_RATIO = window.devicePixelRatio;
      chart.width = chart.offsetWidth * PIXEL_RATIO;
      chart.height = chart.offsetHeight * PIXEL_RATIO;
      chart.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
      drawChart(chart);
    };

    window.addEventListener("resize", onResize);
    onResize(chart);

    return window.removeEventListener("resize", onResize);
  }, [drawChart]);

  return (
    <div className={gantt} ref={ganttRef}>
      <div className={gantt__title}>Canvas</div>
      <canvas
        ref={canvasRef}
        id="gantt-canvas"
        className={gantt__chart}
        width={1500}
        height={400}
      >
        Данный виджет не поддерживается вашим браузером
      </canvas>
    </div>
  );
};
