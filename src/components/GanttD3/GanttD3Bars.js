import React from "react";

import { chartConfig } from "../../utils/chartConfig";
import { getTripCoordinate, setWidth } from "../../utils/utilities";
import { fills } from "../../utils/fills";

export const GanttD3Bars = ({ data }) => {
  const { rectHeight, rowHeight } = chartConfig;
  const { RED } = fills;
  const bars = data.map(({ trips, id }, i) => {
    const marginTop = 80;
    const y = i * rowHeight + marginTop;

    const travellerTrips = trips
      .filter(({ tripEndsOn }) => getTripCoordinate(tripEndsOn) > 0)
      .map(({ tripStartsOn, tripEndsOn, tripNumber }) => {
        const tripStart = getTripCoordinate(tripStartsOn);
        const tripEnd = getTripCoordinate(tripEndsOn);
        return (
          <rect
            key={tripNumber}
            id={tripNumber}
            x={tripStart < 0 ? 0 : tripStart}
            y={y}
            width={setWidth(tripStart, tripEnd)}
            height={rectHeight}
            fill={RED}
          />
        );
      });

    return (
      <g key={id} className="traveller-row">
        {travellerTrips}
      </g>
    );
  });

  return <g className="gantt-chart__bars">{bars}</g>;
};
