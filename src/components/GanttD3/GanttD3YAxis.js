import React from "react";

import { chartConfig } from "../../utils/chartConfig";
import { fills } from "../../utils/fills";

export const GanttD3YAxis = ({ data }) => {
  const {
    rowHeight,
    marginTop,
    yAxisWidth,
    chartHeight,
    xAxisHeight
  } = chartConfig;

  const { GREY, PALE_WHITE, WHITE } = fills;

  const travellersList = data.map(({ id, lastName, name }, i) => {
    const y = i * rowHeight + marginTop + xAxisHeight + 20;
    const travellerName = `${name} ${lastName}`;
    return (
      <text key={id} x={10} y={y} fill={WHITE}>
        {travellerName}
      </text>
    );
  });

  return (
    <g>
      <rect x={0} y={0} width={yAxisWidth} height={chartHeight} fill={GREY} />
      <rect
        x={0}
        y={marginTop}
        width={yAxisWidth}
        height={xAxisHeight}
        fill={PALE_WHITE}
        fillOpacity={0.5}
      />
      <g>{travellersList}</g>
    </g>
  );
};
