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

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initPixels()
    }

    const initPixels = () => {
      pixelsRef.current = []
      const gridSize = 60 // Aumentamos el tamaño de la cuadrícula para más espacio entre píxeles
      const pixelSize = 15 // Reducimos el tamaño de los píxeles
      const cols = Math.ceil(canvas.width / gridSize)
      const rows = Math.ceil(canvas.height / gridSize)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize + (gridSize - pixelSize) / 2 // Centramos el píxel en la celda
          const y = j * gridSize + (gridSize - pixelSize) / 2
          pixelsRef.current.push({
            x,
            y,
            size: pixelSize,
            baseSize: pixelSize,
            color: `rgba(255, 215, 0, ${Math.random() * 0.3 + 0.05})`, // Color dorado con opacidad variable
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
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)

        // Calcular distancia al ratón
        const dx = mouseRef.current.x - (pixel.x + pixel.size / 2)
        const dy = mouseRef.current.y - (pixel.y + pixel.size / 2)
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          // Efecto de atracción y aumento de tamaño
          const force = (maxDistance - distance) / maxDistance
          const targetSize = pixel.baseSize * (1 + force * 0.5)
          pixel.size += (targetSize - pixel.size) * 0.1

          pixel.x += dx * 0.02 * force
          pixel.y += dy * 0.02 * force
        } else {
          // Volver al tamaño y posición original
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
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 bg-background" style={{ pointerEvents: "none" }} />
}