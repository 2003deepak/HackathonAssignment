import React from "react";

const ChatMessage = ({ type, content }) => {
  // Function to format the content with proper styling
  const formatContent = (text) => {
    if (typeof text !== 'string') return text;

    const formattedLines = text.split('\n').map((line, index) => {
      // Format headings (remove the # symbol)
      if (line.startsWith('#')) {
        return (
          <h3 key={index} className="text-lg font-bold my-3 mb-4">
            {line.replace(/^###\s*/, '').trim()}
          </h3>
        );
      }
      
      // Format subheadings (remove the ## symbol)
      if (line.startsWith('#')) {
        return (
          <h4 key={index} className="text-md font-semibold my-2 mb-4">
            {line.replace(/^#\s*/, '').trim()}
          </h4>
        );
      }
      
      // Format bullet points
      if (line.trim().startsWith('-')) {
        // Bold numbers in bullet points
        const formattedLine = line.replace(
          /(\d+(?:\.\d+)?)/g, 
          '<strong>$1</strong>'
        );
        return (
          <li key={index} className="ml-4 my-1 mb-4" 
              dangerouslySetInnerHTML={{ __html: formattedLine.replace('-', '').trim() }} />
        );
      }
      
      // Format bold text (replace ** with <strong>)
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Format numbers (if any) as bold
      line = line.replace(/(\d+(?:\.\d+)?)/g, '<strong>$1</strong>');
      
      return line.trim() ? (
        <p key={index} className="my-1 mb-4" 
           dangerouslySetInnerHTML={{ __html: line }} />
      ) : <br key={index} />;
    });

    return <div className="space-y-1">{formattedLines}</div>;
  };

  return (
    <div className={`flex ${type === "user" ? "justify-end" : "justify-start"} my-4`}>
      <div
        className={`max-w-[75%] p-4 rounded-lg shadow-md ${
          type === "user"
            ? "bg-indigo-600 text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {formatContent(content)}
      </div>
    </div>
  );
};

export default ChatMessage;
