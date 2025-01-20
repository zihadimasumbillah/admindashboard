import { useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";
import PropTypes from 'prop-types';

const MessageComposer = ({ threadId }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message to thread:", threadId, message);
      setMessage("");
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-4 mt-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <button
          type="button"
          className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
        >
          <Paperclip size={20} />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
        >
          <Smile size={20} />
        </button>
        
        <button
          type="submit"
          disabled={!message.trim()}
          className={`p-2 rounded-lg ${
            message.trim() 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
              : 'bg-gray-700 text-gray-400'
          } transition-colors`}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

MessageComposer.propTypes = {
  threadId: PropTypes.number.isRequired
};

export default MessageComposer;