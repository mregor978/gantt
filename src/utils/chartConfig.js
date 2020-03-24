import moment from "moment";

export const chartConfig = {
  rectHeight: 12,
  rowHeight: 34,
  ganttPadding: 40,
  lineWidth: 1,
  tickWidth: 29,
  daysBeforeCurrentDate: 90,
  daysAfterCurrentDate: 90,
  chartHeight: 400,
  yAxisWidth: 260,
  xAxisHeight: 50,
  marginTop: 20,
  months: [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь"
  ],
  weekdays: ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
  currentDate: new Date().setHours(0, 0, 0, 0),
  get daysNumber() {
    return this.daysAfterCurrentDate + this.daysBeforeCurrentDate + 1;
  },
  get linesNumber() {
    return this.daysNumber + 1;
  },
  get dayWidth() {
    return this.lineWidth + this.tickWidth;
  },
  get chartWidth() {
    return this.dayWidth * this.daysNumber + this.lineWidth;
  },
  get startDate() {
    return new Date(
      moment(this.currentDate)
        .subtract(this.daysBeforeCurrentDate, "days")
        .format()
    );
  },
  get endDate() {
    return new Date(
      moment(this.currentDate)
        .add(this.daysAfterCurrentDate, "days")
        .format()
    );
  },
  get defaultTranslate() {
    return this.yAxisWidth + this.lineWidth - this.chartWidth / 2;
  }
};
