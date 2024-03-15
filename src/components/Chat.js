import React, { useState } from "react";
import Messages from "./Messages";
import Header from "./Header";

const Chat = () => {
  const API_KEY = process.env.REACT_APP_OPEN_API_KEY;
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (messageContent) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: messageContent },
    ]);
    chatData(messageContent);
    setIsTyping(true);
  };

  const chatData = async (userMessage) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [...messages, { role: "user", content: userMessage }],
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Oops! Something went wrong while processing your request."
        );
      }

      const responseData = await response.json();
      setIsTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: responseData.choices[0].message.content,
        },
      ]);
    } catch (error) {
      console.error("Error while fetching chat data:", error);
      setIsTyping(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center bg-white px-24 pb-12 pt-6 space-y-8">
      <Header/>
      <Messages messages={messages} />
      
      <div className="bottom-0 w-full">
        {isTyping && <div className="font-medium text-base italic text-gray-400 mb-2">Bot is typing...</div>}
        <form className="bg-gray-50 shadow-inner border relative border-gray-200 rounded-[1.8rem] p-2  flex items-center justify-between w-full"
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.target.input.value;
            if (input.trim() !== "") {
              handleSendMessage(input);
              e.target.reset();
            }
          }}
        >
          <input
            className="w-full ring-0 outline-none px-2 bg-transparent font-medium"
            type="text"
            name="input"
            placeholder="Type your message..."
            disabled={isTyping}
            autoComplete="off"
          />
          <button className="rounded-full p-3 bg-blue-600" type="submit" disabled={isTyping}>
            <svg
              className="w-8"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
      {/* <Messages messages={messages} />
        <div className='flex items-center'>
            <form onSubmit={handleSubmit}>
                <input className='' value={question} onChange={(e) => setQuestion(e.target.value)} placeholder='Posez une question!' />
                <button className='bg-sky-600 text-white px-4 py-1.5 text-lg font-semibold' type="submit">Envoyer</button>
            </form>
        </div> */}
    </div>
  );
};
export default Chat;
