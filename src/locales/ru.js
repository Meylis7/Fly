export default {
  searchForm: {
    tabs: {
      flights: "Авиабилеты",
      hotels: "Отели",
    },
    flightType: {
      oneWay: "В одну сторону",
      RoundTrip: "Туда и обратно",
    },
    routeFrom: {
      placeholder: "Откуда",
    },
    routeTo: {
      placeholder: "Куда",
    },
    datePicker: {
      placeholder: "Дата",
      tuda: "Когда",
      obratno: "Обратно",
    },
    passengers: {
      placeholder: "Пассажиры",
      value: "1 пассажир",
    },
    typeFlights: [
      {
        id: 1,
        title: "Эконом",
        value: "Economy",
      },
      {
        id: 2,
        title: "Бизнес",
        value: "Business",
      },
    ],
    typePaths: [
      {
        id: 1,
        title: "В одну сторону",
        value: 1,
      },
      {
        id: 2,
        title: "Туда и обратно",
        value: 2,
      },
    ],
    passengersLists: [
      {
        id: "adults_count",
        title: "Взрослые",
        text: "Старше 12 лет",
        value: 1,
      },
      {
        id: "childs_count",
        title: "Дети",
        text: "От 2 до 12 лет",
        value: 0,
      },
      {
        id: "baby_without_a_seat",
        title: "Младенцы",
        text: "без места, до 2 лет",
        value: 0,
      },
      {
        id: "baby_with_seat",
        title: "Младенцы",
        text: "с местом, до 2 лет",
        value: 0,
      },
    ],
    directFlights: {
      placeholder: "Только прямые рейсы",
    },
    addedButton: "Добавить",
    searchButton: "Найти билеты",
  },
};
