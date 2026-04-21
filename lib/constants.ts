export const WEDDING_DATE_ISO = "2026-08-14T16:00:00+03:00";

export const EVENT_INFO = {
  couple: "Аня и Марк",
  dateText: "14 августа 2026 года",
  dateShort: "14.08.2026",
  invitationText: "Приглашение на свадьбу",
  greetingText:
    "Дорогие гости! Мы с радостью приглашаем вас стать частью нашего праздника. Давайте вместе создадим воспоминания, которые будут согревать наши сердца долгие годы.",
  wishesText:
    "Если хотите подарить нам ценный и нужный подарок, мы будем очень благодарны за вклад в бюджет нашей молодой семьи. Просим не обременять себя выбором цветов, мы будем рады вашему присутствию.",
  venue: "Forest Park",
  address:
    "32-й квартал, 15, Сахарное участковое лесничество, Среднеахтубинский район, Волгоградская область, 404159"
};

export const NAV_ITEMS = [
  { label: "Главная", href: "#hero" },
  { label: "Программа", href: "#program" },
  { label: "Дресс-код", href: "#dress-code" },
  { label: "Локация", href: "#location" },
  { label: "Пожелание", href: "#wishes" },
  { label: "Анкета", href: "#rsvp" }
];

export const TIMELINE_ITEMS = [
  { time: "15:30", title: "Сбор гостей" },
  { time: "16:00", title: "Свадебная церемония" },
  { time: "17:00", title: "Начало банкета" },
  { time: "23:00", title: "Завершение вечера" }
];

export const DRESS_CODE_GROUPS = [
  {
    title: "Для мужчин",
    subtitle: "Темные и природные оттенки",
    colors: [
      { name: "Pantone 7533 EC", hex: "#4E4538" },
      { name: "Pantone 7505 EC", hex: "#9E876E" },
      { name: "Pantone 7495 EC", hex: "#97AC62" }
    ]
  },
  {
    title: "Для женщин",
    subtitle: "Светлые и яркие оттенки",
    colors: [
      { name: "Pantone 224 EC", hex: "#E37FA1" },
      { name: "Pantone 115 EC", hex: "#F8DC29" },
      { name: "Pantone 169 EC", hex: "#EFA48C" },
      { name: "Pantone 11-0510", hex: "#E3DBC6" },
      { name: "Pantone 11-4201", hex: "#E4EAEC" }
    ]
  }
];

const mapAddressQuery = encodeURIComponent(EVENT_INFO.address);
const mapLat = "48.718112";
const mapLon = "44.621992";
const mapCenter = `${mapLon},${mapLat}`;

export const MAP_EMBED_URL = `https://yandex.ru/map-widget/v1/?ll=${mapCenter}&z=15&pt=${mapCenter},pm2rdm`;
export const MAP_ROUTE_URL = `https://yandex.ru/maps/?ll=${mapCenter}&z=15&rtext=~${mapLat},${mapLon}&rtt=auto`;
