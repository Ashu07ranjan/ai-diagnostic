"use client"

import { useState } from "react"
import { ArrowLeft, AlertTriangle, AlertCircle, Share2, Bookmark, Wrench, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export default function ScanResultsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"issues" | "details">("issues")

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <Button variant="ghost" size="icon" className="text-white" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">Scan Results</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-white">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Device Image with Highlighted Areas */}
      <div className="px-4 py-2">
        <div className="relative rounded-lg overflow-hidden border border-slate-700">
          {/* This would be the actual scanned image */}
          <div className="bg-slate-900 aspect-video w-full flex items-center justify-center">
            <div className="w-3/4 h-3/5 bg-slate-800 rounded-md flex items-center justify-center">
              <span className="text-slate-500">Laptop motherboard</span>
            </div>

            {/* Highlighted Problem Areas */}
            <div className="absolute top-[30%] left-[35%] w-8 h-8 rounded-full border-2 border-red-500 animate-pulse">
              <div className="absolute inset-0 bg-red-500 rounded-full opacity-30"></div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Critical
              </div>
            </div>

            <div className="absolute top-[45%] right-[30%] w-6 h-6 rounded-full border-2 border-yellow-500 animate-pulse">
              <div className="absolute inset-0 bg-yellow-500 rounded-full opacity-30"></div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                Warning
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700">
        <button
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "issues" ? "text-teal-400 border-b-2 border-teal-400" : "text-slate-400"
          }`}
          onClick={() => setActiveTab("issues")}
        >
          Issues Found
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium ${
            activeTab === "details" ? "text-teal-400 border-b-2 border-teal-400" : "text-slate-400"
          }`}
          onClick={() => setActiveTab("details")}
        >
          Device Details
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === "issues" ? (
          <div className="space-y-4">
            <ProblemItem
              title="Capacitor Failure"
              description="Bulging capacitor detected near CPU. This can cause system instability and random shutdowns."
              severity="critical"
              location="Motherboard - North Bridge"
            />

            <ProblemItem
              title="Overheating Risk"
              description="Thermal paste degradation detected. This may lead to CPU overheating under heavy load."
              severity="warning"
              location="CPU Heat Sink"
            />

            <ProblemItem
              title="Dust Accumulation"
              description="Significant dust buildup in cooling vents. This restricts airflow and may cause temperature issues."
              severity="moderate"
              location="Cooling System"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Device Information</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>Device Type:</span>
                  <span className="text-white">Laptop</span>
                </div>
                <div className="flex justify-between">
                  <span>Model:</span>
                  <span className="text-white">TechBook Pro X5</span>
                </div>
                <div className="flex justify-between">
                  <span>Age Estimate:</span>
                  <span className="text-white">3-4 years</span>
                </div>
                <div className="flex justify-between">
                  <span>Overall Condition:</span>
                  <span className="text-yellow-400">Fair</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">System Components</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>Motherboard:</span>
                  <Badge variant="outline" className="text-red-400 border-red-400">
                    Critical
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>CPU:</span>
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                    Warning
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Memory:</span>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    Good
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Storage:</span>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    Good
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-3">
        <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-6">
          <Wrench className="h-5 w-5 mr-2" />
          Fix It Yourself
        </Button>
        <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-6">
          <UserRound className="h-5 w-5 mr-2" />
          Find Technician
        </Button>
      </div>
    </main>
  )
}

interface ProblemItemProps {
  title: string
  description: string
  severity: "critical" | "warning" | "moderate"
  location: string
}

function ProblemItem({ title, description, severity, location }: ProblemItemProps) {
  const severityConfig = {
    critical: {
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      badge: <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/20">Critical</Badge>,
    },
    warning: {
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      badge: <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20">Warning</Badge>,
    },
    moderate: {
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      badge: <Badge className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/20">Moderate</Badge>,
    },
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="mt-1">{severityConfig[severity].icon}</div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-medium">{title}</h3>
            {severityConfig[severity].badge}
          </div>
          <p className="text-sm text-slate-300 mb-2">{description}</p>
          <div className="text-xs text-slate-400">
            Location: <span className="text-slate-300">{location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
