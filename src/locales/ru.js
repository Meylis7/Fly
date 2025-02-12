export default {
  header: {
    links: {
      flightHotel: "Рейсы и Отели",
      tour: "Тур",
      visa: "Виза",
    },
    signup: "Зарегистрироваться",
  },
  heroTitle:
    "Начните свое приключение с Fly-Ashgabat, где начинается ваше идеальное путешествие.",

  searchForm: {
    tabs: {
      flights: "Рейсы",
      hotels: "Отели",
    },
    flightType: {
      oneWay: "В одну сторону",
      RoundTrip: "Туда и обратно",
    },
    routeFrom: {
      label: "Город отправления",
      placeholder: "Откуда",
    },
    routeTo: {
      label: "Город назначения",
      placeholder: "Куда",
    },
    datePicker: {
      placeholder: "Выберите дату",
      tuda: "Дата отправления",
      obratno: "Дата возвращения",
    },
    passengers: {
      placeholder: "Пассажиры",
      value: "1 пассажир",
    },
    typeFlights: [
      {
        id: 1,
        title: "Все",
        value: "All",
      },
      {
        id: 2,
        title: "Эконом",
        value: "Economy",
      },
      {
        id: 3,
        title: "Бизнес",
        value: "Business",
      },
    ],
    passengersLists: [
      {
        id: "adults_count",
        title: "Взрослые",
        text: "старше 12 лет на момент полета",
        value: 1,
      },
      {
        id: "childs_count",
        title: "Дети",
        text: "от 2 до 12 лет на момент полета",
        value: 0,
      },
      {
        id: "infant_count",
        title: "Младенцы",
        text: "до 2 лет (без места, на руках у взрослого)",
        value: 0,
      },
    ],
    directFlights: {
      placeholder: "Только прямые рейсы",
    },
    searchButton: {
      flightText: "Поиск рейсов",
      hotelText: "Поиск отелей",
    },
  },
  tour: {
    title: "Изучите туры",
    text: "Планируете отдых или возвращаетесь домой? Наши инструменты делают каждое путешествие легким.",
  },
  visa: {
    title: "Откройте мир с вашей визой",
    text: "Куда бы вы ни направлялись, наши инструменты обеспечат плавное и беззаботное путешествие.",
  },
  seeMore: "Смотреть все",
  viewMore: "Посмотреть больше",
  footer: {
    text: "Fly-Ashgabat — Ваш надежный партнер в путешествиях и незабываемых приключениях.",
    usefullLink: "Полезные ссылки",
    socialMedia: "Социальные сети",
    copyright: "© 2024 Jahankeshde. Все права защищены",
  },
  goBack: "Вернуться назад",
  loadMore: "Загрузить еще",
  scrollTop: "Прокрутить наверх",

  filter: {
    title: "Фильтровать по",
    sort: {
      val_1: "Сначала дешевые",
      val_2: "Сначала быстрые",
      val_3: "По времени отправления",
    },
    stops: {
      title: "Остановки",
      val_1: "Без пересадок",
      val_2: "1 пересадка",
      val_3: "2 пересадки",
    },
    baggage: {
      val_1: "Включен багаж",
    },
    departTime: {
      title: "Время отправления",
      val_1: "Утро",
      val_2: "После обеда",
      val_3: "Вечер",
      text_1: "(05:00 am - 11:59 am)",
      text_2: "(12:00 pm - 05:59 pm)",
      text_3: "(06:00 pm - 11:59 pm)",
    },
    arriveTime: {
      title: "Время прибытия",
    },
    airlines: {
      title: "Авиакомпании",
    },
    btn: "Сбросить",
  },

  ticket: {
    hour: "ч.",
    minute: "мин.",
    bookNow: "Забронировать сейчас",
    travelClass: "Класс путешествия",
  },

  booking: {
    contact: {
      title: "Контактная информация",
      text: "Мы отправим билет на указанный контакт, уведомления о изменениях рейса или в случае других чрезвычайных ситуаций.",
      firstName: {
        label: "Имя",
        placeholder: "например, Аман",
      },
      lastname: {
        label: "Фамилия",
        placeholder: "например, Аманов",
      },
      eamil: {
        label: "Email",
        placeholder: "например, Aman@gmial.com",
      },
      number: {
        label: "Телефон",
        placeholder: "Номер телефона",
      },
      gender: {
        label: "Пол",
        val_1: "Мужчина",
        val_2: "Женщина",
      },
      country: {
        label: "Страна проживания",
        placeholder: "Выберите страну",
      },
      city: {
        label: "Город",
        placeholder: "например, кв. 101, 123, ул. Главная",
      },
      street: {
        label: "Улица",
        placeholder: "например, кв. 101, 123, ул. Главная",
      },
    },
    passenger: {
      title: "Пассажир",
      text: "Пожалуйста, укажите данные, как в вашем проездном документе.",
      personal: "Личные данные",
      documents: "Документы",
      firstName: {
        label: "Имя",
        placeholder: "например, Аман",
      },
      lastname: {
        label: "Фамилия",
        placeholder: "например, Аманов",
      },
      birth: {
        label: "Дата рождения",
        placeholder: "например, 02-10-2000",
      },
      gender: {
        label: "Пол",
        val_1: "Мужчина",
        val_2: "Женщина",
      },
      passportCountry: {
        label: "Страна паспорта",
        placeholder: "Выберите страну",
      },
      citizenship: {
        label: "Гражданство",
        placeholder: "Выберите страну",
      },
      passportSeries: {
        label: "Серия и номер паспорта",
        placeholder: "например, AE010101",
      },
      passportExpire: {
        label: "Срок действия паспорта",
        placeholder: "например, 09-11-2029",
      },
    },
    payment: {
      title: "Выберите способ оплаты",
      val_1: "Оплатить с баланса",
    },
    submit: "Отправить",
  },

  profile: {
    tabs: {
      tab_1: "Аккаунт",
      tab_2: "Рейсы",
      tab_3: "Проживание",
      tab_4: "Выйти",
    },

    accaunt: {
      firstName: {
        label: "Имя",
        placeholder: "например, Аман",
      },
      lastname: {
        label: "Фамилия",
        placeholder: "например, Аманов",
      },
      eamil: {
        label: "Email",
        placeholder: "например, Aman@gmial.com",
      },
      password: {
        label: "Пароль",
        placeholder: "********",
      },
      edit: "Редактировать",
    },
  },

  loadingBooking: "Загрузка... Пожалуйста, подождите.",
  BookingTicket: {
    title: "Бронирование успешно завершено!",
    subTitle: "Номер бронирования:",
    goHome: "На главную",
    form: {
      title: "Билеты",
      text: "Копия ваших билетов была отправлена на указанный контактный email.",
      passenger: "Пассажир",
      download: "Скачать",
    },
  },
};
