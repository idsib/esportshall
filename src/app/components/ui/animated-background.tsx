"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "../../context/theme-context"

interface Pixel {
  x: number
  y: number
  size: number
  baseSize: number
  color: string
  baseX: number
  baseY: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const pixelsRef = useRef<Pixel[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isDarkMode = theme === 'dark'

    const getPixelColor = () => {
      return isDarkMode 
        ? `rgba(255, 215, 0, ${Math.random() * 0.2 + 0.05})`
        : `rgba(255, 215, 0, ${Math.random() * 0.25 + 0.1})`
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initPixels()
    }

    const initPixels = () => {
      pixelsRef.current = []
      const gridSize = 40
      const pixelSize = 8
      const cols = Math.ceil(canvas.width / gridSize)
      const rows = Math.ceil(canvas.height / gridSize)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize + (gridSize - pixelSize) / 2
          const y = j * gridSize + (gridSize - pixelSize) / 2
          pixelsRef.current.push({
            x,
            y,
            size: pixelSize,
            baseSize: pixelSize,
            color: getPixelColor(),
            baseX: x,
            baseY: y,
          })
        }
      }
    }

    const drawPixels = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      pixelsRef.current.forEach((pixel) => {
        ctx.fillStyle = pixel.color
        ctx.shadowColor = isDarkMode 
          ? 'rgba(255, 215, 0, 0.15)' 
          : 'rgba(255, 215, 0, 0.25)'
        ctx.shadowBlur = isDarkMode ? 5 : 8
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
        ctx.shadowBlur = 0

        const dx = mouseRef.current.x - (pixel.x + pixel.size / 2)
        const dy = mouseRef.current.y - (pixel.y + pixel.size / 2)
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 100

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const targetSize = pixel.baseSize * (1 + force * (isDarkMode ? 0.3 : 0.4))
          pixel.size += (targetSize - pixel.size) * 0.1

          pixel.x += dx * 0.01 * force
          pixel.y += dy * 0.01 * force
        } else {
          pixel.size += (pixel.baseSize - pixel.size) * 0.1
          pixel.x += (pixel.baseX - pixel.x) * 0.05
          pixel.y += (pixel.baseY - pixel.y) * 0.05
        }
      })
    }

    const animate = () => {
      drawPixels()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)

    resize()
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [theme])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 transition-colors duration-300 dark:bg-dark-100 bg-gray-50" 
      style={{ pointerEvents: "none" }} 
    />
  )
} 