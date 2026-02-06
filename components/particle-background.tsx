'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

const MOBILE_PARTICLE_COUNT = 60
const DESKTOP_PARTICLE_COUNT = 150
const MOBILE_BREAKPOINT = 1000
const CONNECTION_DISTANCE = 200
const PARTICLE_SPEED = 0.5

const getParticleCount = () =>
  window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      for (let i = 0; i < getParticleCount(); i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * PARTICLE_SPEED,
          vy: (Math.random() - 0.5) * PARTICLE_SPEED,
        })
      }
    }

    const updateParticles = () => {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections and triangles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const d12 = distance(p1, p2)

          if (d12 < CONNECTION_DISTANCE) {
            // Draw line between p1 and p2
            const alpha = 1 - d12 / CONNECTION_DISTANCE
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.15})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()

            // Check for triangle with third particle
            for (let k = j + 1; k < particles.length; k++) {
              const p3 = particles[k]
              const d13 = distance(p1, p3)
              const d23 = distance(p2, p3)

              if (d13 < CONNECTION_DISTANCE && d23 < CONNECTION_DISTANCE) {
                const avgAlpha = (1 - d12 / CONNECTION_DISTANCE + 1 - d13 / CONNECTION_DISTANCE + 1 - d23 / CONNECTION_DISTANCE) / 3
                ctx.fillStyle = `rgba(255, 255, 255, ${avgAlpha * 0.03})`
                ctx.beginPath()
                ctx.moveTo(p1.x, p1.y)
                ctx.lineTo(p2.x, p2.y)
                ctx.lineTo(p3.x, p3.y)
                ctx.closePath()
                ctx.fill()
              }
            }
          }
        }

        // Draw particle dot
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.beginPath()
        ctx.arc(p1.x, p1.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const distance = (a: Particle, b: Particle) => {
      const dx = a.x - b.x
      const dy = a.y - b.y
      return Math.sqrt(dx * dx + dy * dy)
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationId = requestAnimationFrame(animate)
    }

    resize()
    createParticles()
    animate()

    window.addEventListener('resize', () => {
      resize()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
