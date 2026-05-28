"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, Eye, Trash2, Mail, Clock } from "lucide-react"
import { toast } from "sonner"

interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: "new" | "read" | "replied"
  createdAt: string
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/contact`)

        if (!response.ok) {
          throw new Error("Failed to load contact messages")
        }

        const data = await response.json()

        const mappedContacts = data.map((message: Record<string, unknown>) => ({
          id: String(message._id),
          name: String(message.name),
          email: String(message.email),
          subject: String(message.subject),
          message: String(message.message),
          status: (message.status as Contact["status"]) || "new",
          createdAt: new Date(String(message.createdAt)).toLocaleString(),
        }))

        setContacts(mappedContacts)
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load contact messages")
      } finally {
        setIsLoading(false)
      }
    }

    void loadContacts()
  }, [backendUrl])

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleView = (contact: Contact) => {
    setSelectedContact(contact)
    if (contact.status === "new") {
      setContacts(contacts.map(c => c.id === contact.id ? { ...c, status: "read" } : c))
    }
  }

  const handleDelete = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id))
    toast.success("Contact message deleted")
  }

  const handleMarkReplied = (id: string) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, status: "replied" } : c))
    setSelectedContact(null)
    toast.success("Marked as replied")
  }

  const getStatusColor = (status: Contact["status"]) => {
    switch (status) {
      case "new": return "bg-blue-500"
      case "read": return "bg-yellow-500"
      case "replied": return "bg-green-500"
    }
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Contact Messages</h1>
        <p className="text-muted-foreground">View and manage contact form submissions</p>
      </motion.div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search messages..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> New: {contacts.filter(c => c.status === "new").length}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-500" /> Read: {contacts.filter(c => c.status === "read").length}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    Loading contact messages...
                  </TableCell>
                </TableRow>
              ) : filteredContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No contact messages yet.
                  </TableCell>
                </TableRow>
              ) : (
                filteredContacts.map((contact) => (
                  <TableRow key={contact.id} className={contact.status === "new" ? "bg-blue-50/50 dark:bg-blue-950/20" : ""}>
                    <TableCell>
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(contact.status)} inline-block`} />
                    </TableCell>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell className="max-w-xs truncate">{contact.subject}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {contact.createdAt}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleView(contact)}><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(contact.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Contact Message</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedContact.email}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Subject</p>
                <p className="font-medium">{selectedContact.subject}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Message</p>
                <p className="p-3 bg-muted rounded-lg text-sm">{selectedContact.message}</p>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" asChild>
                  <a href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}>
                    <Mail className="w-4 h-4 mr-2" /> Reply via Email
                  </a>
                </Button>
                {selectedContact.status !== "replied" && (
                  <Button onClick={() => handleMarkReplied(selectedContact.id)} className="bg-primary hover:bg-primary/90">
                    Mark as Replied
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
