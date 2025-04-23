// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const savedLanguage = localStorage.getItem("language") || "vi";

const resources = {
  vi: {
    translation: {
      nav: {
        home: "Trang Chủ",
        overview: "Tổng Quan",
        service: "Dịch vụ",
        training: "Đào Tạo",
        news: "Tin tức",
        legalKnowledge: "Đối Tác",
        research_title: "Nghiên Cứu",
        research: "Nghiên Cứu Khoa Học và Xây Dựng Pháp Luật",
        contact: "Liên Hệ",
        member: "Thành Viên",
        placeholderSearch: "Nhập từ khóa...",
        search: "Tìm Kiếm",
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
            paragraph0:
              'Logo được tạo nên bởi sự kết hợp của quả địa cầu màu xanh cách điệu, chữ cái ILC và tên tiếng Anh của Viện, trong đó: Quả địa cầu là biểu hiện cho phạm vi kết nối mạnh mẽ trên phạm vi toàn thế giới. Năm đường cong cách điệu bên dưới cùng nét đậm, dày và thanh mảnh dần lên trên thể hiện sự chuyển đổi cấp tiến của các doanh nghiệp trong kỷ nguyên số. Màu xanh thể hiện nền tảng là mối quan hệ hòa bình, hợp tác hữu nghị, tốt đẹp, một nền kinh tế xanh – bền vững. Ba chữ "ILC" là từ viết tắt của Viện. Chữ "I" ngay thẳng không một nét thừa - nằm ở chính giữa logo, cân đối tổng thể bố cục. Chữ "I" không chỉ là một từ viết tắt mà nó còn là đại diện cho giá trị cốt lõi của Viện - sự chính trực và công bằng của pháp luật sẽ luôn được đặt ở trung tâm. Chữ "L" là một biến thể xuất phát từ chữ "I". Điều này biểu trưng cho sự phát triển theo hướng đa dạng hóa và chuyển đổi linh hoạt. Chữ "C" là sự lồng ghép của 2 hình ảnh chiếc búa thẩm phán giáng xuống mặt gỗ và chiếc kính lúp nghiên cứu, thể hiện sự nghiên cứu pháp luật chuyên sâu. Ba chữ "ILC" màu cam đại diện cho sự sáng tạo, đổi mới và tri thức. Font của chữ "ILC" có nét dày đậm, hiện đại thể hiện truyền thống nhưng cũng sẵn sàng đổi mới. Cuối cùng là dòng chữ đầy đủ của Viện bằng tiếng Anh: Institute of Legal Science and Corporate Development. Toàn bộ logo là một sự kết hợp hài hòa mang ý nghĩa: Hợp tác phát triển toàn cầu bền vững vì giá trị chung của cộng đồng.',
            paragraph1:
              "Là đơn vị trực thuộc thứ 29 của Hiệp hội Doanh nghiệp nhỏ và vừa Việt Nam (VINASME). Viện Khoa học pháp lý và Phát triển doanh nghiệp được thành lập với mục tiêu tư vấn chính sách pháp luật, cầu nối cho chính sách của cơ quan nhà nước và hoạt động của doanh nghiệp được gặp nhau; đào tạo, bồi dưỡng kiến thức pháp luật; phản biện chính sách và kiến nghị nhà nước sửa đổi, bổ sung các quy định của pháp luật phù hợp với thực tế; nghiên cứu và ứng dụng chuyển đổi số, trí tuệ nhân tạo AI, đặc biệt tập trung vào quản trị doanh nghiệp, kinh tế xanh và công nghệ mới. Bằng cách thực hiện những mục tiêu này, Viện có thể đóng góp vào sự phát triển bền vững của doanh nghiệp, đồng thời cung cấp giá trị cho cộng đồng xã hội.",
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
          btnParagraphSeeMore: "Xem thêm",
          btnParagraphCollapse: "Thu gọn",
          btnContent: "Xem thêm",
          btnRegister: "Đăng ký",
        },
        contentSection: {
          services: {
            header: "DỊCH VỤ KHOA HỌC PHÁP LÝ",
            content:
              "Tư vấn phản biện khoa học nâng cao trình độ trong các lĩnh vực nghiên cứu.",
            currentComments: "Bình Luận Gần Đây",
            noComment: "Chưa Có Bình Luận Nào",
            comment: "Bình Luận",
            sentComment: "Gửi Bình Luận",
            needLogin2Comment: {
              sentence1: "Bạn Cần",
              sentence2: "Đăng Nhập",
              sentence3: "Để Bình Luận",
            },
            inputComment: "Nhập Bình Luận",
            thank4Rated: {
              sentance1: "Bạn Đã Đánh Giá",
              sentance2: "Sao. Cảm Ơn Bạn!",
            },
            evaluateArticle: "Đánh giá bài viết",
            share: "Chia Sẻ",
            ratingScore: "Điểm Đánh Giá:",
            recordComment: "Tương Tác Của Bạn Với Bài Viết Đã Được Ghi Nhận.",
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
            enterprise: "Đối Tác Doanh Nghiệp",
            enterprise_sub:
              "Chúng tôi tự hào đồng hành cùng nhiều doanh nghiệp lớn, vững mạnh trong các lĩnh vực khác nhau.",
            educationInstitution: "Đối Tác Giáo Dục",
            educationInstitution_sub:
              "Hệ sinh thái của chúng tôi hợp tác với các tổ chức giáo dục toàn quốc, xây dựng mạng lưới đối tác mạnh mẽ",
            organization: "Cơ Quan Đối Tác",
            organization_sub:
              "Viện phát triển mạnh mẽ, gắn kết với các cơ quan tổ chức tiềm năng, đang vươn lên",
          },
        },
      },
      contactPage: {
        header: "LIÊN HỆ",
        platformName: "ILC Platform",
        emailLabel: "Email:",
        hotlineLabel: "Liên hệ:",
        addressText:
          " Số 32, Đường số 18, Khu phố 1, phường Phú Hữu, thành phố Thủ Đức, Thành phố Hồ Chí Minh",
        namePlaceholder: "Họ tên",
        phonePlaceholder: "Số điện thoại",
        addressPlaceholder: "Địa chỉ",
        adddresslabel: "Địa chỉ:",
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
      comment: {},
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
        INVESTMENT_AND_COMMUNICATION_COOPERATION_DEPARTMENT:
          "Ban Hợp Tác Đầu Tư Và Truyền Thông",
        DEPARTMENT_OF_DIGITAL_ECONOMY_ARTIFICIAL_INTELLIGENCE_AND_BUSINESS_DEVELOPMENT:
          "Ban Kinh Tế Số, Trí Tuệ Nhân Tạo Và Phát Triển Doanh Nghiệp",
        DEPARTMENT_OF_ECONOMICS_FINANCE_AND_INTERNATIONAL_TRADE:
          "Ban Kinh tế - Tài chính và Thương mại quốc tế",
        LEGAL_AND_COMMERCIAL_INSTITUTIONS_DEPARTMENT:
          "Ban Pháp Luật Và Định Chế Thương Mại",
        OTHER_DEPRATMENTS: "Văn Phòng Và Các Ban",
        PARTNERS: "Đối Tác Của Viện",
        CHIEF_OF_STAFF: "Văn Phòng",
        Sub_header: "Viện Khoa học pháp lý và Phát triển doanh nghiệp ",
      },
      detailMember: {
        MEMBER_INFO: "Thông Tin thành viên",
        EDUCATION: "QUÁ TRÌNH HỌC TẬP",
        WORK_EXPERIENCE: "QUÁ TRÌNH CÔNG TÁC",
        CONSULT_EXPERIENCE: "KINH NGHIỆM TƯ VẤN",
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        overview: "Overview",
        service: "Service",
        training: "Training",
        news: "News",
        legalKnowledge: "Partner",
        research_title: "Research",
        research: "Scientific Research and Legal Development",
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
            paragraph0:
              'The logo is created by the combination of a stylized blue globe, the letters ILC and the English name of the Institute, in which: The globe represents the strong connectivity on a global scale. The five stylized curves below with bold, thick and thin lines gradually rising up represent the radical transformation of businesses in the digital age. The blue color represents the foundation of peaceful, friendly and good cooperation, a green and sustainable economy. The three letters "ILC" are the abbreviation of the Institute. The letter "I" is straight without a single extra line - located in the middle of the logo, balancing the overall layout. The letter "I" is not only an acronym but also represents the core values of the Institute - the integrity and fairness of the law will always be placed in the center. The letter "L" is a variation of the letter "I". This symbolizes the development towards diversification and flexible transformation. The letter "C" is a combination of two images of a judge\'s hammer hitting a wooden surface and a magnifying glass, representing in-depth legal research. The three orange letters "ILC" represent creativity, innovation and knowledge. The font of the letter "ILC" has a thick, modern stroke showing tradition but also ready for innovation. Finally, the full text of the Institute in English: Institute of Legal Science and Corporate Development. The entire logo is a harmonious combination with the meaning: Sustainable global development cooperation for the common value of the community.',
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
          btnParagraphSeeMore: "See more",
          btnParagraphCollapse: "Collapse",
          btnContent: "Read More",
          btnRegister: "Sign up",
        },
        contentSection: {
          services: {
            header: "FORENSIC SCIENCE SERVICES",
            content:
              "Pioneering comprehensive legal solutions and partnering with businesses",
            currentComments: "Latest Comments",
            noComment: "No Comments Yet",
            comment: "Comment",
            sentComment: "Sent Your Comment",
            needLogin2Comment: {
              sentence1: "You need to",
              sentence2: "log in",
              sentence3: "to comment",
            },
            inputComment: "Enter Comment",
            thank4Rated: {
              sentence1: "You Have Rated",
              sentence2: "Thank You For Your Feedback!",
            },
            evaluateArticle: "Evaluate This Article",
            share: "Share",
            ratingScore: "Rating Score:",
            recordComment: "Your Feedback Has Been Recorded.",
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
            enterprise: "Enterprise Partner",
            enterprise_sub:
              "We are proud to partner with many large and strong enterprises across various industries",
            educationInstitution: "Educational Partner",
            educationInstitution_sub:
              "Our ecosystem collaborates with educational institutions nationwide, building a robust network of partners",
            organization: "Partner Organization",
            organization_sub:
              "The institute is growing rapidly, building strong connections with potential organizations that are rising",
          },
        },
      },
      contactPage: {
        header: "CONTACT",
        platformName: "ILC Platform",
        emailLabel: "Email:",
        hotlineLabel: "Hotline:",
        addressText:
          "32, Street No. 18, Quarter 1, Phú Hữu Ward, Thủ Đức City, Ho Chi Minh City.",
        namePlaceholder: "Full Name",
        adddresslabel: "Address:",
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
        INVESTMENT_AND_COMMUNICATION_COOPERATION_DEPARTMENT:
          "Investment and Communication Cooperation Department",
        DEPARTMENT_OF_DIGITAL_ECONOMY_ARTIFICIAL_INTELLIGENCE_AND_BUSINESS_DEVELOPMENT:
          "Department of Digital Economy, Artificial Intelligence and Business Development",
        DEPARTMENT_OF_ECONOMICS_FINANCE_AND_INTERNATIONAL_TRADE:
          "Department of Economics, Finance and International Trade",
        LEGAL_AND_COMMERCIAL_INSTITUTIONS_DEPARTMENT:
          "Department of Legal Affairs and Commercial Institutions",
        OTHER_DEPRATMENTS: "Office And Departments",
        CHIEF_OF_STAFF: "Office",
        PARTNERS: "Partners",
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
        training: "培训",
        news: "新闻",
        legalKnowledge: "合作伙伴",
        research_title: "研究",
        research: "科学研究与立法建设",
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
        addressText: "明市，富裕坊，第一社区，18号街，32号",
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
            paragraph0:
              "該標誌由一個風格化的藍色地球、字母ILC和學院的英文名稱組合而成，其中：地球象徵著全球範​​圍內的強大聯繫。下方五條風格化的曲線，以粗、粗、細的筆觸逐漸向上移動，代表著數位時代企業的徹底轉變。綠色代表和平、友好、良好關係的基礎以及綠色、永續的經濟。「ILC」三個字母是Institute的縮寫。字母“I”筆直，沒有多餘的筆畫，位於標誌的中心，平衡了整體佈局。字母「I」不僅僅是一個縮寫，它還代表了該研究所的核心價值——法律的誠信和公正永遠是中心。字母“L”是字母“I”的變體。這代表著多樣化和靈活轉型的成長。字母「C」由兩個圖像組合而成：法官的法槌敲擊木質表面和放大鏡，代表著深入的法律研究。三個橙色字母「ILC」代表創造力、創新和知識。「ILC」字樣的字體具有濃重的現代筆觸，代表著傳統，但也為創新做好了準備。最後，該研究所的英文全文為：Institute of Legal Science and Corporate Development。整個標誌造型和諧統一，寓意：為社會共同價值而進行永續的全球發展合作。",
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
          btnParagraphSeeMore: "查看更多",
          btnParagraphCollapse: "收起",
          btnContent: "查看更多",
          btnRegister: "注册",
        },
        contentSection: {
          services: {
            header: "法医科学服务",
            content: "率先提供全面的法律解决方案，并与企业携手同行",
            currentComments: "最新评论",
            noComment: "还没有评论",
            comment: "评论",
            sentComment: "提交评论",
            needLogin2Comment: {
              sentence1: "你需要",
              sentence2: "登录",
              sentence3: "才能评论",
            },
            inputComment: "输入评论",
            thank4Rated: {
              sentence1: "您已评分",
              sentence2: "谢谢您的评价！",
            },
            evaluateArticle: "评价文章",
            share: "分享",
            ratingScore: "评分:",
            recordComment: "您对文章的互动已被记录",
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
            enterprise: "企业合作伙伴",
            enterprise_sub: "我们自豪地与多个行业的大型且强大的企业合作",
            educationInstitution: "教育合作伙伴",
            educationInstitution_sub:
              "我们的生态系统与全国各地的教育机构合作，建立了一个强大的合作伙伴网络",
            organization: "合作机构",
            organization_sub:
              "学院正在快速发展，与有潜力的机构建立紧密联系，正在崛起",
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
        adddresslabel: "地址：",
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
        INVESTMENT_AND_COMMUNICATION_COOPERATION_DEPARTMENT: "投资与传播合作部",
        DEPARTMENT_OF_DIGITAL_ECONOMY_ARTIFICIAL_INTELLIGENCE_AND_BUSINESS_DEVELOPMENT:
          "数字经济、人工智能与商业发展部",
        DEPARTMENT_OF_ECONOMICS_FINANCE_AND_INTERNATIONAL_TRADE:
          "经济、财务与国际贸易部",
        LEGAL_AND_COMMERCIAL_INSTITUTIONS_DEPARTMENT: "法律与商业机构部",
        OTHER_DEPRATMENTS: "办公室和部门",
        PARTNERS: "合作伙伴",
        CHIEF_OF_STAFF: "办公室",
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
