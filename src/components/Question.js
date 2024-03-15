import React from "react";
import ReactHtmlParser from "react-html-parser";

const Question = ({ content }) => {
  return (
    <div className="w-full flex items-start gap-4 p-4">
      <img
        className="w-12 h-12 rounded-full"
        src="https://store-images.s-microsoft.com/image/apps.50628.14041116761224941.fe26cc86-1c48-433a-bf5d-147a9fed343a.991ce1fa-da52-467d-b7dc-39d970701e71?h=464"
        alt="User"
      />

      <p className="text-lg font-medium py-2.5 text-gray-900">
        {ReactHtmlParser(content)}
      </p>
    </div>
  );
};

export default Question;
