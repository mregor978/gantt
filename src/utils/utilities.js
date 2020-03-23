import { scaleTime } from "d3-scale";

import { chartConfig } from "./chartConfig";

export const dateScale = date => {
  const { startDate, endDate } = chartConfig;
  return scaleTime()
    .domain([startDate, endDate])
    .range([0, chartConfig.chartWidth])(date);
};
