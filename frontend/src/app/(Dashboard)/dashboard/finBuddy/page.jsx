// 'use client'
// import React, { useState, useRef } from 'react';
// import { Send, Mic, Copy, ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
// import { UserButton } from "@clerk/nextjs";

// const ChatMessage = ({ message, isUser }) => {
//   const [isPlaying, setIsPlaying] = useState(false);

//   return (
//     <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
//       {!isUser && (
//         <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
//           SL
//         </div>
//       )}
//       <div className={`max-w-[80%] ${isUser ? 'order-1' : 'order-2'}`}>
//         <div className="flex flex-col">
//           {message.type === 'audio' ? (
//             <div className="bg-blue-500 text-white p-3 rounded-lg">
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setIsPlaying(!isPlaying)}
//                   className="p-2 hover:bg-blue-600 rounded-full"
//                 >
//                   {isPlaying ? 'Pause' : 'Play'}
//                 </button>
//                 <div className="flex-1">
//                   <div className="w-full bg-blue-400 h-2 rounded-full">
//                     <div className="bg-white h-full w-1/3 rounded-full"/>
//                   </div>
//                 </div>
//                 <span className="text-sm">{message.duration}</span>
//               </div>
//             </div>
//           ) : message.type === 'link' ? (
//             <Card className="bg-blue-500 text-white">
//               <CardContent className="p-4">
//                 <h3 className="font-semibold mb-1">{message.title}</h3>
//                 <p className="text-sm mb-2">{message.description}</p>
//                 <a href={message.url} className="text-sm underline">{message.url}</a>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className={`p-3 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
//               <p>{message.content}</p>
//             </div>
//           )}
//           <div className="flex items-center gap-2 mt-1">
//             <span className="text-xs text-gray-500">{message.timestamp}</span>
//             {message.status && (
//               <span className="text-xs text-gray-500">✓</span>
//             )}
//           </div>
//         </div>
//       </div>
//       {isUser && (
//         <div className="ml-2">
//           <UserButton
//             appearance={{
//               elements: {
//                 avatarBox: "w-8 h-8"
//               }
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// const ChatBot = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const fileInputRef = useRef(null);

//   const handleSend = () => {
//     if (inputValue.trim()) {
//       const newMessage = {
//         type: 'text',
//         content: inputValue,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         status: true,
//       };
//       setMessages([...messages, newMessage]);
//       setInputValue('');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const toggleRecording = () => {
//     setIsRecording(!isRecording);
//   };

//   return (
//     <div className="flex flex-col h-screen max-w-3xl mx-auto">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b">
//         <div className="flex items-center gap-4">
//           <h1 className="text-xl font-bold">Chatbot</h1>
//         </div>
//         <div className="flex items-center gap-2">
//           <UserButton
//             appearance={{
//               elements: {
//                 avatarBox: "h-8 w-8"
//               }
//             }}
//           />
//         </div>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto p-4">
//         {messages.map((message, index) => (
//           <ChatMessage
//             key={index}
//             message={message}
//             isUser={index % 2 === 0}
//           />
//         ))}
//       </div>

//       {/* Message Actions */}
//       <div className="flex items-center gap-2 px-4 py-2 border-t">
//         <button className="p-2 hover:bg-gray-100 rounded-full">
//           <Copy className="w-5 h-5" />
//         </button>
//         <button className="p-2 hover:bg-gray-100 rounded-full">
//           <ThumbsUp className="w-5 h-5" />
//         </button>
//         <button className="p-2 hover:bg-gray-100 rounded-full">
//           <ThumbsDown className="w-5 h-5" />
//         </button>
//         <button className="p-2 hover:bg-gray-100 rounded-full">
//           <MoreVertical className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Input Area */}
//       <div className="border-t p-4">
//         <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Message to FinBuddy..."
//             className="flex-1 bg-transparent outline-none"
//           />
//           <input
//             type="file"
//             ref={fileInputRef}
//             className="hidden"
//             accept="image/*,audio/*"
//           />
//           <button
//             onClick={toggleRecording}
//             className={`p-2 hover:bg-gray-200 rounded-full ${isRecording ? 'text-red-500' : ''}`}
//           >
//             <Mic className="w-5 h-5" />
//           </button>
//           <button
//             onClick={handleSend}
//             className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;


'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Copy, ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { UserButton } from "@clerk/nextjs";

const ChatMessage = ({ message, isUser }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
          FS
        </div>
      )}
      <div className={`max-w-[80%] ${isUser ? 'order-1' : 'order-2'}`}>
        <div className="flex flex-col">
          <div className={`p-3 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
            <p>{message.content}</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">{message.timestamp}</span>
            {message.status && (
              <span className="text-xs text-gray-500">✓</span>
            )}
          </div>
        </div>
      </div>
      {isUser && (
        <div className="ml-2">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8"
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage = {
        type: 'text',
        content: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: true,
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        setMessages(prev => [...prev, data.response]);
      } else {
        throw new Error(data.message || 'Server error');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        type: 'text',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">FinSaathi AI</h1>
        </div>
        <div className="flex items-center gap-2">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8"
              }
            }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            isUser={index % 2 === 0}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-2 px-4 py-2 border-t">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Copy className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <ThumbsUp className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <ThumbsDown className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="border-t p-4">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask FinSaathi about your finances..."
            className="flex-1 bg-transparent outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className={`p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;