import { NextResponse } from "next/server"

// Fallback videos in case the API call fails
const fallbackVideos = [
  {
    title: "How to Replace a Laptop Battery - Step by Step Guide",
    channel: "Tech Repair Guru",
    thumbnail: "/placeholder.svg?height=90&width=160",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    views: "1.2M views",
  },
  {
    title: "DIY Laptop Battery Replacement - Avoid Common Mistakes",
    channel: "Fix It Yourself",
    thumbnail: "/placeholder.svg?height=90&width=160",
    url: "https://www.youtube.com/watch?v=6Ql1JG76EWY",
    views: "845K views",
  },
  {
    title: "Extend Your Laptop Battery Life - Tips and Tricks",
    channel: "Tech Tips Daily",
    thumbnail: "/placeholder.svg?height=90&width=160",
    url: "https://www.youtube.com/watch?v=ZjJUVsmjIj4",
    views: "2.3M views",
  },
]

// Simple API route that always returns fallback videos
export async function GET() {
  return NextResponse.json({ videos: fallbackVideos })
}
