import React, { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import { fills } from "./fills";
import { chartConfig } from "./canvasConfig";
import classes from "./GanttCanvas.module.sass";

export const GanttCanvas = ({ data }) => {
  const { gantt, gantt__title, gantt__chart } = classes;
  const { RED, WHITE, GREY } = fills;
  const {
    rectHeight,
    ganttPadding,
    linesNumber,
    chartWidth,
    chartHeight,
    dayWidth
  } = chartConfig;
  const [canvasWidth, setCanvasWidth] = useState(
    window.innerWidth - ganttPadding
  );

  const canvasRef = useRef(null);
  const ganttRef = useRef(null);

  const dragActiveRef = useRef(false);
  const startXRef = useRef(0);
  const currentTranslateRef = useRef(0);

  const activateDrag = e => {
    dragActiveRef.current = true;
    if (e.type === "touchstart") {
      startXRef.current = e.changedTouches[0].pageX;
    } else startXRef.current = e.pageX;
  };

  const disableDrag = () => {
    dragActiveRef.current = false;
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
    (chart, x = 0, y = 0, width = 200) => {
      chart.fillStyle = RED;
      chart.fillRect(x, y, width, rectHeight);
    },
    [RED, rectHeight]
  );

  // const drawText = useCallback(
  //   (chart, x = 0, y = 0, width = 200) => {
  //     chart.font = "14px serif";
  //
  //   },
  //   []
  // );

  const drawRects = useCallback(
    (chart, data) => {
      for (let i = 0; i < data.length; i++) {
        const { trips } = data[i];
        for (let j = 0; j < trips.length; j++) {
          const startDate = Date.parse(trips[j].tripStartsOn);
          const endDate = Date.parse(trips[j].tripEndsOn);
          const startX = getDateXCoord(startDate);
          const endX = getDateXCoord(endDate);
          const width = endX - startX;
          const y = 34 + i * 80;
          drawRect(chart, startX, y, width);
        }
      }
    },
    [drawRect, getDateXCoord]
  );

  const drawLine = useCallback(
    (chart, x) => {
      chart.strokeStyle = WHITE;
      chart.beginPath();
      chart.moveTo(x, 0);
      chart.lineTo(x, chartHeight);
      chart.stroke();
      chart.closePath();
    },
    [chartHeight, WHITE]
  );

  const drawLines = useCallback(
    chart => {
      for (let i = 0; i < linesNumber; i++) {
        drawLine(chart, 1 + i * dayWidth);
      }
    },
    [linesNumber, dayWidth, drawLine]
  );

  const drawChart = useCallback(
    (translateX = currentTranslateRef.current) => {
      const canvas = canvasRef.current;
      const chart = canvasRef.current.getContext("2d");
      const maxTranslateX = -chartWidth + canvasWidth;
      let x = translateX;

      if (currentTranslateRef.current > 0) {
        currentTranslateRef.current = 0;
        x = 0;
      }
      if (currentTranslateRef.current < maxTranslateX) {
        currentTranslateRef.current = maxTranslateX;
        x = 0;
      }

      chart.clearRect(0, 0, canvas.width, canvas.height);
      chart.scale(1, 1);
      chart.translate(x, 0);
      chart.fillStyle = GREY;
      chart.fillRect(0, 0, chartWidth, chartHeight);
      drawLines(chart);
      drawRects(chart, data);
    },
    [drawLines, GREY, chartWidth, canvasWidth, chartHeight, drawRects, data]
  );

  const onDrag = useCallback(
    e => {
      const { type } = e;
      if (dragActiveRef.current || type === "wheel") {
        const pageX =
          type === "touchmove" ? e.changedTouches[0].pageX : e.pageX;
        const delta = type === "wheel" ? -e.deltaX : pageX - startXRef.current;
        currentTranslateRef.current += delta;
        startXRef.current = pageX;
        drawChart(delta);
      }
    },
    [drawChart]
  );

  useEffect(() => {
    const onResize = () => {
      const canvas = canvasRef.current;
      const chart = canvas.getContext("2d");
      const PIXEL_RATIO = window.devicePixelRatio;
      const width = window.innerWidth - ganttPadding;
      const maxWidth = 1600 - ganttPadding;

      setCanvasWidth(window.innerWidth > maxWidth ? maxWidth : width);
      canvas.width = canvas.offsetWidth * PIXEL_RATIO;
      canvas.height = canvas.offsetHeight * PIXEL_RATIO;
      chart.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
      drawChart();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", disableDrag);

    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", disableDrag);
    };
  }, [drawChart, ganttPadding, onDrag]);

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
        onTouchStart={activateDrag}
        onTouchMove={onDrag}
        onTouchEnd={disableDrag}
        onWheel={onDrag}
      >
        Данный виджет не поддерживается вашим браузером
      </canvas>
    </div>
  );
};
