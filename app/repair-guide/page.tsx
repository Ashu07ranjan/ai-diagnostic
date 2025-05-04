"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Youtube,
  ExternalLink,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import type { Issue, RepairStep, Video } from "../types/repair"

const fallbackVideos: Video[] = [
  {
    title: "How to Replace a Laptop Battery - Step by Step Guide",
    channel: "Tech Repair Guru",
    thumbnail: "https://img.youtube.com/vi/HOm8iCMDx_s/hqdefault.jpg",
    url: "https://yHOm8iCMDx_soutu.be/",
    views: "1.2M views",
  },
  {
    title: "DIY Laptop Battery Replacement Guide: Effective Genuine Battery Replacement",
    channel: "NVH Battery",
    thumbnail: "https://img.youtube.com/vi/EtFiR1H37xc/maxresdefault.jpg",
    url: "https://youtu.be/EtFiR1H37xc?si=FK-lQiMR1mwRtM_E",
    views: "845K views",
  },
  {
    title: "Tips to Keep Your Laptop Battery Healthy",
    channel: "DO IT / mostafa ahmed",
    thumbnail: "https://img.youtube.com/vi/rK14rCc8qkk/hqdefault.jpg",
    url: "https://youtu.be/rK14rCc8qkk?si=d6Qy7rndjpz6MLRu",
    views: "2.3M views",
  },
]

const issueVideos: Record<string, Video[]> = {
  "laptop-battery": fallbackVideos,
  "smartphone-screen": [
    {
      title: "How to Replace a Smartphone Screen - DIY Guide",
      channel: "Adam Savage's Tested",
      thumbnail: "https://img.youtube.com/vi/6kNNGNAQtZA/hqdefault.jpg",
      url: "https://youtu.be/6kNNGNAQtZA?si=bjshQGFQI16mdpp9",
      views: "3.4M views",
    },
    {
      title: "Fix Cracked Phone Screen at Home - Step by Step",
      channel: "RAC Tracks",
      thumbnail: "https://img.youtube.com/vi/E9Res-iLjio/hqdefault.jpg",
      url: "https://youtu.be/E9Res-iLjio",
      views: "1.7M views",
    },
    {
      title: "Smartphone Screen Replacement - Common Mistakes to Avoid",
      channel: "FIX DIY",
      thumbnail: "https://img.youtube.com/vi/WskdgAVZ-_o/hqdefault.jpg",
      url: "https://youtu.be/WskdgAVZ-_o",
      views: "892K views",
    },
  ],
  "router-reset": [
    {
      title: "How to Fix Router Connection Issues - Complete Guide",
      channel: "ALsRig",
      thumbnail: "https://img.youtube.com/vi/FxYOkgVJPFs/hqdefault.jpg",
      url: " https://youtu.be/FxYOkgVJPFs",
      views: "1.5M views",
    },
    {
      title: "How To Fix WiFi Connected But No Internet Access",
      channel: "EasyTechs",
      thumbnail: "https://img.youtube.com/vi/Ks850riFImQ/hqdefault.jpg",
      url: "https://youtu.be/Ks850riFImQ?si=m38J7acPwdegGyU4",
      views: "2.9M views",
    },
    {
      title: "Reset Your Router Properly - Step by Step Guide",
      channel: "WIFI Remon",
      thumbnail: "https://img.youtube.com/vi/XprtWSiKE8c/0.jpg",
      url: "https://youtube.com/shorts/XprtWSiKE8c?si=dUtcdADImBxYfzO8",
      views: "1.1M views",
    },
  ],
  "pc-overheating": [
    {
      title: "Fix PC Overheating Issues - Complete Guide",
      channel: "PC Builder Pro",
      thumbnail: "https://img.youtube.com/vi/oDFppqQE6AA/hqdefault.jpg",
      url: "https://youtu.be/oDFppqQE6AA?si=odp6IO2EjEV0hIBw",
      views: "2.7M views",
    },
    {
      title: "How To Clean Your Computer From Dust Without Compressed Air",
      channel: "HealMyTech",
      thumbnail: "https://img.youtube.com/vi/HBDUeu0oGik/hqdefault.jpg",
      url: "https://youtu.be/HBDUeu0oGik?si=4oYVXjWWVCUrxbkq",
      views: "3.1M views",
    },
    {
      title: "Replace Thermal Paste on CPU - Stop Overheating",
      channel: "DIY PC Repairs",
      thumbnail: "https://img.youtube.com/vi/FwpHbNS4suQ/hqdefault.jpg",
      url: "https://youtu.be/FwpHbNS4suQ?si=vVNySRjMvsSQwMm9",
      views: "1.8M views",
    },
  ],
}

