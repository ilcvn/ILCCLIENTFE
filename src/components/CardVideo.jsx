import React from "react";
import { IconVideo } from "../assets";

export default function CardVideo({ img, title, url }) {
  return (
    <div className="text-center cursor-pointer w-full ">
      <div className="py-2 bg-black rounded-3xl overflow-hidden group">
        <a href={url} className="block relative">
          <img
            src={img}
            alt={title}
            className="py-4 h-[200px] w-full mx-auto transform transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src={IconVideo} alt="" className="w-12 h-12" />
          </span>
        </a>
      </div>
      <div className="p-2">
        <h1 className="text-sm font-bold p-1 text-neutralGrey hover:text-brandSecondary">
          {title}
        </h1>
      </div>
    </div>
  );
}
