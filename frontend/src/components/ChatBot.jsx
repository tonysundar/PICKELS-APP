import { useState } from "react";
import { getGeminiResponse } from "../utils/geminiApi";
import { assets } from "../assets/assets";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const botResponse = await getGeminiResponse(input);

    setIsLoading(false);
    const botMessage = { text: botResponse, sender: "bot" };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <div
        className="fixed bottom-5 right-5  border-green-500 border-4 bg-yellow-300 p-4 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* New Chat Icon */}
        <img src={assets.chaticon2} alt="Chat" className="w-10 h-10 " />
      </div>

      {/* Chatbot Popup */}
      {isOpen && (
        <div className="fixed bottom-16 right-5 w-80 bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl border border-white-500 transition-all transform animate-slideUp">
          {/* Chat Header */}
          <div className="bg-yellow-700 text-white p-3 rounded-t-2xl flex justify-between items-center shadow-md">
            <span className="font-semibold text-lg">Pickle Chat</span>
            <button onClick={() => setIsOpen(false)} className="text-xl font-bold">
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-3 h-72 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-3 rounded-lg text-sm max-w-xs shadow-md ${msg.sender === "user" ? "bg-green-600 text-white" : "bg-green-200 text-black"}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading Animation */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-lg text-sm max-w-xs shadow-md bg-green-200 text-black animate-pulse">
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Input Field */}
          <div className="flex p-3 border-t bg-green-100 rounded-b-2xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our pickles..."
              className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button onClick={handleSubmit} className="ml-2 bg-yellow-700 text-white px-4 py-2 rounded-full hover:bg-yellow-800 transition-all">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
