"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A full-featured online store with payment integration and inventory management.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Healthcare App",
    category: "App Development",
    description: "Mobile application for patient management and telemedicine consultations.",
    tags: ["React Native", "Firebase", "WebRTC"],
  },
  {
    title: "Restaurant POS",
    category: "Software",
    description: "Point of sale system with real-time order tracking and analytics.",
    tags: ["Electron", "PostgreSQL", "Express"],
  },
  {
    title: "Real Estate Portal",
    category: "Web Development",
    description: "Property listing platform with virtual tours and mortgage calculator.",
    tags: ["Next.js", "Prisma", "AWS"],
  },
  {
    title: "Fitness Tracker",
    category: "App Development",
    description: "Workout tracking app with AI-powered recommendations and progress charts.",
    tags: ["Flutter", "TensorFlow", "GraphQL"],
  },
  {
    title: "Learning Management",
    category: "Web Development",
    description: "Online education platform with video streaming and certification system.",
    tags: ["Vue.js", "Django", "Redis"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of successful projects that showcase our expertise and commitment to excellence.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                {/* Project Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">W3</span>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                    View Project <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
