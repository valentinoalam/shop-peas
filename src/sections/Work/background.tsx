"use client"

import { useEffect, useRef } from "react"
import { Dots, Circuits, Things, Background } from "./script"
import { cn } from "@/lib/utils"

const CircuitAnimation = ({className}: {className: string}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const parent = canvas.parentElement; // Get parent element
    if (!parent) return;
    
    if (!ctx) {
      console.error("Unable to get 2D context from canvas")
      return
    }

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Initialize components
    const dots = new Dots(canvas.width, canvas.height, 5)
    const things = new Things(canvas.width, canvas.height)
    things.setDotsGhost(dots.ghost())
    things.setLight(dots.spacing * 4)

    const maxLength = 16
    const minLength = 3
    const cellSize = 10
    const circuits = new Circuits(canvas.width, canvas.height, cellSize, minLength, maxLength)

    // Populate things from circuits
    circuits.collection.forEach((circuit) => {
      circuit.things.forEach((thing) => {
        things.collection.push(thing)
      })
    })

    const background = new Background(canvas.width, canvas.height)
    const staticBG = background.getBackground(dots, circuits)

    // Animation loop
    function loop() {
        if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(staticBG, 0, 0)

      // Update and draw things
      things.update()
      things.draw()

      ctx.drawImage(things.canvas, 0, 0)
      requestAnimationFrame(loop)
    }

    loop()

    // Cleanup function
    return () => {
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className={cn(className,"sticky top-0 left-0 opacity-75 -z-[1]")} />
}

export default CircuitAnimation

