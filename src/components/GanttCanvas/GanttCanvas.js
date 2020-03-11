import React, { useCallback, useEffect, useRef, useState } from "react";
import { fills } from "./fills";
import { chartConfig } from "./canvasConfig";
import classes from "./GanttCanvas.module.sass";

export const GanttCanvas = () => {
  const { gantt, gantt__title, gantt__chart } = classes;
  const { RED } = fills;
  const { rectHeight, ganttPadding } = chartConfig;
  const [canvasWidth, setCanvasWidth] = useState(
    window.innerWidth - ganttPadding
  );

  const canvasRef = useRef(null);
  const ganttRef = useRef(null);

  const dragActive = useRef(false);
  const startX = useRef(0);

  const activateDrag = e => {
    dragActive.current = true;
    startX.current = e.pageX;
  };

  const disableDrag = () => {
    dragActive.current = false;
  };

  // const getDateXCoord = useCallback(
  //   date => {
  //     const startDate = moment(new Date().setHours(0, 0, 0, 0)).subtract(
  //       90,
  //       "days"
  //     );
  //     const endDate = moment(new Date().setHours(0, 0, 0, 0)).add(90, "days");
  //     return (chartWidth / (endDate - startDate)) * (date - startDate);
  //   },
  //   [chartWidth]
  // );

  const drawRect = useCallback(
    (chart, x = 0, y = 0, width = 200) => {
      chart.fillStyle = RED;
      chart.fillRect(x, y, width, rectHeight);
    },
    [RED, rectHeight]
  );

  // const drawLine = useCallback(chart => {
  //   chart.fillStyle = WHITE;
  // }, []);

  const drawChart = useCallback(
    (translateX = 0) => {
      const canvas = canvasRef.current;
      const chart = canvas.getContext("2d");
      chart.clearRect(0, 0, canvas.width, canvas.height);
      chart.scale(1, 1);
      chart.translate(translateX, 0);
      drawRect(chart);
    },
    [drawRect]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const chart = canvas.getContext("2d");

    const onResize = () => {
      setCanvasWidth(window.innerWidth - ganttPadding);
      const PIXEL_RATIO = window.devicePixelRatio;
      canvas.width = canvas.offsetWidth * PIXEL_RATIO;
      canvas.height = canvas.offsetHeight * PIXEL_RATIO;
      chart.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
      drawChart();
    };

    const onDrag = e => {
      if (dragActive.current) {
        const delta = e.pageX - startX.current;
        startX.current = e.pageX;
        drawChart(delta);
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", disableDrag);

    onResize(chart);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", disableDrag);
    };
  }, [drawChart, ganttPadding]);

  return (
    <div className={gantt} ref={ganttRef}>
      <div className={gantt__title}>Canvas</div>
      <canvas
        ref={canvasRef}
        id="gantt-canvas"
        className={gantt__chart}
        width={canvasWidth}
        height={400}
        onMouseDown={activateDrag}
      >
        Данный виджет не поддерживается вашим браузером
      </canvas>
    </div>
  );
};
