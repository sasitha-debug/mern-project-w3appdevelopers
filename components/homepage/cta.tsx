"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Content {
  ctaTitle?: string
  ctaDescription?: string
}

export function CTA() {
  const [content, setContent] = useState<Content>({})

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
    fetch(`${backendUrl}/api/content`)
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(() => {})
  }, [])

  const ctaTitle = content.ctaTitle || "Ready to Start Your Project?"
  const ctaDescription = content.ctaDescription || "Let's work together to bring your vision to life. Get in touch with us today and take the first step towards digital excellence."

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-primary-foreground"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{ctaTitle}</h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8 text-lg">
            {ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-background text-primary hover:bg-background/90 px-8">
              <Link href="#contact">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8">
              <Link href="#projects">View Our Work</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}