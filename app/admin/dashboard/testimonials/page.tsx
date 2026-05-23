"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Pencil, Trash2, Search, Star } from "lucide-react"
import { toast } from "sonner"

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
}

const initialTestimonials: Testimonial[] = [
  { id: "1", name: "Sarah Johnson", role: "CEO, TechStart Inc.", content: "W3 App Developers transformed our business with their exceptional web development services.", rating: 5 },
  { id: "2", name: "Michael Chen", role: "Founder, GrowthHub", content: "Professional, responsive, and incredibly talented. They built our mobile app in record time.", rating: 5 },
  { id: "3", name: "Emily Rodriguez", role: "Marketing Director, BrandX", content: "Their digital marketing strategies increased our online presence by 300%.", rating: 4 },
  { id: "4", name: "David Kumar", role: "CTO, InnovateTech", content: "The team's technical expertise and attention to detail are unmatched.", rating: 5 },
]

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState({ name: "", role: "", content: "", rating: 5 })

  const filteredTestimonials = testimonials.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTestimonial) {
      setTestimonials(testimonials.map(t => t.id === editingTestimonial.id ? { ...t, ...formData } : t))
      toast.success("Testimonial updated successfully")
    } else {
      const newTestimonial: Testimonial = { id: Date.now().toString(), ...formData }
      setTestimonials([...testimonials, newTestimonial])
      toast.success("Testimonial added successfully")
    }
    resetForm()
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({ name: testimonial.name, role: testimonial.role, content: testimonial.content, rating: testimonial.rating })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id))
    toast.success("Testimonial deleted successfully")
  }

  const resetForm = () => {
    setFormData({ name: "", role: "", content: "", rating: 5 })
    setEditingTestimonial(null)
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
          <p className="text-muted-foreground">Manage client testimonials</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" /> Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Client Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role / Company</Label>
                <Input id="role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Testimonial</Label>
                <Textarea id="content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={4} required />
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setFormData({ ...formData, rating: star })} className="p-1">
                      <Star className={`w-6 h-6 ${star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      <Card>
        <CardHeader className="pb-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search testimonials..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="max-w-xs">Testimonial</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTestimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell className="font-medium">{testimonial.name}</TableCell>
                  <TableCell>{testimonial.role}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{testimonial.content}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(testimonial)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(testimonial.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
