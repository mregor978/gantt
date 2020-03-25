/**
 * Создаёт массив данных для графиков заданной длины
 * @param travellersCount
 */

export class ganttDataCreator {
  constructor(travellersCount) {
    this._travellersCount = travellersCount;
  }

  /**
   * Создаёт итоговые данные для графика
   * @return Array
   */
  get ganttData() {
    const data = [];
    const names = ["Ефим", "Аким", "Харитон", "Христина", "Чечилия"];
    const lastNames = ["Орехов", "Зимин", "Шарапов", "Полищук", "Плаксий"];

    for (let i = 0; i < this._travellersCount; i++) {
      data.push(this._createTraveller(i, names[i], lastNames[i]));
    }
    return data;
  }

  _createTraveller(id, name, lastName) {
    return {
      id,
      lastName,
      name,
      trips: this._createTripsData(6)
    };
  }
  // диапазон 1 декабря 2019 - 31 мая 2020
  /**
   * Создаёт объект командировки
   * @param tripNumber
   * @param tripMonth
   * @return Object
   */
  _createTrip(tripNumber, tripMonth) {
    const tripDate = tripMonth === "12" ? 19 : 20;
    const tripStartDay = this._getDayNumber(tripMonth);
    const tripEndDay = this._getDayNumber(tripMonth);

    return {
      tripStartsOn: `20${tripDate}-${tripMonth}-${tripStartDay}T00:00:00`,
      tripEndsOn: `20${tripDate}-${tripMonth}-${
        tripEndDay > tripStartDay ? tripEndDay : tripStartDay + 1
      }T00:00:00`,
      journeyNumber: tripNumber,
      tripNumber
    };
  }

  _createTripsData(tripCount) {
    const data = [];
    const months = ["12", "01", "02", "03", "04", "05"];
    for (let i = 0; i < tripCount; i++) {
      data.push(this._createTrip(i, months[i]));
    }
    return data;
  }

  _getDayNumber(month) {
    const day = Math.floor(Math.random() * (this._getMaxDay(month) - 1) + 1);
    return day < 10 ? `0${day}` : day;
  }

  _getMaxDay(monthNumber) {
    switch (monthNumber) {
      case "01":
      case "03":
      case "05":
      case "12":
        return 31;
      case "02":
        return 29;
      default:
        return 30;
    }
  }
}
