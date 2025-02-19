"use client"

import { useEffect, useRef } from "react"

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

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isDarkMode = document.documentElement.classList.contains('dark')

    const getPixelColor = () => {
      if (isDarkMode) {
        return `rgba(255, 215, 0, ${Math.random() * 0.2 + 0.05})`  // Dorado más intenso en modo oscuro
      }
      return `rgba(218, 165, 32, ${Math.random() * 0.3 + 0.1})`   // Dorado más visible en modo claro
    }

    const getPixelSize = () => {
      return isDarkMode ? 8 : 10 // Píxeles más pequeños en ambos modos
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initPixels()
    }

    const initPixels = () => {
      pixelsRef.current = []
      const gridSize = isDarkMode ? 40 : 45 // Grid más denso
      const pixelSize = getPixelSize()
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
        if (!isDarkMode) {
          ctx.shadowColor = 'rgba(218, 165, 32, 0.15)' // Sombra más sutil
          ctx.shadowBlur = 5 // Menos blur
        }
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
        ctx.shadowBlur = 0

        const dx = mouseRef.current.x - (pixel.x + pixel.size / 2)
        const dy = mouseRef.current.y - (pixel.y + pixel.size / 2)
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = isDarkMode ? 100 : 80 // Radio de interacción más pequeño

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const targetSize = pixel.baseSize * (1 + force * (isDarkMode ? 0.3 : 0.2))
          pixel.size += (targetSize - pixel.size) * 0.1

          pixel.x += dx * (isDarkMode ? 0.01 : 0.005) * force
          pixel.y += dy * (isDarkMode ? 0.01 : 0.005) * force
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
        x: e.x,
        y: e.y,
      }
    }

    // Observar cambios en el tema
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          initPixels()  // Reinicializar píxeles cuando cambie el tema
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)

    resize()
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 transition-colors duration-300 dark:bg-dark-100 bg-gray-50" 
      style={{ pointerEvents: "none" }} 
    />
  )
}