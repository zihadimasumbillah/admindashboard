import { motion } from "framer-motion";
import { useState } from "react";
import { Search } from "lucide-react";
import PropTypes from 'prop-types';

const MESSAGES_DATA = [
  {
    id: 1,
    sender: "John Smith",
    avatar: "https://ui-avatars.com/api/?name=John+Smith",
    preview: "Hey, I had a question about my order #1234",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    sender: "Sarah Johnson",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson",
    preview: "Thanks for the quick response!",
    time: "1h ago",
    unread: false,
  }
];

const MessagesList = ({ onThreadSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [messages] = useState(MESSAGES_DATA);

  const filteredMessages = messages.filter(message =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl h-full">
      <div className="p-4 border-b border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-250px)]">
        {filteredMessages.map((message) => (
          <motion.div
            key={message.id}
            className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700/50 ${
              message.unread ? 'bg-gray-700/30' : ''
            }`}
            onClick={() => onThreadSelect(message)}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start space-x-4">
              <img
                src={message.avatar}
                alt={message.sender}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-100 truncate">
                    {message.sender}
                  </h3>
                  <span className="text-xs text-gray-400">{message.time}</span>
                </div>
                <p className="text-sm text-gray-400 truncate">{message.preview}</p>
              </div>
              {message.unread && (
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

MessagesList.propTypes = {
  onThreadSelect: PropTypes.func.isRequired
};

export default MessagesList;