import React, { useEffect, useRef } from 'react';
import Answer from './Answer';
import Question from './Question';

const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full h-full flex flex-col items-center space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      {messages.map((message, index) => {
        if (message.role === 'user') {
          return <Question key={index} content={message.content} />;
        } else if (message.role === 'assistant') {
          return <Answer key={index} content={message.content} />;
        }
        return null;
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
