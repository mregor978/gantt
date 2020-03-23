import React, { useCallback, useEffect, useRef, useState } from "react";
import { fills } from "../../utils/fills";
import { chartConfig } from "../../utils/chartConfig";
import classes from "../../styles/Gantt.module.sass";

export const GanttCanvas = ({ data }) => {
  const { gantt, gantt__title, gantt__chart } = classes;
  const { RED, WHITE, GREY } = fills;
  const {
    rectHeight,
    ganttPadding,
    linesNumber,
    chartWidth,
    chartHeight,
    dayWidth,
    startDate,
    endDate
  } = chartConfig;
  const [canvasWidth, setCanvasWidth] = useState(
    window.innerWidth - ganttPadding
  );

  const canvasRef = useRef(null);
  const ganttRef = useRef(null);

  const dragActiveRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const currentTranslateRef = useRef(0);
  const xDeltaRef = useRef(0);
  const yDeltaRef = useRef(0);
  const isXPanRef = useRef(false);
  const isYPanRef = useRef(false);

  const activateDrag = e => {
    dragActiveRef.current = true;
    if (e.type === "touchstart") {
      const { pageX, pageY } = e.changedTouches[0];
      startXRef.current = pageX;
      startYRef.current = pageY;
    } else {
      startXRef.current = e.pageX;
      startYRef.current = e.pageY;
    }
  };

  const disableDrag = () => {
    dragActiveRef.current = false;
    isXPanRef.current = false;
    isYPanRef.current = false;
    xDeltaRef.current = 0;
    yDeltaRef.current = 0;
  };

  const getDateXCoords = useCallback(
    date => {
      return (chartWidth / (endDate - startDate)) * (date - startDate);
    },
    [chartWidth, endDate, startDate]
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
          const startX = getDateXCoords(startDate);
          const endX = getDateXCoords(endDate);
          const width = endX - startX;
          const y = 34 + i * 80;
          drawRect(chart, startX, y, width);
        }
      }
    },
    [drawRect, getDateXCoords]
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

      chart.clearRect(0, 0, canvas.width, canvas.height);
      chart.scale(1, 1);
      chart.translate(translateX, 0);
      chart.fillStyle = GREY;
      chart.fillRect(0, 0, chartWidth, chartHeight);
      drawLines(chart);
      drawRects(chart, data);
    },
    [drawLines, GREY, chartWidth, chartHeight, drawRects, data]
  );

  const onDrag = useCallback(
    e => {
      const { type } = e;
      if (type === "touchmove") {
        const { pageX, pageY } = e.changedTouches[0];
        const deltaX = pageX - startXRef.current;
        xDeltaRef.current = xDeltaRef.current += deltaX;
        yDeltaRef.current = pageY - startYRef.current;
        isXPanRef.current = xDeltaRef.current >= 3 || xDeltaRef.current <= -3;
        isYPanRef.current = yDeltaRef.current <= -10 || yDeltaRef.current >= 10;

        if (!isXPanRef.current && isYPanRef.current && dragActiveRef.current) {
          dragActiveRef.current = false;
        }
      }

      if (dragActiveRef.current || type === "wheel") {
        // const maxTranslateX = -chartWidth + canvasWidth;
        // let x = translateX;
        //
        // if (currentTranslateRef.current > 0) {
        //   currentTranslateRef.current = 0;
        //   x = 0;
        // }
        // if (currentTranslateRef.current < maxTranslateX) {
        //   currentTranslateRef.current = maxTranslateX;
        //   x = 0;
        // }

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
