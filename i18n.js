// src/i18n.js
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
const savedLanguage = localStorage.getItem("language") || "vi";

const resources = {
  vi: {
    translation: {
      nav: {
        home: "Trang chủ",
        overview: "Tổng quan",
        service: "Dịch vụ",
        news: "Tin tức",
        legalKnowledge: "Đối Tác",
        contact: "Liên hệ",
        member: "Thành Viên",
        placeholderSearch: "Nhập từ khóa...",
        search: "Tìm kiếm",
      },
      banner: {
        marquee: "Viện Khoa học Pháp Lý và Phát triển doanh nghiệp",
        emailLabel: "Email",
        phoneLabel: "Liên Hệ",
      },
      footer: {
        contactTitle: "Liên hệ với chúng tôi",
        addressLabel: "Địa chỉ:",
        addressText:
          "Số 32, Đường số 18, Khu phố 1, phường Phú Hữu, thành phố Thủ Đức, Thành phố Hồ Chí Minh",
        hotlineLabel: "Hotline:",
        emailLabel: "Email:",
        workingTimeLabel: "Thời gian làm việc:",
        workingTimeText: "Thứ 2 - Thứ 7: Từ 8:00 đến 17:00",
        addressOffice1Label: "Văn phòng tại tỉnh Bình Dương: ",
        addressOffice1Text:
          "Số 450 Phạm Ngọc Thạch, phường Phú Mỹ, thành phố Thủ Dầu Một, tỉnh Bình Dương",
        addressOffice2Label: "Văn phòng tại Hà Nội: ",
        addressOffice2Text:
          "Số 70 Trung Hòa, phường Trung Hòa, quận Cầu Giấy, Hà Nội",
        supportTitle: "Hỗ Trợ",
        tax: "Mã số thuế: ",
        office: "Văn Phòng Đại Diện",
        supportLink1: "Cho Thuê Phòng Pháp Chế Bên Ngoài",
        supportLink2: "Dịch vụ Đại Diện Tố Tụng",
        supportLink3: "Dịch vụ Đại Diện Ngoài Tố Tụng",
        supportLink4: "Dịch vụ Luật Sư Gia Đình",
        supportLink5: "Tư Vấn Xây Dựng Hệ Thống Quản Trị Nội Bộ Công Ty",
        consultTitle: "Đăng ký tư vấn",
        namePlaceholder: "Họ tên",
        phonePlaceholder: "Số điện thoại",
        datePlaceholder: "Ngày đăng ký tư vấn",
        contentPlaceholder: "Nội dung",
        submitButton: "Đăng Ký ngay",
        mapTitle: "Bản đồ",
        serviceText: "Vấn đề cần tư vấn",
      },
      homepage: {
        blogCard: {
          title:
            "Viện Khoa học pháp lý và Phát triển doanh nghiệp (Institute of Legal Science and Corporate Development - ILC)",
          subTitle: "CÔNG CUỘC - PHÁT TRIỂN - ĐỔI MỚI",
          content: {
            paragraph1:
              "Là đơn vị trực thuộc thứ 29 của Hiệp hội Doanh nghiệp nhỏ và vừa Việt Nam (VINASME). Viện được thành lập năm 2024 với chức năng, nhiệm vụ chính như sau: Nghiên cứu khoa học về luật pháp và kinh doanh trong nước và quốc tế; Nghiên cứu các định chế thương mại của các tổ chức quốc tế; Nghiên cứu khoa học và thực hiện các đề tài, dự án liên quan pháp luật, tài chính, đầu tư, kinh doanh thương mại, quản trị doanh nghiệp, kinh tế số và trí tuệ nhân tạo, nguồn nhân lực và quản lý rủi ro.",
            paragraph2:
              "Bên cạnh hoạt động nghiên cứu, Viện còn thực hiện các dịch vụ KH&CN:",
            listItem1:
              "Xây dựng dự án cố vấn pháp lý cho các DNNVV tại Việt Nam.",
            listItem2:
              "Tư vấn và xây dựng các đề án chuyển đổi số, công nghệ thông tin để hỗ trợ các DNNVV tại Việt Nam.",
            listItem3:
              "Tư vấn tài chính và hỗ trợ DNNVV tiếp cận vốn tín dụng ưu đãi.",
            listItem4:
              "Đào tạo, bồi dưỡng các kiến thức pháp luật và kỹ năng quản trị doanh nghiệp, quản trị nhân sự, chuyển đổi số.",
            listItem5:
              "Đào tạo, bồi dưỡng cấp chứng chỉ về môi giới bất động sản; quản lý, vận hành chung cư.",
            paragraph3:
              '"Chúng tôi gửi lời cảm ơn và tri ân đến cố Luật sư Trần Hữu Nhân đã tin tưởng và trao tặng thương hiệu Công ty tới đội ngũ Luật sư chúng tôi. ILC với biểu tượng ILC, mang trong đó sự lắng đọng của đất và người Sài Thành với tinh thần cởi mở và sự phong lưu, phóng khoáng, nghĩa hiệp cùng với sự tin tưởng…"',

            tip1: "Sứ mệnh",
            tip2: "Tầm nhìn",
            paragraph4: '"Nâng tầm doanh nghiệp Việt."',
            paragraph5: '"Đồng hành cùng doanh nghiệp trong kỷ nguyên mới."',
          },
          btnContent: "Xem thêm",
        },
        contentSection: {
          services: {
            header: "DỊCH VỤ KHOA HỌC VÀ CÔNG NGHỆ",
            content:
              "Tư vấn phản biện khoa học nâng cao trình độ trong các lĩnh vực nghiên cứu.",
          },
          developers: {
            header: "CÁC THÀNH VIÊN",
            content: "Các thành viên tham gia của viện ILC",
          },
          knowledge: {
            header: "NGHIÊN CỨU LUẬT",
            content: "Cùng cộng đồng phát triển",
            company: "Chúng tôi đã có một hệ sinh thái vô cùng lớn mạnh",
            Strategic: "Đối Tác Chiến Lược",
            mediaPartners: "Đối tác truyền thông",
            mediaCollaboration:
              "Chúng tôi đã có cơ hội hợp tác với nhiều đối tác truyền thông hiệu quả",
          },
          video: {
            header: "VIDEO CLIP",
            content: "",
          },
          partners: {
            header: "ĐỐI TÁC KHÁCH HÀNG",
            content: "",
          },
        },
      },
      contactPage: {
        header: "LIÊN HỆ",
        platformName: "ILC Platform",
        emailLabel: "Email:",
        hotlineLabel: "Liên hệ:",
        addressText:
          "Địa chỉ: Số 32, Đường số 18, Khu phố 1, phường Phú Hữu, thành phố Thủ Đức, Thành phố Hồ Chí Minh",
        namePlaceholder: "Họ tên",
        phonePlaceholder: "Số điện thoại",
        addressPlaceholder: "Địa chỉ",
        emailPlaceholder: "Email",
        subjectPlaceholder: "Chủ đề",
        messagePlaceholder: "Nội dung",
        fileLabel: "Chọn file",
        submitButton: "Gửi",
        resetButton: "Nhập lại",
        error: {
          name: "Vui lòng nhập họ và tên",
          phone: "Vui lòng nhập số điện thoại",
          phoneInvalid: "Số điện thoại chỉ chứa số!",
          email: "Vui lòng nhập địa chỉ email",
          address: "Vui lòng nhập địa chỉ",
          subject: "Vui lòng nhập chủ đề",
          message: "Vui lòng nhập nội dung",
          date: "Vui lòng chọn ngày",
          dateFuture: "Vui lòng chọn ngày không nhỏ hơn ngày hiện tại",
        },
      },
      detailPage: {
        title: "Chi tiết dịch vụ khác",
      },
      memberPage: {
        title: "Thành viên hội đồng khoa học",
        subTitle: "viện khoa học pháp lý và phát triển doanh nghiệp (ILC)",
        infomation: "Thông tin liên hệ",
        infoMember: "Thông Tin thành viên",
      },
      search: {
        title: "Tìm kiếm",
        placeholder: "Nhập giá trị vào đây...",
        subTitle: "Tổng đài tư vấn Pháp luật",
        button: "Gọi Ngay",
        find: "Không tìm được kết quả",
        status: "Đang tải.... ",
        result: "Kết quả tìm kiếm",
      },
      roles: {
        MEMBER: "Thành Viên",
        VICE_PRESIDENT: "Phó Viện Trưởng",
        PRESIDENT: "Viện Trưởng",
        CHAIRPERSON: "Chủ Tịch Hội đồng",
        VICE_CHAIRMAN: "Phó Chủ Tịch Hội đồng",
        GROUP_PRESIDENT: "Trưởng Ban",
        GROUP_VICE_PRESIDENT: "Phó Ban",
        ROOM_PRESIDENT: "Trưởng Phòng",
        ROOM_VICE_PRESIDENT: "Phó Phòng",
        NA: "Chưa xác định",
      },

      titles: {
        NA: "------",
        BACHELOR_OF_ECONOMICS_AND_LAW: "Cử nhân Kinh tế - Luật",
        BACHELOR_OF_ACCOUNTING: "Cử nhân Kế toán",
        BACHELOR_OF_BUSINESS_ADMINISTRATION: "Cử nhân Quản trị kinh doanh",
        LAWYER: "Luật sư",
        MASTER: "Thạc sĩ",
        DOCTORATE: "Tiến sĩ",
        ASSOCIATE: "Phó Giáo sư",
        PROFESSOR: "Giáo sư",
        ARBITRATOR: "Trọng tài viên",
        JUDGE: "Thẩm phán",
      },
      about: {
        BOARD_OF_DIRECTORS: "Ban Lãnh Đạo",
        SCIENTIFIC_COUNCIL: "Hội Đồng Khoa Học",
        BOARD_OF_MANAGEMERS: "Hội Đồng Quản Lý Viện",
        ADVISORY_BOARD: "Hội Đồng Cố Vấn",
        SOCIAL_WORK_AND_BUSINESS_SUPPORT_BOARD:
          "Ban Công Tác Xã Hội Và Hỗ Trợ Doanh Nghiệp, Doanh Nhân",
        HUMAN_RESOURCE_TRAINING_AND_DEVELOPMENT_DEPARTMENT:
          "Ban Đào Tạo Và Phát Triển Nguồn Nhân Lực",
        DEPARTMENT_OF_DIGITAL_ECONOMY_ARTIFICIAL_INTELLIGENCE_AND_BUSINESS_DEVELOPMENT:
          "Ban Kinh Tế Số, Trí Tuệ Nhân Tạo Và Phát Triển Doanh Nghiệp",
        DEPARTMENT_OF_ECONOMICS_FINANCE_AND_INTERNATIONAL_TRADE:
          "Ban Kinh tế - Tài chính và Thương mại quốc tế",
        LEGAL_AND_COMMERCIAL_INSTITUTIONS_DEPARTMENT:
          "Ban Pháp Luật Và Định Chế Thương Mại",
        CHIEF_OF_STAFF: "Văn Phòng Viện",
        Sub_header: "Viện Khoa học pháp lý và Phát triển doanh nghiệp ",
      },
      detailMenber: {
        MEMBER_INFO: "Thông Tin thành viên",
        EDUCATION: "QUÁ TRÌNH HỌC TẬP",
        WORK_EXPERIENCE: "QUÁ TRÌNH CÔNG TÁC",
        CONSULT_EXPERIENCE: "Kinh Nghiệm Tư vấn",
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        overview: "Overview",
        service: "Service",
        news: "News",
        legalKnowledge: "Partner",
        contact: "Contact",
        member: "Member",
        placeholderSearch: "Enter keyword...",
        search: "Seach",
      },
      banner: {
        marquee: "Institute of Legal Science and Business Development",
        emailLabel: "Email",
        phoneLabel: "Phone",
      },
      footer: {
        contactTitle: "Contact Us",
        addressLabel: "Address:",
        addressText:
          "32, Street No. 18, Quarter 1, Phú Hữu Ward, Thủ Đức City, Ho Chi Minh City.",
        hotlineLabel: "Hotline:",
        emailLabel: "Email:",
        workingTimeLabel: "Working Hours:",
        workingTimeText: "Mon - Sat: 8:00 to 17:00",
        addressOffice1Label: "Office in Binh Duong province: ",
        addressOffice1Text:
          "No. 450 Pham Ngoc Thach, Phu My ward, Thu Dau Mot city, Binh Duong province",
        addressOffice2Label: "Office in Hanoi: ",
        addressOffice2Text:
          "No. 70 Trung Hoa, Trung Hoa ward, Cau Giay district, Hanoi",
        supportTitle: "Support",
        tax: "Tax code:",
        office: "Representative Office",
        supportLink1: "Outsourced Legal Room Rental",
        supportLink2: "Litigation Representation Services",
        supportLink3: "Non-litigation Representation Services",
        supportLink4: "Family Lawyer Services",
        supportLink5: "Consulting on Internal Corporate Governance Systems",
        consultTitle: "Register for Consultation",
        namePlaceholder: "Full Name",
        phonePlaceholder: "Phone Number",
        datePlaceholder: "Consultation registration date",
        contentPlaceholder: "Content",
        submitButton: "Register Now",
        mapTitle: "Map",
        serviceText: "Consultation issue",
      },
      homepage: {
        blogCard: {
          title: "Institute of Legal Science and Corporate Development (ILC)",
          subTitle: "DEDICATED - DEVELOPING - INNOVATIVE",
          content: {
            paragraph1:
              "As a unit under the 29th branch of the Vietnam Association of Small and Medium Enterprises (VINASME), the Institute was established in 2024 with the main functions and tasks as follows: to conduct scientific research on law and business both domestically and internationally; to study the commercial systems of international organizations; and to research and implement projects related to law, finance, investment, trade, corporate governance, digital economy, artificial intelligence, human resources, and risk management.",
            paragraph2:
              "In addition to its research activities, the Institute also provides scientific and technological services:",
            listItem1:
              "Developing legal advisory projects for SMEs in Vietnam.",
            listItem2:
              "Consulting and developing digital transformation and IT projects to support SMEs in Vietnam.",
            listItem3:
              "Providing financial consulting and assistance for SMEs to access preferential credit.",
            listItem4:
              "Training and nurturing legal knowledge, business management, human resource management, and digital transformation skills.",
            listItem5:
              "Offering certification training in real estate brokerage; managing and operating apartment complexes.",
            paragraph3:
              "We extend our gratitude and appreciation to the late Lawyer Tran Huu Nhan for his trust and for bestowing the company's brand upon our team of lawyers. ILC, with its emblem, embodies the essence of Saigon's land and people, reflecting openness, diversity, magnanimity, chivalry, and trust...",
            tip1: "Mission",
            tip2: "Vision",
            paragraph4: '"Raising Vietnamese businesses."',
            paragraph5: '"Accompanying businesses in the new era."',
          },
          btnContent: "Read More",
        },
        contentSection: {
          services: {
            header: "CUSTOMER SERVICES",
            content:
              "Pioneering comprehensive legal solutions and partnering with businesses",
          },
          developers: {
            header: "OUR DEVELOPERS",
            content: "By 2025, AI technology is set to advance rapidly",
          },
          knowledge: {
            header: "LEGAL KNOWLEDGE",
            content: "Growing together with the community",
            company:
              "We have developed a powerful and rapidly growing ecosystem that continues to expand and strengthen.",
            Strategic: "Strategic Partners",
            mediaPartners: "Media Partners",
            mediaCollaboration:
              "We have had the opportunity to collaborate with many effective media partners",
          },
          video: {
            header: "VIDEO CLIP",
            content: "",
          },
          partners: {
            header: "CUSTOMER PARTNERS",
            content: "",
          },
        },
      },
      contactPage: {
        header: "CONTACT",
        platformName: "ILC Platform",
        emailLabel: "Email:",
        hotlineLabel: "Hotline:",
        addressText:
          "Address: 32, Street No. 18, Quarter 1, Phú Hữu Ward, Thủ Đức City, Ho Chi Minh City.",
        namePlaceholder: "Full Name",
        phonePlaceholder: "Phone Number",
        addressPlaceholder: "Address",
        emailPlaceholder: "Email",
        subjectPlaceholder: "Subject",
        messagePlaceholder: "Message",
        fileLabel: "Choose file",
        submitButton: "Submit",
        resetButton: "Reset",
        error: {
          name: "Please enter your full name",
          phone: "Please enter your phone number",
          phoneInvalid: "Phone number must contain only digits!",
          email: "Please enter your email address",
          address: "Please enter your address",
          subject: "Please enter the subject",
          message: "Please enter the message",
          date: "Please select a date",
          dateFuture:
            "Please select a date that is not earlier than the current date",
        },
      },
      detailPage: {
        title: "Other Service Details",
      },
      memberPage: {
        title: "Scientific Council Members",
        subTitle: "Institute of Legal Science and Corporate Development (ILC)",
        infomation: "Contact Information",
        infoMember: "Member Information",
      },
      search: {
        title: "Search",
        placeholder: "Enter value here...",
        subTitle: "Legal Consultation Hotline",
        button: "Call Now",
        find: "No results found",
        status: "Loading.... ",
        result: "Search results",
      },
      roles: {
        MEMBER: "Member",
        VICE_PRESIDENT: "Vice President",
        PRESIDENT: "President",
        CHAIRPERSON: "Chairperson",
        VICE_CHAIRMAN: "Vice Chairman",
        GROUP_PRESIDENT: "Head of the Department",
        GROUP_VICE_PRESIDENT: "Vice Head of the Department",
        ROOM_PRESIDENT: "Department Manager",
        ROOM_VICE_PRESIDENT: "Assistant Manager",
        NA: "Unknown",
      },
      titles: {
        NA: "------",
        BACHELOR_OF_ECONOMICS_AND_LAW: "Bachelor of Economics and Law",
        BACHELOR_OF_ACCOUNTING: "Bachelor of Accounting",
        BACHELOR_OF_BUSINESS_ADMINISTRATION:
          "Bachelor of Business Administration",
        LAWYER: "Lawyer",
        MASTER: "Master",
        DOCTORATE: "Doctorate",
        ASSOCIATE: "Associate Professor",
        PROFESSOR: "Professor",
        ARBITRATOR: "Arbitrator",
        JUDGE: "Judge",
      },
      about: {
        BOARD_OF_DIRECTORS: "Board of Directors",
        SCIENTIFIC_COUNCIL: "Scientific Council",
        BOARD_OF_MANAGEMERS: "Management Board",
        ADVISORY_BOARD: "Advisory Board",
        SOCIAL_WORK_AND_BUSINESS_SUPPORT_BOARD:
          "Social Work and Business Support Board",
        HUMAN_RESOURCE_TRAINING_AND_DEVELOPMENT_DEPARTMENT:
          "Human Resource Training and Development Department",
        DEPARTMENT_OF_DIGITAL_ECONOMY_ARTIFICIAL_INTELLIGENCE_AND_BUSINESS_DEVELOPMENT:
          "Department of Digital Economy, Artificial Intelligence and Business Development",
        DEPARTMENT_OF_ECONOMICS_FINANCE_AND_INTERNATIONAL_TRADE:
          "Department of Economics, Finance and International Trade",
        LEGAL_AND_COMMERCIAL_INSTITUTIONS_DEPARTMENT:
          "Department of Legal Affairs and Commercial Institutions",
        CHIEF_OF_STAFF: "Chief of Staff",
        Sub_header: "Institute of Legal Science and Business Development",
      },
      detailMember: {
        MEMBER_INFO: "Member Information",
        EDUCATION: "Education History",
        WORK_EXPERIENCE: "Work Experience",
        CONSULT_EXPERIENCE: "Consulting Experience",
      },
    },
  },
  zh: {
    translation: {
      nav: {
        home: "首页",
        overview: "概览",
        service: "服务",
        news: "新闻",
        legalKnowledge: "合作伙伴",
        contact: "联系",
        member: "成员",
        placeholderSearch: "输入关键词...",
        search: "搜索",
      },
      banner: {
        marquee: "法律科学与企业发展研究院",
        emailLabel: "邮箱",
        phoneLabel: "电话",
      },
      footer: {
        contactTitle: "联系我们",
        addressLabel: "地址：",
        addressText: "胡志明市，富裕坊，第一社区，18号街，32号",
        hotlineLabel: "热线：",
        emailLabel: "邮箱：",
        workingTimeLabel: "工作时间：",
        workingTimeText: "周一至周六：8:00 至 17:00",
        addressOffice1Label: "办公室在平阳省: ",
        addressOffice1Text: "平阳省，守德一市，富美坊，范玉石街450号",

        addressOffice2Label: "办公室在河内: ",
        addressOffice2Text: "河内市，桥纸区，中和坊，中和街70号",
        supportTitle: "支持",
        tax: "税号: ",
        office: "代表处",
        supportLink1: "外部法律服务室租赁",
        supportLink2: "诉讼代理服务",
        supportLink3: "非诉讼代理服务",
        supportLink4: "家庭律师服务",
        supportLink5: "内部公司治理系统咨询",
        consultTitle: "注册咨询",
        namePlaceholder: "姓名",
        phonePlaceholder: "电话号码",
        datePlaceholder: "咨询登记日期",
        contentPlaceholder: "内容",
        submitButton: "立即注册",
        mapTitle: "地图",
        serviceText: "咨询问题",
      },
      homepage: {
        blogCard: {
          title: "法律科学与企业发展研究院 (ILC)",
          subTitle: "奉献 - 发展 - 创新",
          content: {
            paragraph1:
              "作为隶属于越南中小企业协会（VINASME）第29分会的单位，该研究院于2024年成立，其主要职能和任务如下：开展国内外法律及商业科学研究；研究国际组织的商业制度；开展与法律、金融、投资、贸易、企业管理、数字经济、人工智能、人力资源及风险管理等相关的研究和项目实施。",
            paragraph2: "除研究活动外，该研究院还提供科技服务：",
            listItem1: "为越南中小企业制定法律顾问项目。",
            listItem2:
              "为越南中小企业提供数字化转型与信息技术项目的咨询与开发。",
            listItem3: "提供金融咨询及协助中小企业获得优惠信贷。",
            listItem4:
              "培训及提升法律知识、企业管理、人力资源管理及数字化转型技能。",
            listItem5: "提供房地产中介认证培训；管理及运营公寓。",
            paragraph3:
              "我们向已故的陈厚仁律师致以感谢和敬意，感谢他对我们的信任以及将公司品牌传递给我们的律师团队。ILC凭借其标志，凝聚了西贡土地与人民的精髓，展现出开放、多元、慷慨、侠义与信任的精神……",
            tip1: "任務",
            tip2: "願景",
            paragraph4: '"提升越南企業。"',
            paragraph5: '"新時代陪伴企業前進"',
          },
          btnContent: "查看更多",
        },
        contentSection: {
          services: {
            header: "客户服务",
            content: "率先提供全面的法律解决方案，并与企业携手同行",
          },
          developers: {
            header: "我们的开发者",
            content: "到2025年，人工智能技术将迅速发展",
          },
          knowledge: {
            header: "法律知识",
            content: "与社区共同成长",
            company: "我们拥有一个非常强大且快速发展的生态系统",
            Strategic: "战略合作伙伴",
            mediaPartners: "媒体合作伙伴",
            mediaCollaboration: "我们有机会与许多有效的媒体合作伙伴合作",
          },
          video: {
            header: "视频剪辑",
            content: "",
          },
          partners: {
            header: "客户合作伙伴",
            content: "",
          },
        },
      },
      contactPage: {
        header: "联系我们",
        platformName: "ILC平台",
        emailLabel: "邮箱:",
        hotlineLabel: "热线:",
        addressText: "地址：胡志明市，富裕坊，第一社区，18号街，32号.",
        namePlaceholder: "姓名",
        phonePlaceholder: "电话号码",
        addressPlaceholder: "地址",
        emailPlaceholder: "邮箱",
        subjectPlaceholder: "主题",
        messagePlaceholder: "内容",
        fileLabel: "选择文件",
        submitButton: "提交",
        resetButton: "重置",
        error: {
          name: "请输入您的姓名",
          phone: "请输入您的电话号码",
          phoneInvalid: "电话号码只能包含数字",
          email: "请输入您的电子邮箱",
          address: "请输入您的地址",
          subject: "请输入主题",
          message: "请输入内容",
          date: "请选择日期",
          dateFuture: "请选择不早于当前日期的日期",
        },
      },
      detailPage: {
        title: "其他服务详情",
      },
      memberPage: {
        title: "科学委员会成员",
        subTitle: "法律科学与企业发展研究院（ILC）",
        infomation: "联系信息",
        infoMember: "成员信息",
      },
      search: {
        title: "搜索",
        placeholder: "在这里输入值...",
        subTitle: "法律咨询热线",
        button: "立即拨打",
        find: "未找到结果",
        status: "加载中.....",
        result: "搜索结果",
      },
      roles: {
        MEMBER: "会员",
        VICE_PRESIDENT: "副院长",
        PRESIDENT: "院长",
        CHAIRPERSON: "董事长",
        VICE_CHAIRMAN: "副董事长",
        GROUP_PRESIDENT: "部门负责人",
        GROUP_VICE_PRESIDENT: "部门副负责人",
        ROOM_PRESIDENT: "部门经理",
        ROOM_VICE_PRESIDENT: "副科长",
        NA: "未知",
      },
      titles: {
        NA: "------",
        BACHELOR_OF_ECONOMICS_AND_LAW: "经济与法律学士",
        BACHELOR_OF_ACCOUNTING: "会计学士",
        BACHELOR_OF_BUSINESS_ADMINISTRATION: "工商管理学士",
        LAWYER: "律师",
        MASTER: "硕士",
        DOCTORATE: "博士",
        ASSOCIATE: "副教授",
        PROFESSOR: "教授",
        ARBITRATOR: "仲裁员",
        JUDGE: "法官",
      },
      about: {
        BOARD_OF_DIRECTORS: "董事会",
        SCIENTIFIC_COUNCIL: "科学委员会",
        BOARD_OF_MANAGEMERS: "管理委员会",
        ADVISORY_BOARD: "咨询委员会",
        SOCIAL_WORK_AND_BUSINESS_SUPPORT_BOARD: "社会工作与商业支持委员会",
        HUMAN_RESOURCE_TRAINING_AND_DEVELOPMENT_DEPARTMENT:
          "人力资源培训与发展部",
        DEPARTMENT_OF_DIGITAL_ECONOMY_ARTIFICIAL_INTELLIGENCE_AND_BUSINESS_DEVELOPMENT:
          "数字经济、人工智能与商业发展部",
        DEPARTMENT_OF_ECONOMICS_FINANCE_AND_INTERNATIONAL_TRADE:
          "经济、财务与国际贸易部",
        LEGAL_AND_COMMERCIAL_INSTITUTIONS_DEPARTMENT: "法律与商业机构部",
        CHIEF_OF_STAFF: "院办公室",
        Sub_header: "法律科学与企业发展研究院",
      },
      detailMember: {
        MEMBER_INFO: "成員信息",
        EDUCATION: "教育经历",
        WORK_EXPERIENCE: "工作经历",
        CONSULT_EXPERIENCE: "咨询经验",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: ["en", "zh"],
  interpolation: {
    escapeValue: false,
  },
  debug: false,
});

export default i18n;
