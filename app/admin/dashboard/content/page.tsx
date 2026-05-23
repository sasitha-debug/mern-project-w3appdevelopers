"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Save } from "lucide-react"

interface HomepageContent {
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  aboutTitle: string
  aboutDescription: string
  ctaTitle: string
  ctaDescription: string
}

const initialContent: HomepageContent = {
  heroTitle: "Innovative Digital Solutions for Business Growth",
  heroSubtitle: "W3 App Developers",
  heroDescription: "We provide top-tier IT services using the latest technologies to deliver affordable and innovative solutions.",
  aboutTitle: "About W3 App Developers",
  aboutDescription: "We are a leading web development company dedicated to delivering innovative digital solutions that drive business growth.",
  ctaTitle: "Ready to Start Your Project?",
  ctaDescription: "Let's work together to bring your vision to life. Get in touch with us today.",
}

export default function ContentPage() {
  const [content, setContent] = useState<HomepageContent>(initialContent)
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success("Homepage content updated successfully")
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Homepage Content</h1>
        <p className="text-muted-foreground">Edit the content displayed on your homepage</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heroTitle">Main Title</Label>
              <Input
                id="heroTitle"
                value={content.heroTitle}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroSubtitle">Subtitle</Label>
              <Input
                id="heroSubtitle"
                value={content.heroSubtitle}
                onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroDescription">Description</Label>
              <Textarea
                id="heroDescription"
                value={content.heroDescription}
                onChange={(e) => setContent({ ...content, heroDescription: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aboutTitle">Title</Label>
              <Input
                id="aboutTitle"
                value={content.aboutTitle}
                onChange={(e) => setContent({ ...content, aboutTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutDescription">Description</Label>
              <Textarea
                id="aboutDescription"
                value={content.aboutDescription}
                onChange={(e) => setContent({ ...content, aboutDescription: e.target.value })}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Call to Action Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ctaTitle">Title</Label>
              <Input
                id="ctaTitle"
                value={content.ctaTitle}
                onChange={(e) => setContent({ ...content, ctaTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaDescription">Description</Label>
              <Textarea
                id="ctaDescription"
                value={content.ctaDescription}
                onChange={(e) => setContent({ ...content, ctaDescription: e.target.value })}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
