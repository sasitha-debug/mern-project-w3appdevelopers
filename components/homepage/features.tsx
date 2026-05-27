"use client"

import { motion } from "framer-motion"
import { Shield, Users, Zap, Award, Layers } from "lucide-react"

const features = [
  {
    icon: Layers,
    title: "All in one services",
    description: "From web hosting to software development, marketing, and training we do it all.",
  },
  {
    icon: Award,
    title: "Affordable & Scalable",
    description: "High-quality services that fit your budget and grow with your business.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Skilled professionals ready to bring your ideas to life.",
  },
  {
    icon: Shield,
    title: "Reliable & Secure",
    description: "Fast, secure and high performance solutions you can trust.",
  },
  {
    icon: Zap,
    title: "Latest Technology",
    description: "We use modern tools to build fast, secure, and efficient solutions.",
  },
]

export function Features() {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center text-primary-foreground"
            >
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-sm md:text-base mb-1">{feature.title}</h3>
              <p className="text-xs md:text-sm text-primary-foreground/80 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
