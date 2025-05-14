import { IconVideo } from "../assets";

export default function CardVideo({ img, title, url }) {
  return (
    <div className="text-center cursor-pointer w-full">
      <div className="py-2 bg-black rounded-3xl overflow-hidden group shadow-lg">
        <a
          href={url}
          className="block relative"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={img}
            alt={title}
            className="py-4 h-[200px] w-full mx-auto transform transition-transform duration-300 ease-in-out group-hover:scale-110"
          />

          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-3 rounded-full hover:scale-110 transition bg-black/50">
            <img src={IconVideo} alt={title} className="w-10 h-10" />
          </button>
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
