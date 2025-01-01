import React from "react";
import { Image, Video, FileText } from "lucide-react";
import PostTypeStore from "../store/PostTypeStore";

const postTypes = [
  { id: 0, name: "Static", icon: Image },
  { id: 1, name: "Reel", icon: Video },
  { id: 2, name: "Carousel", icon: FileText },
];

const PostTypeSelector = () => {
  const setSelectedPostType = PostTypeStore((state) => state.setSelectedPostType);

  return (
    <div className="p-5 border-t">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Select Post Type</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {postTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedPostType(type.id)}
            className="flex flex-col items-center p-5 bg-white border rounded-lg shadow-md hover:bg-indigo-100 transition duration-300 ease-in-out"
          >
            <type.icon className="w-10 h-10 text-indigo-600 mb-3" />
            <span className="text-sm font-medium text-gray-800">{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostTypeSelector;
