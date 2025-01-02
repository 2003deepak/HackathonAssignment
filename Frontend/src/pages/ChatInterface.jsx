import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import PostTypeSelector from "../components/PostTypeSelector";
import ChatMessage from "../components/ChatMessage";
import PostTypeStore from "../store/PostTypeStore";
import axios from "axios";

const ChatInterface = () => {

  // Use state to store messages in a format on array inside object 
  const [messages, setMessages] = useState([
    { type: "bot", content: "Hello! Select a post type to analyze your social media performance." },
  ]);

  const selectedType = PostTypeStore((state) => state.selectedPostType);


  const fetchResponse = async (selectedType) => {

    // Add a typing message to the messages array
    setMessages((prev) => [
      ...prev,
      { type: "user", content: `Analyzing ${selectedType} post type...` },
      { type: "bot", content: "", isTyping: true },
    ]);
  
    try {
      // Make the API call
      const API_URL = `http://localhost:3000/api/test?post_type=${selectedType}`;
      const response = await axios.get(API_URL);
  
      // Remove the typing message and add the API response
      setMessages((prev) => [
        ...prev.filter((message) => !(message.type === "bot" && message.isTyping)),
        { type: "bot", content: response.data || "No response from API", isTyping: false },
      ]);

    } catch (error) {
      console.error("Error fetching data:", error);
  
      // Remove the typing message and add the error message
      setMessages((prev) => [
        ...prev.filter((message) => !(message.type === "bot" && message.isTyping)),
        { type: "bot", content: "Error: Something went wrong. Please try again.", isError: true },
      ]);
    }
  };


  useEffect(() => {
    if (!selectedType) return;
    fetchResponse(selectedType);
  }, [selectedType]);

  

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-teal-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex flex-col h-[80vh]">
          <div className="bg-indigo-700 p-5 text-white flex items-center gap-3 rounded-t-lg">
            <MessageSquare className="w-7 h-7" />
            <h1 className="text-xl font-semibold">Social Media Analytics Assistant</h1>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                type={message.type}
                content={message.content}
                isTyping={message.isTyping}
              />
            ))}
          </div>

          <div className="bg-gray-50 p-5 rounded-b-lg">
            <PostTypeSelector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
