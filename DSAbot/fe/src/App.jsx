import axios from "axios";
import { useState } from "react";

function App() {
  const [ipData, setIpData] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  async function fetchRes() {
    if (ipData.trim()) {
      setIsLoading(true);
      setResponse("");

      try {
        const res = await axios.post("http://localhost:3000/getRes", {
          query: ipData,
        });
        setResponse(res.data.response);
        setIpData("");
      } catch (error) {
        setResponse("⚠️ Error fetching response.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setResponse("📝 Please enter a query.");
    }
  }

  return (
    <div
      className={`w-screen h-screen transition-colors duration-300 ${
        darkMode ? "bg-zinc-900 text-white" : "bg-amber-100 text-gray-800"
      } flex justify-center items-center px-4`}
    >
      <div
        className={`w-full max-w-2xl h-[600px] rounded-2xl border ${
          darkMode
            ? "border-zinc-700 bg-zinc-800"
            : "border-gray-300 bg-amber-50"
        } flex flex-col overflow-hidden shadow-xl transition duration-500 ease-in-out hover:-translate-y-2 hover:scale-100 hover:shadow-2xl`}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center px-4 py-4 font-mono text-xl border-b ${
            darkMode
              ? "bg-zinc-900 text-green-400 border-zinc-700"
              : "bg-white text-blue-600 border-gray-300"
          } shadow-sm`}
        >
          💻 CS Chatbot
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className={`text-sm font-semibold px-3 py-1 rounded-lg transition ${
              darkMode
                ? "bg-zinc-700 text-white hover:bg-zinc-600"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Chat Window */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
              <span className="ml-2 font-semibold text-blue-500">
                Generating response...
              </span>
            </div>
          ) : response ? (
            <div
              className={`whitespace-pre-wrap p-3 rounded-lg border shadow-sm ${
                darkMode
                  ? "bg-zinc-700 text-white border-zinc-600"
                  : "bg-blue-50 text-gray-800 border-blue-200"
              }`}
            >
              {response}
            </div>
          ) : (
            <p
              className={`text-center mt-20 ${
                darkMode ? "text-zinc-400" : "text-gray-400"
              }`}
            >
              Type a CS question below to get started.
            </p>
          )}
        </div>

        {/* Input Area */}
        <div
          className={`p-4 border-t ${
            darkMode
              ? "bg-zinc-800 border-zinc-700"
              : "bg-white border-gray-300"
          }`}
        >
          <div className="flex gap-2">
            <input
              type="text"
              className={`flex-1 px-4 py-2 rounded-lg font-mono border focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-zinc-700 text-white border-zinc-600 focus:ring-green-400"
                  : "bg-white text-gray-800 border-gray-300 focus:ring-blue-400"
              }`}
              placeholder="> e.g. What is a binary search tree?"
              value={ipData}
              onChange={(e) => setIpData(e.target.value)}
            />
            <button
              className={`font-mono font-semibold px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-green-500 hover:bg-green-600 text-black"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              onClick={fetchRes}
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
