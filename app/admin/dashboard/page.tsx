"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban, MessageSquareQuote, Mail, Eye, TrendingUp, Users } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

const recentActivities = [
  { action: "New contact message received", time: "2 minutes ago", type: "contact" },
  { action: "Project 'E-Commerce Platform' updated", time: "1 hour ago", type: "project" },
  { action: "New testimonial added", time: "3 hours ago", type: "testimonial" },
  { action: "Homepage content updated", time: "5 hours ago", type: "content" },
  { action: "New project 'Healthcare App' added", time: "1 day ago", type: "project" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  const { admin } = useAuth()
  const [stats, setStats] = useState([
    { title: "Total Projects", value: "...", icon: FolderKanban, change: "", color: "text-blue-500" },
    { title: "Testimonials", value: "...", icon: MessageSquareQuote, change: "", color: "text-green-500" },
    { title: "Contact Messages", value: "...", icon: Mail, change: "", color: "text-orange-500" },
    { title: "Page Views", value: "8.2K", icon: Eye, change: "+15% vs last week", color: "text-purple-500" },
  ])

  useEffect(() => {
    Promise.all([
      fetch(`${backendUrl}/api/projects`).then(r => r.json()),
      fetch(`${backendUrl}/api/testimonials`).then(r => r.json()),
      fetch(`${backendUrl}/api/contact`).then(r => r.json()),
    ]).then(([projects, testimonials, contacts]) => {
      setStats(prev => prev.map(s => {
        if (s.title === "Total Projects") return { ...s, value: String(Array.isArray(projects) ? projects.length : 0), change: `${Array.isArray(projects) ? projects.length : 0} total` }
        if (s.title === "Testimonials") return { ...s, value: String(Array.isArray(testimonials) ? testimonials.length : 0), change: `${Array.isArray(testimonials) ? testimonials.length : 0} total` }
        if (s.title === "Contact Messages") return { ...s, value: String(Array.isArray(contacts) ? contacts.length : 0), change: `${Array.isArray(contacts) ? contacts.length : 0} total` }
        return s
      }))
    }).catch(() => {})
  }, [])

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {admin?.name || "Admin"}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening with your website today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 bg-muted rounded-xl ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === "contact" ? "bg-orange-500" :
                      activity.type === "project" ? "bg-blue-500" :
                      activity.type === "testimonial" ? "bg-green-500" :
                      "bg-purple-500"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm">Active Users</span>
                </div>
                <span className="font-semibold">156</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-primary" />
                  <span className="text-sm">Today&apos;s Views</span>
                </div>
                <span className="font-semibold">1,234</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Conversion Rate</span>
                </div>
                <span className="font-semibold">4.2%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}