const issues: Issue[] = [
  { id: "laptop-battery", name: "Laptop Battery Replacement" },
  { id: "smartphone-screen", name: "Smartphone Screen Repair" },
  { id: "router-reset", name: "Router Connection Issues" },
  { id: "pc-overheating", name: "PC Overheating Problems" },
]

const repairSteps: RepairStep[] = [
  {
    title: "Prepare Your Workspace",
    description:
      "Clear a flat, well-lit surface. Gather necessary tools: small Phillips screwdriver, plastic pry tool, and anti-static wrist strap.",
    completed: false,
  },
  {
    title: "Power Down and Disconnect",
    description:
      "Shut down your laptop completely. Unplug the power adapter and remove all external devices. Flip the laptop over.",
    completed: false,
  },
  {
    title: "Remove the Battery",
    description:
      "Locate the battery compartment on the bottom of your laptop. Remove the screws securing the battery cover. Carefully lift the cover and disconnect the battery connector from the motherboard.",
    completed: false,
  },
  {
    title: "Install New Battery",
    description:
      "Connect the new battery to the motherboard connector. Make sure it's firmly seated. Place the battery in the compartment and replace the cover.",
    completed: false,
  },
  {
    title: "Test Your Laptop",
    description:
      "Replace all screws and reconnect the power adapter. Power on your laptop to verify the new battery is working properly.",
    completed: false,
  },
]

export default function RepairGuidePage() {
  const router = useRouter()
  const [selectedIssue, setSelectedIssue] = useState<string>("laptop-battery")
  const [expandedStep, setExpandedStep] = useState<number>(0)
  const [videoSuggestions, setVideoSuggestions] = useState<Video[]>(fallbackVideos)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? -1 : index)
  }

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      const videos = issueVideos[selectedIssue] || fallbackVideos
      setVideoSuggestions(videos)
      setIsLoading(false)
    }

    loadVideos()
  }, [selectedIssue])

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Repair Guide</h1>
        </div>
        <div className="text-xs text-slate-400">Step-by-Step Fixes</div>
      </header>

      {/* Search */}
      <div className="p-4 border-b border-slate-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search for repair guides..."
            className="pl-10 bg-slate-800 border-slate-700 text-white"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Issue Selection */}
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold mb-3">Select Your Issue</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {issues.map((issue) => (
              <Button
                key={issue.id}
                variant="outline"
                className={`w-full justify-start border-slate-700 ${selectedIssue === issue.id ? "bg-slate-700 border-teal-500" : "bg-transparent"}`}
                onClick={() => setSelectedIssue(issue.id)}
              >
                {issue.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Repair Steps */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-3">Step-by-Step Guide</h2>
          <div className="space-y-3 mb-6">
            {repairSteps.map((step, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700">
                <button
                  className="w-full flex items-center justify-between p-3 text-left"
                  onClick={() => toggleStep(index)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${step.completed ? "bg-green-500/20 text-green-400" : "bg-slate-700 text-slate-300"}`}
                    >
                      {step.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <span className="font-medium">{step.title}</span>
                  </div>
                  {expandedStep === index ? (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  )}
                </button>
                {expandedStep === index && (
                  <div className="p-3 pt-0 border-t border-slate-700">
                    <p className="text-sm text-slate-300 mb-3">{step.description}</p>
                    <Button variant="outline" size="sm" className="text-xs border-slate-600">
                      Mark as Completed
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Video Suggestions */}
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Youtube className="h-5 w-5 text-red-500" />
            Recommended Videos
          </h2>
          <div className="space-y-3">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
              </div>
            ) : (
              videoSuggestions.map((video, index) => (
                <div key={index} className="flex gap-3 bg-slate-800/50 p-3 rounded-lg">
                  <div className="w-[160px] h-[90px] bg-slate-700 rounded flex-shrink-0 overflow-hidden flex items-center justify-center">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=90&width=160"
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1">{video.title}</h3>
                    <p className="text-xs text-slate-400 mb-2">
                      {video.channel} • {video.views}
                    </p>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-teal-400 font-medium"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
