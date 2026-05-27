"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Save, User, Bell, Shield } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function SettingsPage() {
  const { admin } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    name: admin?.name || "Admin User",
    email: admin?.email || "admin@w3app.com",
    notifications: {
      email: true,
      newContacts: true,
      weeklyReport: false,
    },
    security: {
      twoFactor: false,
    }
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success("Settings saved successfully")
    setIsSaving(false)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </motion.div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="w-5 h-5" /> Profile
          </CardTitle>
          <CardDescription>Your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="w-5 h-5" /> Notifications
          </CardTitle>
          <CardDescription>Configure how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch
              checked={settings.notifications.email}
              onCheckedChange={(checked) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, email: checked }
              })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Contact Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified when new messages arrive</p>
            </div>
            <Switch
              checked={settings.notifications.newContacts}
              onCheckedChange={(checked) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, newContacts: checked }
              })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly Report</p>
              <p className="text-sm text-muted-foreground">Receive a weekly summary email</p>
            </div>
            <Switch
              checked={settings.notifications.weeklyReport}
              onCheckedChange={(checked) => setSettings({
                ...settings,
                notifications: { ...settings.notifications, weeklyReport: checked }
              })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5" /> Security
          </CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Switch
              checked={settings.security.twoFactor}
              onCheckedChange={(checked) => setSettings({
                ...settings,
                security: { ...settings.security, twoFactor: checked }
              })}
            />
          </div>
          <Separator />
          <div>
            <Button variant="outline" className="w-full">Change Password</Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90" disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  )
}
