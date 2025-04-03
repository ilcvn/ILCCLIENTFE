import { useParams, useNavigate } from "react-router-dom";

const members = {
  "65499fc70775e54cfc15dd94": {
    name: "TS. TRẦN QUÝ",
    position: "Viện Trưởng",
    expertise: "Chuyên gia Kinh tế số",
    email: "tranquy@vide.vn",
    phone: "0919 696 000",
    description:
      "TS. Trần Quý là Viện trưởng Viện Phát Triển Kinh Tế Số Việt Nam...",
    image: "/path-to-image.jpg",
    timeline: [
      { year: "2015", event: "Bắt đầu nghiên cứu về Kinh tế số" },
      {
        year: "2018",
        event: "Trở thành Viện trưởng Viện Phát Triển Kinh Tế Số",
      },
      { year: "2022", event: "Xuất bản sách về Chuyển đổi số" },
    ],
  },
};

export default function MemberDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = members[id];

  if (!member) return <p className="text-center">Không tìm thấy thành viên.</p>;

  return (
    <div className="container mx-auto p-6">
      <button onClick={() => navigate(-1)} className="text-blue-500">
        ← Quay lại
      </button>
      <h1 className="text-3xl font-bold mt-4">{member.name}</h1>
      <p className="text-gray-600">{member.position}</p>
      <img
        src={member.image}
        alt={member.name}
        className="w-40 h-40 rounded-full mt-4"
      />
      <p className="mt-4">{member.description}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Cột mốc hoạt động</h2>
        <ul className="mt-2 space-y-2">
          {member.timeline.map((event, index) => (
            <li key={index} className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm font-semibold">{event.year}</p>
              <p className="text-gray-600">{event.event}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
