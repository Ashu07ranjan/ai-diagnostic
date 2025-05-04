"use client"

import { useState } from "react"
import { ArrowLeft, Send, ImageIcon, Paperclip, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function DescribeIssuePage() {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi there! Please describe the issue you're experiencing with your device.", isUser: false },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { text: message, isUser: true }])

    // Simulate AI response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Thanks for describing your issue. Based on your description, it sounds like you might be experiencing a problem with the device's power management system. Could you tell me if you've noticed any overheating or unusual battery drain?",
          isUser: false,
        },
      ])
    }, 1000)

    setMessage("")
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Describe Issue</h1>
        </div>
        <div className="text-xs text-slate-400">Device Assistant</div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.isUser ? "bg-teal-600 text-white rounded-tr-none" : "bg-slate-700 text-white rounded-tl-none"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex gap-2 items-end">
          <div className="flex-1 bg-slate-700 rounded-lg p-1">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your device issue..."
              className="min-h-[80px] bg-transparent border-none focus-visible:ring-0 text-white resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <div className="flex justify-between items-center px-2 py-1">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                size="icon"
                className="h-8 w-8 rounded-full bg-teal-500 hover:bg-teal-600 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
