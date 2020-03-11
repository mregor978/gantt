export const chartConfig = {
  rectHeight: 12,
  ganttPadding: 40,
  lineWidth: 1,
  tickWidth: 29,
  daysNumber: 181,
  get linesNumber() {
    return this.daysNumber + 1;
  },
  get dayWidth() {
    return this.lineWidth + this.tickWidth;
  },
  get chartWidth() {
    return this.dayWidth * this.daysNumber + this.lineWidth;
  }
};
