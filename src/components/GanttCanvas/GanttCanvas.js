import React, { useCallback, useEffect, useRef } from "react";
import moment from "moment";
import { fills } from "./fills";
import { ganttDataCreator } from "../../utils/ganttData";
import classes from "./GanttCanvas.module.sass";

export const GanttCanvas = () => {
  const { gantt, gantt__title, gantt__chart } = classes;
  const { RED } = fills;

  const canvasRef = useRef(null);
  const ganttRef = useRef(null);

  const chartWidth = 5430;

  let dragActive = false;
  let startX = 0;
  let chartTranslateX = 0;

  const activateDrag = e => {
    dragActive = true;
    startX = e.pageX;
  };

  const disableDrag = () => {
    dragActive = false;
  };

  const getDateXCoord = useCallback(
    date => {
      const startDate = moment(new Date().setHours(0, 0, 0, 0)).subtract(
        90,
        "days"
      );
      const endDate = moment(new Date().setHours(0, 0, 0, 0)).add(90, "days");
      return (chartWidth / (endDate - startDate)) * (date - startDate);
    },
    [chartWidth]
  );

  const drawRect = useCallback(
    chart => {
      chart.fillStyle = RED;
      chart.fillRect(0, 200, 100, 12);
    },
    [RED]
  );
  const { ganttData } = new ganttDataCreator(5);

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
      const PIXEL_RATIO = window.devicePixelRatio;
      canvas.width = canvas.offsetWidth * PIXEL_RATIO;
      canvas.height = canvas.offsetHeight * PIXEL_RATIO;
      chart.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
      drawChart();
    };

    const onDrag = e => {
      if (dragActive) {
        const delta = e.pageX - startX;
        startX = e.pageX;
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
        onMouseDown={activateDrag}
      >
        Данный виджет не поддерживается вашим браузером
      </canvas>
    </div>
  );
};
