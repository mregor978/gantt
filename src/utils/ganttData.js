function makesDataGantt(profilesCount) {
  const dataGantt = [];

  for (let i = 0; i < profilesCount; i++) {
    dataGantt.push({
      profileId: i,
      travellerLastName: "Иванов",
      travellerFirstName: "Иван"
    });
  }
}

export const ganttData = [
  {
    profileId: 0,
    travellerLastName: "Иванов",
    travellerFirstName: "Иван",
    trips: [
      {
        tripStartsOn: "2019-12-01T00:00:00",
        tripEndsOn: "2019-12-15T00:00:00",
        journeyNumber: 0,
        tripNumber: 0
      },
      {
        tripStartsOn: "2020-01-01T00:00:00",
        tripEndsOn: "2019-01-05T00:00:00",
        journeyNumber: 1,
        tripNumber: 2
      },
      {
        tripStartsOn: "2019-12-01T00:00:00",
        tripEndsOn: "2019-12-15T00:00:00",
        journeyNumber: 3,
        tripNumber: 3
      },
      {
        tripStartsOn: "2019-12-01T00:00:00",
        tripEndsOn: "2019-12-15T00:00:00",
        journeyNumber: 4,
        tripNumber: 4
      },
      {
        tripStartsOn: "2019-12-01T00:00:00",
        tripEndsOn: "2019-12-15T00:00:00",
        journeyNumber: 5,
        tripNumber: 5
      }
    ]
  }
];
