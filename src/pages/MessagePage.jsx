import { motion } from "framer-motion";
import { useState } from "react";
import MessagesList from "../components/messages/MessagesList";
import MessageThread from "../components/messages/MessageThread";
import MessageComposer from "../components/messages/MessageComposer";

const MessagesPage = () => {
  const [selectedThread, setSelectedThread] = useState(null);

  return (
    <div className="flex-1 overflow-hidden relative z-10">
      <main className="h-full max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-1 overflow-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <MessagesList onThreadSelect={setSelectedThread} />
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2 flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {selectedThread ? (
              <>
                <MessageThread thread={selectedThread} />
                <MessageComposer threadId={selectedThread.id} />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                Select a conversation to start messaging
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;