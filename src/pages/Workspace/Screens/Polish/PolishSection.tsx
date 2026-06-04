import { useState, useRef, useEffect } from "react";
import { Copy, Sparkles, Bot, User, ChevronDown, Trash2 } from "lucide-react";
import { getAllFrameworks } from "../Frameworks/services/frameworks.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { polishText } from "./services/polish.services";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Message {
  role: "user" | "ai";
  text: string;
}

// const recentActivity = [
//   { title: "Q3 Marketing Update", time: "2 mins ago" },
//   { title: "Client Proposal", time: "1 hour ago" },
//   { title: "Team Sync Notes", time: "3 hours ago" },
//   { title: "Product Roadmap", time: "Yesterday" },
// ];

export default function PolishSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultFrameworkId =  location.state?.frameworkId || '';
  const queryClient = useQueryClient();
  const [inputText, setInputText] = useState("");
  const [selectedFrameworkId, setSelectedFrameworkId] = useState<string>(defaultFrameworkId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isPolishing, setIsPolishing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  // Fetch frameworks
  const { data: frameworksData } = useQuery({
    queryKey: ['frameworks'],
    queryFn: getAllFrameworks,
    staleTime: 5 * 60 * 1000,
  });
 console.log("frameworksData", frameworksData);
  const frameworks = frameworksData?.items || [];


  // Auto-select first framework when data loads
  useEffect(() => {
    if (frameworks.length > 0 && !selectedFrameworkId) {
      setSelectedFrameworkId(frameworks[0].id);
    }
  }, [frameworks, selectedFrameworkId]);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Polish Mutation
  const polishMutation = useMutation({
    mutationFn: polishText,
    onSuccess: (response) => {
      const polishedText = response.data.polishedText;

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: polishedText,
        },
      ]);
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
     
    },
    onError: (error: any) => {
      let errorMessage = "Sorry, something went wrong while polishing your text. Please try again.";
      if (error?.response?.status === 403) {
      errorMessage = "❌ No credits remaining.\n\nPlease upgrade your plan or purchase more credits to continue polishing.";
    }
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: errorMessage,
        },
      ]);
      toast.error("Sorry, something went wrong while polishing your text. Please try again.");
    },
  });

  const handlePolish = () => {
    if (!inputText.trim() || !selectedFrameworkId) return;

    setIsPolishing(true);

    polishMutation.mutate({
      text: inputText,
      frameworkId: selectedFrameworkId,
    });

    // Reset polishing state after mutation (onSuccess/onError will handle UI)
    setIsPolishing(false);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setChatInput("");

    // TODO: Connect real AI chat if needed
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: `Got it! How would you like me to refine this further?` },
      ]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChatSend();
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const selectedFramework = frameworks.find((f) => f.id === selectedFrameworkId);
console.log("frameworks", frameworks);
  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* Left Panel - Input */}
      <div className="flex flex-col w-full lg:w-[55%] lg:border-r border-[#2a2a2e] bg-[#111110] overflow-y-auto">
        <div className="p-5 lg:p-7 flex flex-col gap-5 min-h-full">
          {/* Textarea */}
          <div className="relative flex flex-col rounded-xl border border-[#2a2a2e] bg-[#161618] shadow-inner overflow-hidden flex-1 min-h-[300px]">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type your content here..."
              className="flex-1 w-full resize-none bg-transparent text-[15px] text-[#d4d4d8] placeholder-[#3d3d4a] leading-relaxed px-5 pt-5 pb-3 outline-none"
            />
            <div className="flex items-center gap-4 px-5 py-3 border-t border-[#222226] text-sm">
              <span className="text-[11px] text-[#4a4a5a] font-medium">{charCount} characters</span>
              <span className="text-[#2e2e3a]">·</span>
              <span className="text-[11px] text-[#4a4a5a] font-medium">{wordCount} words</span>
              {charCount > 0 && (
                <button
                  onClick={() => setInputText("")}
                  className="ml-auto flex items-center gap-1 text-[11px] text-[#4a4a5a] hover:text-red-400 transition-colors"
                >
                  <Trash2 size={14} />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Framework Selector */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold tracking-[1.2px] text-[#5c5c6e] uppercase">FRAMEWORK</p>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-[#161618] border border-[#2a2a2e] text-[14px] text-[#c4c4ce] hover:border-[#3a3a4a]"
              >
                <span className="truncate">
                  {selectedFramework ? selectedFramework.name : "Select a framework..."}
                </span>
                <ChevronDown size={18} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full mt-1 w-full z-30 rounded-xl border border-[#2a2a2e] bg-[#1a1a1e] shadow-2xl overflow-hidden py-1">
                  {
                  

          frameworks.length > 0 ?        frameworks.map((fw) => (
                    <button
                      key={fw.id}
                      onClick={() => {
                        setSelectedFrameworkId(fw.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-[13px] hover:bg-[#252538] transition-colors ${
                        fw.id === selectedFrameworkId ? "bg-[#252538] text-white" : "text-[#9090a0]"
                      }`}
                    >
                      {fw.name}
                    </button>
                  ))
                  
                  :
                  <div className="w-full text-left px-4 py-3 text-[14px] text-[#9090a0]">
                      No frameworks found. <span  onClick={()=> navigate("/workspace/frameworks")} className="text-white text-[14px] cursor-pointer hover:underline">Click here to add one</span>
                    </div>
                  }
                </div>
              )}
            </div>
          </div>

          {/* Polish Button */}
          <button
            onClick={handlePolish}
            disabled={isPolishing || !inputText.trim() || !selectedFrameworkId || polishMutation.isPending}
            className={`relative flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl text-[14px] font-semibold tracking-wide text-white transition-all hover:cursor-pointer ${
              !inputText.trim() || !selectedFrameworkId
                ? "opacity-70 cursor-not-allowed bg-gradient-to-r from-[#0a6b60] to-[#0d8a7c]"
                : "bg-gradient-to-r from-[#0a6b60] to-[#0d8a7c] hover:brightness-110 shadow-lg shadow-[#0a6b60]/30"
            }`}
          >
            {polishMutation.isPending || isPolishing ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Polishing...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>POLISH IT</span>
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-[#3d3d4a]">This action will use 1 credit</p>

          {/* Recent Activity */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold tracking-[1.2px] text-[#5c5c6e] uppercase">RECENT ACTIVITY</p>
              <button className="text-[12px] text-[#5c5c8a] hover:text-[#8b87f0]">View all</button>
            </div>
            <div className="flex justify-center-safe gap-3 overflow-x-auto pb-2 scrollbar-none">
              {/* {recentActivity.map((item, i) => (
                <div
                  key={i}
                  className="shrink-0 w-[170px] p-3.5 rounded-xl bg-[#161618] border border-[#222226] hover:border-[#2e2e3a] cursor-pointer transition-colors"
                >
                  <p className="text-[12px] font-semibold text-[#c4c4ce] truncate">{item.title}</p>
                  <p className="text-[11px] text-[#3d3d4a] mt-1">{item.time}</p>
                </div>
              ))} */}
              <p className="text-on-surface-variant text-[14px] align-middle">Coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Output & Chat */}
      <div className="flex flex-col flex-1 bg-[#0e0e0f] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2e]">
          <p className="text-[10px] font-bold tracking-[1.2px] text-[#5c5c6e] uppercase">POLISHED OUTPUT &amp; AI CHAT</p>
          <Sparkles size={18} className="text-[#4a4a5a]" />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-2xl bg-[#1a1a1e] flex items-center justify-center mb-6">
                <Sparkles size={48} strokeWidth={1} className="text-[#2e2e3a]" />
              </div>
              <p className="text-[17px] font-semibold text-[#3a3a4a]">Ready to shine</p>
              <p className="text-[13px] text-[#2e2e3a] mt-2 max-w-[260px]">
                Polish your text and start chatting with AI
              </p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "ai" ? (
                  <div className="max-w-[88%] group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4a3fc8] to-[#2e2899] flex items-center justify-center">
                        <Bot size={14} />
                      </div>
                      <span className="text-[10px] text-[#3d3d4a] font-medium tracking-widest uppercase">POLISH AI</span>
                    </div>
                    <div className="relative rounded-2xl rounded-tl-sm bg-[#161618] border border-[#222226] px-5 py-4">
                      <p className="text-[13.5px] text-[#c4c4ce] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <button
                        onClick={() => handleCopy(msg.text)}
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-[#222226] rounded-lg text-[#4a4a5a] hover:text-[#8b87f0]"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-[#252538] px-5 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User size={16} className="text-[#6b6b7e]" />
                      <span className="text-[10px] text-[#6b6b7e]">You</span>
                    </div>
                    <p className="text-[13.5px] text-[#c4c4ce] leading-relaxed">{msg.text}</p>
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* Chat Input */}
        {/* <div className="p-6 pt-2 border-t border-[#2a2a2e]">
          <div className="relative">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask AI to refine tone, expand, shorten..."
              className="w-full pr-14 pl-5 py-3.5 rounded-2xl bg-[#161618] border border-[#2a2a2e] text-[13.5px] placeholder-[#3d3d4a] focus:border-[#3a3a5a] outline-none"
            />
            <button
              onClick={handleChatSend}
              disabled={!chatInput.trim()}
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                chatInput.trim()
                  ? "bg-[#2e2a85] hover:bg-[#3a35a0] text-white"
                  : "bg-[#1a1a1e] text-[#4a4a5a]"
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}