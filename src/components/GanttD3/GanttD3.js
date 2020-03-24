import React, { useRef } from "react";
import classes from "../../styles/Gantt.module.sass";
import { GanttD3XAxis } from "./GanttD3XAxis";
import { GanttD3Bars } from "./GanttD3Bars";
import { GanttD3YAxis } from "./GanttD3YAxis";

export const GanttD3 = ({ data }) => {
  const { gantt, gantt__title, gantt__chart } = classes;
  const ganttRef = useRef(null);
  const svgRef = useRef(null);
  const scrollRef = useRef(null);

  return (
    <div ref={ganttRef} className={gantt}>
      <div className={gantt__title}>D3</div>
      <svg className={gantt__chart} ref={svgRef}>
        <g className="gantt-chart__scrollable-container" ref={scrollRef}>
          <GanttD3XAxis />
          <GanttD3Bars data={data} />
          <GanttD3YAxis data={data} />
        </g>
        {/*<GanttLeftAxis*/}
        {/*  data={data}*/}
        {/*  chartHeight={chartWidth}*/}
        {/*  axisWidth={leftAxisWidth}*/}
        {/*  marginTop={marginTop}*/}
        {/*  topRectHeight={topRectHeight}*/}
        {/*  rowHeight={rowHeight}*/}
        {/*/>*/}
      </svg>
    </div>
  );
};
