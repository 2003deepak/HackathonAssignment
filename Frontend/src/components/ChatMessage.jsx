import React from "react";

const formatContent = (content) => {
  if (!content) return "";

  const lines = content.split("\n");

  return lines.map((line, lineIndex) => {
    const headerMatch = line.match(/^(#{1,6})\s(.+)/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const text = headerMatch[2];
      const HeaderTag = `h${level}`;
      return (
        <HeaderTag key={lineIndex} className="font-bold text-lg mb-4">
          {formatBoldTextAndNumbers(text)}
        </HeaderTag>
      );
    }

    const listMatch = line.match(/^-\s(.+)/);
    if (listMatch) {
      return (
        <li key={lineIndex} className="ml-4 mb-3">
          {formatBoldTextAndNumbers(listMatch[1])}
        </li>
      );
    }

    return <p key={lineIndex} className="mb-2">{formatBoldTextAndNumbers(line)}</p>;
  });
};

const formatBoldTextAndNumbers = (text) => {
  // Handle explicit bold markers and numbers
  const boldParts = text.split(/\*\*(.*?)\*\*/);
  return boldParts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={`bold-${index}`} className="font-bold">{part}</strong>;
    }
    return part.split(/(\d+(?:\.\d+)?)/g).map((segment, segIndex) => {
      if (/^\d+(?:\.\d+)?$/.test(segment)) {
        return <strong key={`num-${index}-${segIndex}`} className="font-bold">{segment}</strong>;
      }
      return <span key={`text-${index}-${segIndex}`}>{segment}</span>;
    });
  });
};

const ChatMessage = ({ type, content, isTyping }) => {
  return (
    <div className={`flex ${type === "user" ? "justify-end" : "justify-start"} my-4`}>
      <div
        className={`max-w-[75%] p-4 rounded-lg shadow-md ${
          type === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        {/* Render formatted content or show loading dots */}
        {!isTyping ? formatContent(content) : (
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        )}


       
      </div>
    </div>
  );
};

export default ChatMessage;
