import React, { useCallback, useEffect, useRef, useState } from "react";

import { fills } from "./fills";
import { chartConfig } from "./canvasConfig";

import classes from "./GanttCanvas.module.sass";

export const GanttCanvas = data => {
  console.log("render");
  const { gantt, gantt__title, gantt__chart } = classes;
  const { RED, WHITE } = fills;
  const { rectHeight, ganttPadding, lineWidth, dayWidth } = chartConfig;

  const [canvasWidth, setCanvasWidth] = useState(
    window.innerWidth - ganttPadding
  );

  const canvasRef = useRef(null);
  const ganttRef = useRef(null);

  const drawRect = useCallback(
    (chart, x = 0, y = 0, width = 200) => {
      chart.fillStyle = RED;
      chart.fillRect(x, y, width, rectHeight);
    },
    [RED, rectHeight]
  );

  const drawLine = useCallback(chart => {
    chart.fillStyle = WHITE;
  }, []);

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

    const scaleX = useCallback(() => {}, []);

    const onResize = () => {
      setCanvasWidth(window.innerWidth - ganttPadding);
      const PIXEL_RATIO = window.devicePixelRatio;
      chart.width = chart.offsetWidth * PIXEL_RATIO;
      chart.height = chart.offsetHeight * PIXEL_RATIO;
      chart.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
      drawChart(chart);
    };

    window.addEventListener("resize", onResize);
    onResize(chart);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [drawChart, canvasWidth, ganttPadding]);

  return (
    <div className={gantt} ref={ganttRef}>
      <div className={gantt__title}>Canvas</div>
      <canvas
        ref={canvasRef}
        id="gantt-canvas"
        className={gantt__chart}
        width={canvasWidth}
        height={400}
      >
        Данный виджет не поддерживается вашим браузером
      </canvas>
    </div>
  );
};
