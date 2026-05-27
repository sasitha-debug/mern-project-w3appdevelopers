"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, 
  FolderKanban, 
  MessageSquareQuote, 
  FileText, 
  Mail, 
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/dashboard/projects", icon: FolderKanban },
  { name: "Testimonials", href: "/admin/dashboard/testimonials", icon: MessageSquareQuote },
  { name: "Content", href: "/admin/dashboard/content", icon: FileText },
  { name: "Contacts", href: "/admin/dashboard/contacts", icon: Mail },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
]

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const { admin, logout } = useAuth()

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-sidebar rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6 text-sidebar-foreground" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? 80 : 280,
          x: isMobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -280 : 0)
        }}
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-50",
          "lg:translate-x-0 lg:static",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-bold">W3</span>
              </div>
              {!isCollapsed && (
                <span className="text-sidebar-foreground font-semibold">Admin Panel</span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-sidebar-foreground"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block text-sidebar-foreground hover:text-primary"
            >
              <ChevronRight className={cn("w-5 h-5 transition-transform", isCollapsed ? "" : "rotate-180")} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <link.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium">{link.name}</span>}
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-sidebar-border space-y-3">
            {!isCollapsed && admin && (
              <div className="px-3">
                <p className="text-sm font-medium text-sidebar-foreground">{admin.name}</p>
                <p className="text-xs text-sidebar-foreground/60">{admin.email}</p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <Button
                variant="ghost"
                onClick={logout}
                className={cn(
                  "flex-1 justify-start text-sidebar-foreground hover:text-destructive hover:bg-destructive/10",
                  isCollapsed && "justify-center flex-1"
                )}
              >
                <LogOut className="w-5 h-5" />
                {!isCollapsed && <span className="ml-3">Logout</span>}
              </Button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
