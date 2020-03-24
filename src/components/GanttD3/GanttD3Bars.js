import React from "react";

import { chartConfig } from "../../utils/chartConfig";
import { dateScale } from "../../utils/utilities";
import { fills } from "../../utils/fills";

export const GanttD3Bars = ({ data }) => {
  const { startDate, endDate, dayWidth, rectHeight, rowHeight } = chartConfig;
  const { RED } = fills;

  const bars = data.map(({ trips, id }, i) => {
    const marginTop = 80;
    const y = i * rowHeight + marginTop;
    const travellerTrips = trips.map(
      ({ tripStartsOn, tripEndsOn, tripNumber }) => {
        const tripStart = dateScale(Date.parse(tripStartsOn));
        const tripsEnd = dateScale(Date.parse(tripEndsOn));
        const setWidth = (startCoordinate, endCoordinate) => {
          let resultStartCoordinate = startCoordinate;
          let resultEndCoordinate = endCoordinate;

          const startChartCoordinate = dateScale(startDate);
          const endChartCoordinate = dateScale(endDate);

          if (resultStartCoordinate < startChartCoordinate)
            resultStartCoordinate = startChartCoordinate;
          if (resultEndCoordinate > endChartCoordinate)
            resultEndCoordinate = endChartCoordinate;

          if (resultEndCoordinate - resultStartCoordinate === 0) {
            return dayWidth + 1;
          }

          return resultEndCoordinate - resultStartCoordinate - 1;
        };

        return (
          <rect
            key={tripNumber}
            id={tripNumber}
            x={tripStart}
            y={y}
            width={setWidth(tripStart, tripsEnd)}
            height={rectHeight}
            fill={RED}
          />
        );
      }
    );

    return (
      <g key={id} className="traveller-row">
        {travellerTrips}
      </g>
    );
  });

  return <g className="gantt-chart__bars">{bars}</g>;
};
