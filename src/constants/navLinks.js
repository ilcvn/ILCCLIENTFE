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
      {id: 1, label: "about.BOARD_OF_DIRECTORS", path: "/tong-quan/BOARD_OF_DIRECTORS"},
      {id: 2, label: "about.BOARD_OF_MANAGEMERS", path: "/tong-quan/BOARD_OF_MANAGEMERS"},
      {id: 3, label: "about.SCIENTIFIC_COUNCIL", path: "/tong-quan/SCIENTIFIC_COUNCIL"},
      {id: 4, label: "about.ADVISORY_BOARD", path: "/tong-quan/ADVISORY_BOARD"},
      {id: 5, label: "about.OTHER_DEPRATMENTS", path: "/tong-quan/department"},    
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
    id: 7,
    label: "nav.training",
    path: "/tin-tuc",
    dynamicSource: "articles",
    dynamicPrefix: "/tin-tuc",
    children: [],
  },
  // {
  //   id: 8,
  //   label: "Nghiên Cứu Khoa Học Và Xây Dựng Pháp Luật",
  //   path: "/tin-tuc",
  //   dynamicSource: "articles",
  //   dynamicPrefix: "/tin-tuc",
  //   children: [],
  // },
  {
    id: 6,
    label: "nav.news",
    path: "/tin-tuc",
    dynamicSource: "articles",
    dynamicPrefix: "/tin-tuc",
    children: [],
  },
  {
    id: 77,
    label: "nav.legalKnowledge",
    path: "/doi-tac",
    dynamicSource: "articles",
    dynamicPrefix: "/kien-thuc-ve-luat",
    children: [],
  },
  {id: 8, label: "nav.contact", path: "/lien-he"},
];

export default navLinks;
