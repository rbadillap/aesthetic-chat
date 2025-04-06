"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Send, Loader2, Menu, Paperclip, Smile, Mic, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/ui/sidebar"

// Sample prompts for users to try
const samplePrompts = [
  "Explain the concept of neo-minimalism in design",
  "Write a short poem about digital aesthetics",
  "Compare monochromatic and duotone color schemes",
  "Suggest ways to declutter my digital workspace",
]

export default function ChatPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat()
  const { toggleSidebar } = useSidebar()

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-resize textarea
  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget
    target.style.height = "auto"
    target.style.height = `${Math.min(target.scrollHeight, 200)}px`
  }

  // Handle form submission
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() === "") return
    handleSubmit(e)
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
    }
  }

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const form = e.currentTarget.form
      if (form) form.dispatchEvent(new Event("submit", { cancelable: true }))
    }
  }

  // Handle sample prompt selection
  const handlePromptSelect = (prompt: string) => {
    setInput(prompt)
    if (inputRef.current) {
      inputRef.current.focus()
      // Trigger auto-resize
      const event = new Event("input", { bubbles: true })
      inputRef.current.dispatchEvent(event)
    }
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen w-full">
      {/* Header */}
      <header className="w-full border-b border-white/5 py-3 px-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-gray-400 hover:text-white">
            <Menu className="h-4.5 w-4.5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
          <h1 className="text-[1.375rem] font-medium tracking-tight text-gradient">aesthetic.chat</h1>
        </div>
      </header>

      {/* Chat container */}
      <div className="w-full h-full overflow-y-auto px-5 py-5">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center w-full">
            <div className="w-full max-w-[500px] text-center relative px-4">
              {/* Background pattern */}
              <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] opacity-15 -z-10">
                {Array.from({ length: 400 }).map((_, i) => (
                  <div
                    suppressHydrationWarning
                    key={i}
                    className={cn("w-full h-full", Math.random() > 0.93 ? "bg-white/20" : "bg-transparent")}
                  />
                ))}
              </div>

              {/* Website name */}
              <h2 className="text-6xl font-medium leading-tight tracking-tight pb-1 mb-8 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                aesthetic.chat
              </h2>

              {/* Prompt samples */}
              <div className="flex flex-col gap-3">
                <p className="text-[0.9375rem] text-gray-400 mb-4">Try asking about:</p>
                <div className="grid gap-3">
                  {samplePrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handlePromptSelect(prompt)}
                      className="w-full text-left p-3 border border-white/5 hover:border-white/10 bg-black hover:bg-white/5 rounded-md transition-colors flex items-center justify-between group"
                    >
                      <span className="text-[0.9375rem] text-gray-300">{prompt}</span>
                      <ArrowRight className="h-[0.875rem] w-[0.875rem] text-gray-500 group-hover:text-white transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[800px] mx-auto flex flex-col gap-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex animate-fade-in", message.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] p-4 rounded-md border bg-black text-[1.0625rem] leading-relaxed tracking-tight",
                    message.role === "user" ? "border-white/5" : "border-white/5",
                  )}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="w-full border-t border-white/5 p-3">
        <div className="w-full max-w-xl mx-auto">
          <form onSubmit={onSubmit} className="relative w-full">
            <div className="relative overflow-hidden rounded-md border border-white/5 bg-black transition-colors hover:border-white/10 focus-within:border-white/10 w-full">
              {/* Action buttons row */}
              <div className="flex items-center px-3 py-2 border-b border-white/5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-md text-gray-400 hover:text-white hover:bg-transparent"
                >
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-md text-gray-400 hover:text-white hover:bg-transparent"
                >
                  <Smile className="h-4 w-4" />
                  <span className="sr-only">Add emoji</span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-md text-gray-400 hover:text-white hover:bg-transparent"
                >
                  <Mic className="h-4 w-4" />
                  <span className="sr-only">Voice input</span>
                </Button>
              </div>

              {/* Textarea and send button */}
              <div className="flex items-end w-full">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  onInput={handleTextareaInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Message aesthetic.chat..."
                  rows={1}
                  className="flex-1 resize-none bg-transparent px-3 py-3 border-0 focus:outline-none focus:ring-0 placeholder:text-gray-500 min-h-[48px] max-h-[200px] text-sm leading-relaxed tracking-tight scrollbar-hidden"
                />

                <div className="pr-3 pb-2 flex-shrink-0">
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || input.trim() === ""}
                    className={cn(
                      "h-8 w-8 rounded-md bg-transparent border transition-all",
                      input.trim() === ""
                        ? "border-white/5 text-gray-500"
                        : "border-white/10 text-white hover:border-white/15 hover:bg-transparent",
                    )}
                  >
                    {isLoading ? <Loader2 className="h-4.5 w-4.5 animate-spin" /> : <Send className="h-4.5 w-4.5" />}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

