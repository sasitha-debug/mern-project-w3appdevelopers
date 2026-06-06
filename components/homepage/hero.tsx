"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Content {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: string
}

export function Hero() {
  const [content, setContent] = useState<Content>({})

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
    fetch(`${backendUrl}/api/content`)
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(() => {})
  }, [])

  const heroTitle = content.heroTitle || "Innovative Digital Solutions for Business Growth"
  const heroDescription = content.heroDescription || "We provide top-tier IT services using the latest technologies to deliver affordable and innovative solutions. Whether launching a new business or optimizing an existing one, we accelerate growth through software development, app creation, graphic design, digital marketing, and data analytics."

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-block"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <span className="text-primary-foreground font-bold text-3xl md:text-4xl">W3</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{content.heroSubtitle || "App Developers"}</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            <span className="text-primary">{heroTitle}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              <Link href="#services">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8">
              <Link href="#contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}