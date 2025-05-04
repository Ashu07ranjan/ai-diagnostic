"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Zap, ZapOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ScanDevicePage() {
  const router = useRouter()
  const [isScanning, setIsScanning] = useState(false)
  const [flashOn, setFlashOn] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)

  // Simulate scan progress
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false)
            return 0
          }
          return prev + 5
        })
      }, 100)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isScanning])

  const handleScan = () => {
    setIsScanning(true)
    setScanProgress(0)
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <Button variant="ghost" size="icon" className="text-white" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">Scan Device</h1>
        <Button
          variant="ghost"
          size="icon"
          className={flashOn ? "text-teal-400" : "text-white"}
          onClick={() => setFlashOn(!flashOn)}
        >
          {flashOn ? <Zap className="h-6 w-6" /> : <ZapOff className="h-6 w-6" />}
        </Button>
      </header>

      {/* Camera Preview */}
      <div className="flex-1 flex flex-col p-4">
        <div className="relative flex-1 rounded-xl overflow-hidden border-2 border-slate-700 mb-4">
          {/* Camera Preview (Simulated) */}
          <div className="absolute inset-0 bg-black">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-slate-500 text-center">
                <p>Camera Preview</p>
                <p className="text-xs mt-1">Position your device in the frame</p>
              </div>
            </div>
          </div>

          {/* Scan Frame Guides */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-teal-400"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-teal-400"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-teal-400"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-teal-400"></div>
          </div>

          {/* Scan Animation */}
          {isScanning && (
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute left-0 right-0 h-1 bg-teal-400 opacity-70"
                style={{
                  top: `${scanProgress}%`,
                  boxShadow: "0 0 10px 2px rgba(45, 212, 191, 0.7)",
                }}
              ></div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">Scan Instructions</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="inline-block w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs flex-shrink-0">
                1
              </span>
              <span>Position your device on a flat, well-lit surface</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs flex-shrink-0">
                2
              </span>
              <span>Ensure the faulty component is clearly visible</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs flex-shrink-0">
                3
              </span>
              <span>Hold the camera steady and tap "Scan Now"</span>
            </li>
          </ul>
        </div>

        {/* Scan Button */}
        <Button
          className="bg-teal-500 hover:bg-teal-600 text-white py-6 text-lg font-medium"
          disabled={isScanning}
          onClick={handleScan}
        >
          {isScanning ? `Scanning... ${scanProgress}%` : "Scan Now"}
        </Button>
      </div>
    </main>
  )
}
