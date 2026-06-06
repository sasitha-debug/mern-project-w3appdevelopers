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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const storedAdmin = localStorage.getItem("w3_admin")
      if (storedAdmin) {
        setAdmin(JSON.parse(storedAdmin))
      }
    } catch {
      localStorage.removeItem("w3_admin")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

    if (email === adminEmail && password === adminPassword) {
      const adminData = { id: "1", email, name: "Admin" }
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