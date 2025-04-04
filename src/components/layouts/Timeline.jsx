import React from "react";

export default function Timeline({ data = [] }) {
  if (!data.length) {
    return <p className="text-gray-500">Chưa có thông tin</p>;
  }

  return (
    <div className="relative h-[300px]">
      {/* Vertical line cố định */}
      <div className="absolute left-2 top-0 h-[300px] w-[2px] bg-gray-300"></div>
      
      {/* Container danh sách timeline có overflow-y nếu cần scroll */}
      <ul className="relative pl-8 h-full overflow-y-auto">
        {data.map((event, index) => (
          <li key={event.id || index} className="relative mb-8 pb-4">
            {/* Dot */}
            <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-brandSecondary"></div>
            
            <div className="ml-6">
              <p className="text-lg font-bold">
                {event.fromDate} - {event.toDate}
              </p>
              <p className="text-gray-600">{event.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
