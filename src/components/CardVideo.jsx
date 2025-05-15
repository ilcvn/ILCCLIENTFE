import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function CardVideo({ videoId, title }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="text-center cursor-pointer w-full"
      >
        <div className="py-2 bg-black rounded-3xl overflow-hidden shadow-lg">
          <div className="relative w-full h-[200px]">
            <iframe
              className="w-full h-full pointer-events-none"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        <div className="p-2">
          <h1 className="text-sm font-bold p-1 text-neutralGrey hover:text-brandSecondary">
            {title}
          </h1>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          aria-hidden="true"
        />
        <div className="relative bg-white rounded-xl max-w-4xl w-full mx-4 shadow-xl">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-white bg-black rounded-full px-3 py-1 z-10"
          >
            ✕
          </button>
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              frameBorder="0"
              allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}
