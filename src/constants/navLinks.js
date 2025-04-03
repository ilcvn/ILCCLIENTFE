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
      {id: 1, label: "Ban Lãnh Đạo", path: "/tong-quan/BOARD_OF_DIRECTORS"},
      {id: 2, label: "Hội Đồng Quản Lý Viện", path: "/tong-quan/BOARD_OF_MANAGEMERS"},
      {id: 3, label: "Hội Đồng Khoa Học", path: "/tong-quan/SCIENTIFIC_COUNCIL"},
      {id: 4, label: "Hội Đồng Cố Vấn", path: "/tong-quan/ADVISORY_BOARD"},
      {id: 5, label: "Văn Phòng Và Các Ban", path: "/tong-quan/department"},
      // {id: 6, label: "Văn phòng đại diện", path: "/tong-quan/office"},
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
    label: "nav.news",
    path: "/tin-tuc",
    dynamicSource: "articles",
    dynamicPrefix: "/tin-tuc",
    children: [],
  },
  {
    id: 5,
    label: "nav.legalKnowledge",
    path: "/doi-tac",
    dynamicSource: "articles",
    dynamicPrefix: "/kien-thuc-ve-luat",
    children: [],
  },
  {id: 6, label: "nav.contact", path: "/lien-he"},
];

export default navLinks;
