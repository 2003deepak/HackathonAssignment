import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import PostTypeSelector from "../components/PostTypeSelector";
import ChatMessage from "../components/ChatMessage";
import PostTypeStore from "../store/PostTypeStore";
import axios from "axios";
import BarChartComponent from "../components/BarChartComponent"; // Bar chart for Carousel
import LineGraphComponent from "../components/LineGraphComponent"; // Line graph for Normal Posts

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { type: "bot", content: "Hello! Select a post type to analyze your social media performance." },
  ]);
  const [averages, setAverages] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to toggle modal visibility
  const [selectedGraph, setSelectedGraph] = useState('bar'); // State to toggle between Bar and Line graph
  const selectedType = PostTypeStore((state) => state.selectedPostType);

  // Function to fetch response based on selected post type
  const fetchResponse = async (selectedType) => {
    setMessages((prev) => [
      ...prev,
      { type: "user", content: `Analyzing ${selectedType} post type...` },
      { type: "bot", content: "", isTyping: true },
    ]);

    try {
      // API calls to fetch stats
      const API_URL = `http://localhost:3000/api/test?post_type=${selectedType}`;
      const response = await axios.get(API_URL);
      const API_URL2 = `http://localhost:3000/api/stats`;
      const response2 = await axios.get(API_URL2);
      setAverages(response2.data.averages); // Store stats

      // Update messages
      setMessages((prev) => [
        ...prev.filter((message) => !(message.type === "bot" && message.isTyping)),
        { type: "bot", content: response.data || "No response from API", isTyping: false },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  // Toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Handle Graph Type Change (Bar or Line)
  const handleGraphChange = (graphType) => {
    setSelectedGraph(graphType);
  };

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

          {/* Button to Show Stats */}
          {averages.length > 0 && (
            <div className="text-center mt-5">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={toggleModal}
              >
                View Social Media Stats
              </button>
            </div>
          )}

          {/* Modal to Show Stats */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-4/5 sm:w-1/2">
                <h2 className="text-xl font-semibold mb-4">Social Media Post Averages</h2>
                
                {/* Graph Type Selection */}
                <div className="flex justify-center mb-4">
                  <button
                    className={`px-4 py-2 mr-2 ${selectedGraph === 'bar' ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-md`}
                    onClick={() => handleGraphChange('bar')}
                  >
                    Bar Chart
                  </button>
                  <button
                    className={`px-4 py-2 ${selectedGraph === 'line' ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-md`}
                    onClick={() => handleGraphChange('line')}
                  >
                    Line Graph
                  </button>
                </div>

                {/* Render the selected graph */}
                {selectedGraph === 'bar' ? (
                  <BarChartComponent data={averages} />
                ) : (
                  <LineGraphComponent data={averages} />
                )}

                <button
                  className="mt-5 px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="bg-gray-50 p-5 rounded-b-lg">
            <PostTypeSelector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
