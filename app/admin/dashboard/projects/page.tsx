"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { toast } from "sonner"

interface Project {
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  status: "active" | "draft"
}

const initialProjects: Project[] = [
  { id: "1", title: "E-Commerce Platform", category: "Web Development", description: "Full-featured online store", tags: ["React", "Node.js", "MongoDB"], status: "active" },
  { id: "2", title: "Healthcare App", category: "App Development", description: "Patient management application", tags: ["React Native", "Firebase"], status: "active" },
  { id: "3", title: "Restaurant POS", category: "Software", description: "Point of sale system", tags: ["Electron", "PostgreSQL"], status: "active" },
  { id: "4", title: "Real Estate Portal", category: "Web Development", description: "Property listing platform", tags: ["Next.js", "Prisma"], status: "draft" },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({ title: "", category: "", description: "", tags: "", status: "active" as const })

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...formData, tags: formData.tags.split(",").map(t => t.trim()) } : p))
      toast.success("Project updated successfully")
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        ...formData,
        tags: formData.tags.split(",").map(t => t.trim()),
        status: formData.status as "active" | "draft"
      }
      setProjects([...projects, newProject])
      toast.success("Project added successfully")
    }
    resetForm()
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({ title: project.title, category: project.category, description: project.description, tags: project.tags.join(", "), status: project.status })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setProjects(projects.filter(p => p.id !== id))
    toast.success("Project deleted successfully")
  }

  const resetForm = () => {
    setFormData({ title: "", category: "", description: "", tags: "", status: "active" })
    setEditingProject(null)
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="React, Node.js, MongoDB" />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                {editingProject ? "Update Project" : "Add Project"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                      {project.tags.length > 2 && <Badge variant="outline" className="text-xs">+{project.tags.length - 2}</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={project.status === "active" ? "default" : "secondary"}>{project.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(project)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(project.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
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
