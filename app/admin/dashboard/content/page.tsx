"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Save, Loader2 } from "lucide-react"

interface HomepageContent {
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  aboutTitle: string
  aboutDescription: string
  ctaTitle: string
  ctaDescription: string
}

const defaultContent: HomepageContent = {
  heroTitle: "Innovative Digital Solutions for Business Growth",
  heroSubtitle: "W3 App Developers",
  heroDescription: "We provide top-tier IT services using the latest technologies to deliver affordable and innovative solutions.",
  aboutTitle: "About W3 App Developers",
  aboutDescription: "We are a leading web development company dedicated to delivering innovative digital solutions that drive business growth.",
  ctaTitle: "Ready to Start Your Project?",
  ctaDescription: "Let's work together to bring your vision to life. Get in touch with us today.",
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

export default function ContentPage() {
  const [content, setContent] = useState<HomepageContent>(defaultContent)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`${backendUrl}/api/content`)
      .then(res => res.json())
      .then(data => { if (data && data.heroTitle) setContent(data) })
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      await fetch(`${backendUrl}/api/content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })
      toast.success("Homepage content updated successfully")
    } catch {
      toast.error("Failed to save content")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  )

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Homepage Content</h1>
        <p className="text-muted-foreground">Edit the content displayed on your homepage</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Hero Section</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Main Title</Label>
              <Input value={content.heroTitle} onChange={(e) => setContent({ ...content, heroTitle: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input value={content.heroSubtitle} onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={content.heroDescription} onChange={(e) => setContent({ ...content, heroDescription: e.target.value })} rows={3} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">About Section</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={content.aboutTitle} onChange={(e) => setContent({ ...content, aboutTitle: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={content.aboutDescription} onChange={(e) => setContent({ ...content, aboutDescription: e.target.value })} rows={4} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Call to Action Section</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={content.ctaTitle} onChange={(e) => setContent({ ...content, ctaTitle: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={content.ctaDescription} onChange={(e) => setContent({ ...content, ctaDescription: e.target.value })} rows={2} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSaving}>
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}