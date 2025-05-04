"use client"

import React from "react"
import { CirclePower, History, MessageSquare, ScanLine, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const data = { versions: ["1.0"] } // Provide a default value or fetch data properly
  const [selectedVersion, setSelectedVersion] = React.useState(data?.versions?.[0])

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CirclePower className="h-6 w-6 text-teal-400" />
          <h1 className="text-xl font-bold">TechDiag AI</h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
          <span className="text-sm font-medium">JD</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6">
        {/* Welcome Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Hello, John</h2>
          <p className="text-slate-300">What can I help diagnose today?</p>
        </section>

        {/* Main Actions */}
        <section className="grid grid-cols-2 gap-4 mb-8">
          <ActionCard
            icon={<ScanLine className="h-6 w-6" />}
            title="Scan Device"
            description="Analyze hardware issues"
            color="bg-gradient-to-br from-teal-500 to-teal-700"
          />
          <ActionCard
            icon={<MessageSquare className="h-6 w-6" />}
            title="Describe Issue"
            description="Tell us what's wrong"
            color="bg-gradient-to-br from-cyan-500 to-cyan-700"
          />
          <ActionCard
            icon={<Wrench className="h-6 w-6" />}
            title="Repair Guide"
            description="Step-by-step fixes"
            color="bg-gradient-to-br from-blue-500 to-blue-700"
          />
          <ActionCard
            icon={<History className="h-6 w-6" />}
            title="History"
            description="Past diagnostics"
            color="bg-gradient-to-br from-indigo-500 to-indigo-700"
          />
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <Button variant="link" className="text-teal-400 p-0">
              View All
            </Button>
          </div>

          <div className="space-y-3">
            <RecentItem title="Laptop Battery Issue" time="2 days ago" status="Resolved" />
            <RecentItem title="Router Connection Problem" time="1 week ago" status="In Progress" />
            <RecentItem title="Smartphone Screen Flickering" time="2 weeks ago" status="Resolved" />
          </div>
        </section>
      </div>

      {/* Chatbot Interface */}
      <div className="bg-slate-950 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
            <CirclePower className="h-4 w-4 text-white" />
          </div>
          <p className="text-sm text-white font-medium">TechDiag Assistant</p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask about your device issues..."
            className="flex-1 bg-slate-800 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <Button size="icon" className="rounded-full bg-teal-500 hover:bg-teal-600">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  )
}

function ActionCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) {
  const router = useRouter()

  const handleClick = () => {
    // Navigate to the appropriate page based on the title
    if (title === "Scan Device") {
      router.push("/scan-device")
    } else if (title === "Describe Issue") {
      router.push("/describe-issue")
    } else if (title === "Repair Guide") {
      router.push("/repair-guide")
    } else if (title === "History") {
      router.push("/history")
    }
  }

  return (
    <Card
      className={`${color} border-none shadow-lg p-4 flex flex-col items-center text-center cursor-pointer hover:opacity-90 transition-opacity`}
      onClick={handleClick}
    >
      <div className="bg-white/20 p-3 rounded-full mb-3">{icon}</div>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-xs text-white/80">{description}</p>
    </Card>
  )
}

function RecentItem({
  title,
  time,
  status,
}: {
  title: string
  time: string
  status: "Resolved" | "In Progress"
}) {
  return (
    <div className="bg-slate-800/50 p-3 rounded-lg flex justify-between items-center">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-xs text-slate-400">{time}</p>
      </div>
      <span
        className={`text-xs px-2 py-1 rounded-full ${
          status === "Resolved" ? "bg-green-900/30 text-green-400" : "bg-amber-900/30 text-amber-400"
        }`}
      >
        {status}
      </span>
    </div>
  )
}
