"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Camera, StopCircle } from "lucide-react"

interface QRScannerProps {
  onScan: (data: string) => void
}

export default function QRScanner({ onScan }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasCamera, setHasCamera] = useState(true)
  const [permissionDenied, setPermissionDenied] = useState(false)

  // Check if we're in a browser environment with camera access
  useEffect(() => {
    setHasCamera("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices)
  }, [])

  // Start QR scanning
  const startScanning = async () => {
    if (!hasCamera || !videoRef.current || !canvasRef.current) return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      videoRef.current.srcObject = stream
      setIsScanning(true)
      setPermissionDenied(false)

      // Start processing frames to detect QR codes
      requestAnimationFrame(processFrame)
    } catch (error) {
      console.error("Error accessing camera:", error)
      setPermissionDenied(true)
    }
  }

  // Stop QR scanning
  const stopScanning = () => {
    if (!videoRef.current) return

    const stream = videoRef.current.srcObject as MediaStream
    if (stream) {
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }

    setIsScanning(false)
  }

  // Process video frames to detect QR codes
  const processFrame = () => {
    if (!isScanning || !videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Here you would normally use a QR code detection library
      // For this example, we'll simulate finding a QR code after 3 seconds

      // In a real implementation, you would use a library like jsQR:
      // const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      // const code = jsQR(imageData.data, imageData.width, imageData.height)
      // if (code) {
      //   stopScanning()
      //   onScan(code.data)
      //   return
      // }
    }

    // Continue processing frames
    requestAnimationFrame(processFrame)
  }

  // Simulate QR detection for demo purposes
  // In a real app, you would use a proper QR code library
  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isScanning) {
      // Simulate finding a QR code after 3 seconds
      timeout = setTimeout(() => {
        stopScanning()
        onScan("BATCH_" + Math.floor(Math.random() * 1000000).toString())
      }, 3000)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [isScanning, onScan])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopScanning()
    }
  }, [])

  if (!hasCamera) {
    return (
      <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p>Camera access is not available in your browser or device.</p>
        <p className="mt-2 text-sm text-gray-600">
          Please try using a different device or browser, or enter the batch ID manually.
        </p>
      </div>
    )
  }

  if (permissionDenied) {
    return (
      <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p>Camera access was denied.</p>
        <p className="mt-2 text-sm text-gray-600">
          Please allow camera access to scan QR codes, or enter the batch ID manually.
        </p>
        <Button onClick={startScanning} className="mt-4 bg-[#d4a017] hover:bg-[#c29016]">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-square max-w-xs mx-auto mb-4 bg-black rounded-md overflow-hidden">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover ${isScanning ? "block" : "hidden"}`}
          autoPlay
          playsInline
          muted
        />
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full hidden" />

        {!isScanning && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <Camera className="w-16 h-16 text-gray-400" />
          </div>
        )}

        {/* Scanning overlay */}
        {isScanning && (
          <div className="absolute inset-0 border-2 border-[#d4a017] rounded-md">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-2 border-[#d4a017] rounded-md animate-pulse"></div>
          </div>
        )}
      </div>

      {isScanning ? (
        <Button onClick={stopScanning} variant="outline" className="flex items-center gap-2">
          <StopCircle className="w-4 h-4" />
          Stop Scanning
        </Button>
      ) : (
        <Button onClick={startScanning} className="flex items-center gap-2 bg-[#d4a017] hover:bg-[#c29016]">
          <Camera className="w-4 h-4" />
          Start Scanning
        </Button>
      )}

      {isScanning && (
        <p className="mt-2 text-sm text-gray-600 text-center">Position the QR code within the frame to scan</p>
      )}
    </div>
  )
}
