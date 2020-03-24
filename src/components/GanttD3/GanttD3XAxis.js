import React from "react";
import moment from "moment";

import { chartConfig } from "../../utils/chartConfig";
import { fills } from "../../utils/fills";
import { dateScale } from "../../utils/utilities";

export const GanttD3XAxis = () => {
  const {
    marginTop,
    weekdays,
    months,
    daysNumber,
    startDate,
    chartHeight,
    chartWidth,
    dayWidth,
    xAxisHeight
  } = chartConfig;
  const { WHITE, RED, PALE_WHITE } = fills;
  const dateArray = [];
  for (let i = 0; i < daysNumber; i++)
    dateArray.push(
      new Date(
        moment(startDate)
          .add(i, "days")
          .format()
      )
    );
  const arrayDateForLine = [
    ...dateArray,
    new Date(
      moment(dateArray[180])
        .add(1, "days")
        .format()
    )
  ];

  const axisLines = arrayDateForLine.map(date => {
    const y1 = date.getDate() === 1 ? 0 : marginTop;
    const x = dateScale(date);
    return (
      <line
        key={+date}
        x1={x}
        y1={y1}
        x2={x}
        y2={chartHeight}
        strokeWidth={1}
        stroke={WHITE}
      />
    );
  });

  const monthLabels = dateArray.map(date => {
    if (date.getDate() === 1) {
      return (
        <text
          key={+date}
          x={dateScale(date)}
          dx={7}
          y={12}
          fill={WHITE}
          fontSize={12}
        >{`${months[date.getMonth()]} ${date.getFullYear()}`}</text>
      );
    }
    return null;
  });

  const dayLabels = dateArray.map(date => {
    const isWeekend = [5, 6].includes(date.getDay());
    return (
      <g key={+date}>
        <text
          x={dateScale(date)}
          dx={dayWidth / 2}
          y={42}
          textAnchor="middle"
          fill={isWeekend ? RED : WHITE}
          fontSize={9}
        >
          {weekdays[date.getDay()]}
        </text>
        <text
          x={dateScale(date)}
          dx={dayWidth / 2}
          y={60}
          fill={isWeekend ? RED : WHITE}
          fontSize={14}
          textAnchor="middle"
        >
          {date.getDate()}
        </text>
      </g>
    );
  });

  return (
    <g>
      <rect
        x={0}
        y={marginTop}
        width={chartWidth + dayWidth + 1}
        height={xAxisHeight}
        fill={PALE_WHITE}
        fillOpacity={0.5}
      />
      <g>{axisLines}</g>
      <g>{monthLabels}</g>
      <g>{dayLabels}</g>
    </g>
  );
};
