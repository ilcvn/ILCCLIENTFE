import React from "react";
import parse, { domToReact } from "html-react-parser";

export default function CustomizedArticleContent({ content }) {

  const myTransform = (node, index) => {

    if (node.type === "tag" && node.name === "div") {
      return (
        <div key={index} className=" w-full text-black text-base mb-4">
          {domToReact(node.children, { transform: myTransform })}
        </div>
      );
    }
    if (node.type === "tag" && node.name === "h2") {
        return (
          <h2 key={index} style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
            {domToReact(node.children, { transform: myTransform })}
          </h2>
        );
      }
      
    // if (node.type === "tag" && node.name === "p") {
    //   return (
    //     <p key={index} className="my-custom-p mb-4">
    //       {domToReact(node.children, { transform: myTransform })}
    //     </p>
    //   );
    // }
    // if (node.type === "tag" && node.name === "ul") {
    //   return (
    //     <ul key={index} className="list-disc pl-6 mb-4">
    //       {domToReact(node.children, { transform: myTransform })}
    //     </ul>
    //   );
    // }
    // if (node.type === "tag" && node.name === "li") {
    //   return (
    //     <li key={index} className="my-custom-li">
    //       {domToReact(node.children, { transform: myTransform })}
    //     </li>
    //   );
    // }
    return; // Trả về undefined để html-react-parser xử lý các node khác mặc định
  };

  const safeContent = typeof content === "string" ? content : "";
  const options = { transform: myTransform };

  return <div className="block text-black">{parse(safeContent, options)}</div>;
}
