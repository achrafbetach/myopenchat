import React from "react";

const Answer = ({ content }) => {
  const handleCopy = () => {
    const textarea = document.createElement("textarea");
    textarea.value = content;

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  return (
    <div className="relative bg-sky-50 rounded-[1.8rem] w-full  p-4">
      <div className="flex items-start gap-4">
        <img
          className="w-12 h-12 rounded-full"
          src="https://chatbot.design/images/chatbot/DIGITAL%20%28RGB%29/PNG/Contained_Mark_Blue.png"
          alt="ai"
        />

        <p className="text-lg font-medium py-2.5 text-gray-900">
          {content}
        </p>
      </div>
      <button
        className="w-fit relative float-end bottom-0 right-0 bg-white rounded-full py-1.5 px-3 flex items-center justify-center space-x-1 hover:bg-gray-50"
        onClick={handleCopy}
      >
        <svg
          className="w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C15.6569 3 17 4.34315 17 6V15C17 16.6569 15.6569 18 14 18H7C5.34315 18 4 16.6569 4 15V9C4 8.73478 4.10536 8.48043 4.29289 8.29289L9.29289 3.29289ZM14 5H11V9C11 9.55228 10.5523 10 10 10H6V15C6 15.5523 6.44772 16 7 16H14C14.5523 16 15 15.5523 15 15V6C15 5.44772 14.5523 5 14 5ZM7.41421 8H9V6.41421L7.41421 8ZM19 5C19.5523 5 20 5.44772 20 6V18C20 19.6569 18.6569 21 17 21H7C6.44772 21 6 20.5523 6 20C6 19.4477 6.44772 19 7 19H17C17.5523 19 18 18.5523 18 18V6C18 5.44772 18.4477 5 19 5Z"
            className="fill-sky-300"
          />
        </svg>
        <span className="text-base text-sky-400 font-semibold">Copy</span>
      </button>
    </div>
  );
};

export default Answer;
