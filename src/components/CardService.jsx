import React from "react";

export default function CardService({ img }) {
  return (
    <div className="cursor-pointer">
      <img src={img} alt={"service"} className=" p-2 h-[120px] w-[240px] mx-auto" loading="lazy"/>
    </div>
  );
}
