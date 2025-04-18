import React from "react";

const BlogCard = ({
  imageUrl,
  title,
  subTitle,
  content,
  showBtn,
  btnContent,
  path,
}) => {
  return (
    <div className="max-w-screen-2xl mx-auto md:w-3/4" id="blog-product">
      <div className="flex flex-wrap lg:flex-nowrap md:justify-center items-center gap-12">
        <div className="lg:w-3/4 w-full px-2">
          <div className=" border-1 border-red-400 border-l-4">
            <h2 className="text-2xl lg:text-2xl font-extrabold text-brandSecondary mx-2 mb-2 uppercase">
              {title}
            </h2>
            <h2 className="text-base  font-bold px-2 text-neutralDGrey mb-4  border-b-2">
              {subTitle}
            </h2>
          </div>

          <div className="text-black text-md leading-6 mb-8">{content}</div>

          <div className="flex justify-end">
            {showBtn && (
              <a
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md text-center  md:w-28  w-full  md:p-3 p-4 py-2 bg-brandSecondary text-white hover:bg-neutralDGrey transition-all duration-300 hover:-translate-y-4"
              >
                {btnContent}
              </a>
            )}
          </div>
        </div>
        <div className="hidden xl:block">
          <img src={imageUrl} alt={title} className="w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
