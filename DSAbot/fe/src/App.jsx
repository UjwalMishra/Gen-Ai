import React, { useState, useEffect, useRef } from "react";

// --- Enhanced SVG Icons ---

const UserIcon = () => (
  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12ZM12 12C15.1387 12 19.4314 13.5686 20 16.5C19.4314 19.4314 15.1387 21 12 21C8.86132 21 4.56863 19.4314 4 16.5C4.56863 13.5686 8.86132 12 12 12Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const BotIcon = () => (
  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C13.1046 2 14 2.89543 14 4V5C16.2091 5 18 6.79086 18 9V15C18 17.2091 16.2091 19 14 19H10C7.79086 19 6 17.2091 6 15V9C6 6.79086 7.79086 5 10 5V4C10 2.89543 10.8954 2 12 2Z"
        fill="white"
      />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      <path
        d="M9 13H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

const SendIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
      fill="currentColor"
    />
  </svg>
);

const CodeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 18L22 12L16 6M8 6L2 12L8 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- Main App Component ---

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Function to automatically scroll to the latest message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Set the initial greeting message from the bot
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "👋 Hello! I'm your CS-focused AI assistant. I can help you with:\n\n• Data Structures & Algorithms\n• Programming concepts\n• System design\n• Code optimization\n• Interview preparation\n\nWhat would you like to explore today?",
      },
    ]);
  }, []);

  const handleSendMessage = async () => {
    // Prevent sending empty messages or sending while the bot is typing
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { sender: "user", text: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Simulate API call with setTimeout for demo
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const botResponse = `I understand you're asking about "${inputValue}". This is a demo response showing the improved UI. In a real implementation, this would connect to your backend API at http://localhost:3000/getRes.`;
      const botMessage = { sender: "bot", text: botResponse };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = {
        sender: "bot",
        text: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Explain binary trees",
    "Time complexity of merge sort",
    "What are hash tables?",
    "Dynamic programming basics",
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 flex flex-col overflow-hidden">
        {/* Enhanced Header */}
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <CodeIcon />
              <h1 className="text-2xl font-bold">CS Assistant</h1>
            </div>
            <p className="text-blue-100 text-sm">
              Your intelligent companion for Computer Science learning
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        </header>

        {/* Chat Messages */}
        <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-transparent to-slate-50/30">
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 ${
                  msg.sender === "user" ? "justify-end" : ""
                } animate-in slide-in-from-bottom-4 duration-300`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {msg.sender === "bot" && <BotIcon />}
                <div
                  className={`max-w-lg p-4 rounded-2xl shadow-lg ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-md"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </p>
                </div>
                {msg.sender === "user" && <UserIcon />}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-4 animate-in slide-in-from-bottom-4 duration-300">
                <BotIcon />
                <div className="flex items-center gap-2 p-4 bg-white border border-gray-200 rounded-2xl rounded-bl-md shadow-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    Thinking...
                  </span>
                </div>
              </div>
            )}

            {/* Quick Questions (shown only initially) */}
            {messages.length === 1 && !isLoading && (
              <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-500">
                <p className="text-sm text-gray-600 font-medium">
                  💡 Quick questions to get started:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(question)}
                      className="p-3 text-left bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-sm shadow-sm"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>
        </main>

        {/* Enhanced Input Area */}
        <footer className="p-6 bg-white/50 border-t border-gray-200">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-3 text-gray-700 placeholder-gray-500 resize-none focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200 shadow-sm"
                placeholder="Ask about algorithms, data structures, coding concepts..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                rows={1}
                style={{ minHeight: "48px", maxHeight: "120px" }}
              />
            </div>
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:shadow-none transform hover:scale-105 disabled:transform-none"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
            >
              <SendIcon />
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center">
            Press Enter to send • Shift+Enter for new line
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
