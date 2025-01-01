import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import PostTypeSelector from "../components/PostTypeSelector";
import ChatMessage from "../components/ChatMessage";
import PostTypeStore from "../store/PostTypeStore";
import axios from "axios";

const LoadingDots = () => (
  <div className="flex space-x-2 p-4 bg-gray-100 rounded-lg w-24">
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
  </div>
);

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { type: "bot", content: "Hello! Select a post type to analyze your social media performance." },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const selectedType = PostTypeStore((state) => state.selectedPostType);

  useEffect(() => {
    if (!selectedType) return;

    const fetchResponse = async () => {
      setIsLoading(true);
      try {
        setMessages((prev) => [
          ...prev,
          { type: "user", content: `Analyzing ${selectedType} post type...` },
        ]);

        const API_URL = "http://localhost:3000/api/langflow";
        
        const response = await axios.post(API_URL, {
          postType: selectedType,
        });

        if (response.data) {
          const artifacts = response.data?.outputs?.[0]?.outputs?.[0]?.results?.message?.data?.text || "No artifacts found";

          // Format the artifacts content
          const formattedArtifacts = artifacts
            .split('\n')
            .map(line => line.trim())
            .join('\n');

          setMessages((prev) => [
            ...prev,
            { type: "bot", content: formattedArtifacts },
          ]);
        }
      } catch (error) {
        console.error("Error fetching the response:", error);
        let errorMessage = "Sorry, something went wrong.";
        if (error.response) {
          errorMessage = `Server error: ${error.response.status}`;
        } else if (error.request) {
          errorMessage = "No response from server. Please check your connection.";
        }
        setMessages((prev) => [...prev, { type: "bot", content: errorMessage }]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResponse();
  }, [selectedType]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-teal-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex flex-col h-[80vh]">
          {/* Header */}
          <div className="bg-indigo-700 p-5 text-white flex items-center gap-3 rounded-t-lg">
            <MessageSquare className="w-7 h-7" />
            <h1 className="text-xl font-semibold">Social Media Analytics Assistant</h1>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {messages.map((message, index) => (
              <ChatMessage key={index} type={message.type} content={message.content} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <LoadingDots />
              </div>
            )}
          </div>

          {/* Post Type Selector */}
          <div className="bg-gray-50 p-5 rounded-b-lg">
            <PostTypeSelector disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;