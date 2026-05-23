"use client"

import { motion } from "framer-motion"

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Vue.js", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "MongoDB", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "React Native", category: "Mobile" },
  { name: "Flutter", category: "Mobile" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "TypeScript", category: "Language" },
]

export function Technologies() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Technologies We <span className="text-primary">Use</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We leverage cutting-edge technologies to build robust and scalable solutions.
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="px-6 py-3 bg-background border border-border rounded-full shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-default"
            >
              <span className="font-medium text-foreground">{tech.name}</span>
              <span className="text-xs text-muted-foreground ml-2">({tech.category})</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
