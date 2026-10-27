/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import api from "@/api/api";
import { Sparkles } from "lucide-react";
import {
  FiX,
  FiSend,
  FiRotateCcw,
  FiMessageSquare,
  FiLayers,
} from "react-icons/fi";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

type ProductSimple = {
  id: string | number;
  _id?: string;
  title: string;
  category?: string;
  price: number;
  thumbnail?: string;
};

export default function AIAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "compare">("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "مرحباً بك! أنا **ShopBog AI** — مساعد التسوق ومقارنة المنتجات الذكي. ✨\n\nيمكنني مساعدتك في:\n- ⚖️ **مقارنة أي منتجين** من المتجر بالتفصيل (المواصفات، السعر، والقيمة).\n- 💡 **ترشيح أفضل المنتجات** حسب ميزانيتك واحتياجاتك.\n- 🌐 الإجابة باللغتين **العربية** و **الإنجليزية**.\n\nHello! I can compare products, recommend best deals, and answer any shopping questions in English or Arabic. How can I help you today?",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Compare mode states
  const [catalog, setCatalog] = useState<ProductSimple[]>([]);
  const [productA, setProductA] = useState<string>("");
  const [productB, setProductB] = useState<string>("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Listen to open-ai-chat event from product page
  useEffect(() => {
    const handler = (e: any) => {
      const prod = e.detail?.product;
      setIsOpen(true);
      if (prod) {
        const prodId = String(prod.id || prod._id);
        setProductA(prodId);
        setActiveTab("compare");
      }
    };
    window.addEventListener("open-ai-chat", handler);
    return () => window.removeEventListener("open-ai-chat", handler);
  }, []);

  // Load products for compare dropdown
  useEffect(() => {
    async function loadCatalog() {
      try {
        const res = await api.get("/products", { params: { limit: 50 } });
        if (res.data?.products) {
          setCatalog(res.data.products);
        }
      } catch (err) {
        console.error("Failed to load products for AI modal:", err);
      }
    }
    if (isOpen && catalog.length === 0) {
      loadCatalog();
    }
  }, [isOpen, catalog.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!customPrompt) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          type: "chat",
        }),
      });

      const data = await res.json();
      const replyContent =
        data.content ||
        data.error ||
        "عذراً، لم أتمكن من معالجة الطلب حالياً. يرجى المحاولة مرة أخرى.";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: replyContent,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (err) {
      console.error("AI chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "عذراً، حدث خطأ في الاتصال بالخدمة الذكية. يرجى التحقق من الاتصال والمحاولة لاحقاً.",
          timestamp: "Error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRunComparison = async () => {
    if (!productA || !productB) return;
    const prodAObj = catalog.find((p) => String(p.id || p._id) === productA);
    const prodBObj = catalog.find((p) => String(p.id || p._id) === productB);

    if (!prodAObj || !prodBObj) return;

    setActiveTab("chat");

    const promptText = `قارن بالتفصيل بين هذين المنتجين:\n1. ${prodAObj.title} (سعر: $${prodAObj.price}، تصنيف: ${prodAObj.category})\n2. ${prodBObj.title} (سعر: $${prodBObj.price}، تصنيف: ${prodBObj.category})\n\nقدم مقارنة ذكية تشمل: المواصفات، القيمة مقابل السعر، لمن يناسب كل منتج، ورأيك النهائي، باللغتين العربية أو الإنجليزية.`;

    await handleSend(promptText);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content:
          "تم بدء محادثة جديدة! يمكنك سؤالي عن ترشيحات المنتجات أو اختيار منتجين للمقارنة. ✨",
        timestamp: "Just now",
      },
    ]);
  };

  const quickChips = [
    "قارن بين منتجات الجمال والعطور 🌸",
    "What are the best value products? 💰",
    "رشح لي أفضل منتج للأثاث أو المنزل 🛋️",
    "Compare price vs quality in store ⚡",
  ];

  return (
    <>
      {/* ================= FLOATING TRIGGER BUTTON ================= */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full border border-blue-400/40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(79,70,229,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(79,70,229,0.6)] focus:outline-none"
        aria-label="Open AI Assistant"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-yellow-300 animate-pulse">
          <Sparkles size={14} />
        </div>
        <span>AI Assistant</span>
        <span className="hidden rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold sm:inline-block">
          مقارنة ذكية
        </span>
      </button>

      {/* ================= MODAL / DRAWER ================= */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end sm:p-6 p-2">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative flex h-[90vh] max-h-[720px] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-zinc-700/80 bg-[#191919] text-white shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-[#212121] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-base font-bold text-white">
                    ShopBog AI Assistant
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      Online
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Bilingual Product Comparison &bull; مقارنة ذكية
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearChat}
                  title="Clear chat"
                  className="rounded-xl border border-zinc-700/80 p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <FiRotateCcw size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="rounded-xl border border-zinc-700/80 p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                >
                  <FiX size={17} />
                </button>
              </div>
            </div>

            {/* Navigation Tabs (Chat vs Compare) */}
            <div className="flex border-b border-zinc-800 bg-[#1e1e1e] p-1.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab("chat")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 transition ${
                  activeTab === "chat"
                    ? "bg-blue-600 text-white shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <FiMessageSquare size={14} /> Smart Chat / محادثة
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("compare")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 transition ${
                  activeTab === "compare"
                    ? "bg-blue-600 text-white shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <FiLayers size={14} /> Compare Products / مقارنة
              </button>
            </div>

            {/* ================= TAB 1: COMPARE SELECTOR ================= */}
            {activeTab === "compare" && (
              <div className="border-b border-zinc-800 bg-[#222222] p-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                  Select 2 Products to Compare / اختر منتجين للمقارنة
                </h4>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[11px] text-zinc-400">
                      Product A / المنتج الأول
                    </label>
                    <select
                      value={productA}
                      onChange={(e) => setProductA(e.target.value)}
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-2.5 text-xs text-white outline-none focus:border-blue-500"
                    >
                      <option value="">-- Choose First Product --</option>
                      {catalog.map((p) => (
                        <option
                          key={String(p.id || p._id)}
                          value={String(p.id || p._id)}
                        >
                          {p.title} (${p.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] text-zinc-400">
                      Product B / المنتج الثاني
                    </label>
                    <select
                      value={productB}
                      onChange={(e) => setProductB(e.target.value)}
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-2.5 text-xs text-white outline-none focus:border-blue-500"
                    >
                      <option value="">-- Choose Second Product --</option>
                      {catalog.map((p) => (
                        <option
                          key={String(p.id || p._id)}
                          value={String(p.id || p._id)}
                        >
                          {p.title} (${p.price})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!productA || !productB || loading}
                  onClick={handleRunComparison}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-xs font-bold text-white shadow-lg transition hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50"
                >
                  <Sparkles size={14} /> Generate AI Comparison / مقارنة
                  بالذكاء الاصطناعي
                </button>
              </div>
            )}

            {/* ================= CHAT MESSAGES BODY ================= */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm scrollbar-thin">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-4 shadow ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "border border-zinc-800 bg-[#242424] text-zinc-200 rounded-bl-none leading-relaxed"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm break-words">
                      {m.content}
                    </div>
                    <div
                      className={`mt-2 text-[10px] ${
                        m.role === "user" ? "text-blue-200" : "text-zinc-500"
                      }`}
                    >
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-[#242424] p-4 text-xs text-zinc-400">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                    <span>
                      ShopBog AI is analyzing products... / جاري التحليل
                      والمقارنة...
                    </span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts Chips */}
            <div className="border-t border-zinc-800/80 bg-[#1c1c1c] px-4 py-2">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {quickChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(chip)}
                    className="shrink-0 rounded-full border border-zinc-700/80 bg-zinc-800/80 px-3 py-1 text-[11px] text-zinc-300 transition hover:border-blue-500 hover:text-white"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="border-t border-zinc-800 bg-[#212121] p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask in Arabic or English... (e.g. قارن بين المنتجات)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                  className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-xs sm:text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 disabled:opacity-50"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md transition hover:bg-blue-500 disabled:opacity-50"
                >
                  <FiSend size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
