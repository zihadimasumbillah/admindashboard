import { motion } from "framer-motion";
import PropTypes from 'prop-types';

const THREAD_MESSAGES = [
  {
    id: 1,
    senderId: 1,
    content: "Hey, I had a question about my order #1234",
    timestamp: "10:30 AM",
    type: "received"
  },
  {
    id: 2,
    senderId: 2,
    content: "Of course! I'd be happy to help. What would you like to know?",
    timestamp: "10:32 AM",
    type: "sent"
  }
];

const MessageThread = ({ thread }) => {
  return (
    <div className="flex-1 overflow-hidden bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl">
      {/* Thread Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <img src={thread.avatar} alt={thread.sender} className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="text-lg font-medium text-gray-100">{thread.sender}</h3>
            <p className="text-sm text-gray-400">Active now</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="p-4 overflow-y-auto h-[calc(100vh-400px)]">
        {THREAD_MESSAGES.map((message) => (
          <motion.div
            key={message.id}
            className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'} mb-4`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`max-w-[70%] ${
              message.type === 'sent' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-700 text-gray-100'
              } rounded-lg px-4 py-2`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

MessageThread.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sender: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired
};

export default MessageThread;