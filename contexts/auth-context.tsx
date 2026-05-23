"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface Admin {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  admin: Admin | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo credentials for testing
const DEMO_ADMIN = {
  email: "admin@w3app.com",
  password: "admin123",
  id: "1",
  name: "Admin User"
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedAdmin = localStorage.getItem("w3_admin")
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      const adminData = { id: DEMO_ADMIN.id, email: DEMO_ADMIN.email, name: DEMO_ADMIN.name }
      setAdmin(adminData)
      localStorage.setItem("w3_admin", JSON.stringify(adminData))
      return true
    }
    return false
  }

  const logout = () => {
    setAdmin(null)
    localStorage.removeItem("w3_admin")
  }

  return (
    <AuthContext.Provider value={{ admin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
