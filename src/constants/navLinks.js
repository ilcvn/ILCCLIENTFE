// src/constants/navLinks.js
const navLinks = [
  {id: 1, label: "nav.home", path: "/"},
  {
    id: 2,
    label: "nav.overview",
    path: "/tong-quan",
    dynamicSource: "default",
    dynamicPrefix: "/tong-quan",
    children: [
      {id: 1, label: "about.BOARD_OF_DIRECTORS", path: "/tong-quan/ban-lanh-dao"},
      {id: 2, label: "about.BOARD_OF_MANAGEMERS", path: "/tong-quan/hoi-dong-quan-ly-vien"},
      {id: 3, label: "about.SCIENTIFIC_COUNCIL", path: "/tong-quan/Hoi-dong-khoa-hoc"},
      {id: 4, label: "about.ADVISORY_BOARD", path: "/tong-quan/Hoi-dong-co-van"},
      {id: 5, label: "about.OTHER_DEPRATMENTS", path: "/tong-quan/phong-ban"},    
      {id: 6, label: "about.PARTNERS", path: "/tong-quan/partner"},    
    ],
  },
  {
    id: 3,
    label: "nav.service",
    path: "/dich-vu",
    dynamicSource: "articles",
    dynamicPrefix: "/dich-vu",
    children: [],
  },
  {
    id: 4,
    label: "nav.training",
    path: "/dao-tao",
    dynamicSource: "articles",
    dynamicPrefix: "/dao-tao",
    children: [],
  },
  {
    id: 5,
    label: "nav.research_title",
    path: "/nghien-cuu",
    dynamicSource: "articles",
    dynamicPrefix: "/nghien-cuu-khoa-hoc-va-ung-dung-chuyen-doi-so",
    children: [],
  },
  {
    id: 6,
    label: "nav.news",
    path: "/tin-tuc",
    dynamicSource: "articles",
    dynamicPrefix: "/tin-tuc",
    children: [],
  },
  {id: 7, label: "nav.contact", path: "/lien-he"},
];

export default navLinks;
