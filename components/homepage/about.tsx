"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

const aboutPoints = [
  "10+ years of industry experience",
  "100+ successful projects delivered",
  "Dedicated support team",
  "Agile development methodology",
  "Cost-effective solutions",
  "On-time delivery guaranteed",
]

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About <span className="text-primary">W3 App Developers</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We are a leading web development company dedicated to delivering innovative digital solutions 
              that drive business growth. Our team of skilled professionals combines creativity with technical 
              expertise to build exceptional products.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Whether you need a stunning website, a powerful mobile app, or comprehensive digital marketing 
              strategies, we have the expertise to transform your vision into reality.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aboutPoints.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-6" />
              <div className="absolute inset-0 bg-primary/20 rounded-3xl transform -rotate-3" />
              <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 flex items-center justify-center">
                <div className="text-center text-primary-foreground">
                  <div className="text-6xl md:text-8xl font-bold mb-2">W3</div>
                  <div className="text-lg md:text-xl">App Developers</div>
                  <div className="mt-4 text-sm opacity-80">Building Digital Excellence</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
