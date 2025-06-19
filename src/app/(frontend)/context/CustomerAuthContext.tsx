'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// Customer type (matches Users collection with role=customer)
export interface Customer {
  id: string
  email: string
  role: 'admin' | 'customer'
  firstName?: string
  lastName?: string
  marketingConsent?: boolean
  customerStatus?: 'active' | 'inactive' | 'banned'
}

// Auth state
interface CustomerAuthState {
  customer: Customer | null
  isLoading: boolean
  isLoggedIn: boolean
}

// Auth actions
interface CustomerAuthActions {
  login: (email: string, password: string) => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<Customer>) => Promise<boolean>
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  marketingConsent?: boolean
  role?: 'customer' // Always customer for frontend registration
}

type CustomerAuthContextType = CustomerAuthState & CustomerAuthActions

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined)

// Provider component
export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth()
  }, [])
  const checkAuth = async () => {
    try {
      const response = await fetch('/api/users/me', {
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        // Only set customer if user has customer role
        if (data.user?.role === 'customer') {
          setCustomer(data.user)
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setIsLoading(false)
    }
  }
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        // Only set customer if user has customer role
        if (data.user?.role === 'customer') {
          setCustomer(data.user)
          console.log('✅ Customer logged in:', data.user.email)
          return true
        } else {
          console.log('❌ Login failed: User is not a customer')
          return false
        }
      } else {
        const errorData = await response.json()
        console.error('❌ Login failed:', errorData.message)
        return false
      }
    } catch (error) {
      console.error('❌ Login error:', error)
      return false
    }
  }
  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...data,
          role: 'customer', // Always set role to customer for frontend registration
        }),
      })

      if (response.ok) {
        const responseData = await response.json()
        setCustomer(responseData.doc)
        console.log('✅ Customer registered:', responseData.doc.email)
        return true
      } else {
        const errorData = await response.json()
        console.error('❌ Registration failed:', errorData.message)
        return false
      }
    } catch (error) {
      console.error('❌ Registration error:', error)
      return false
    }
  }
  const logout = async () => {
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setCustomer(null)
      console.log('✅ Customer logged out')
    }
  }
  const updateProfile = async (data: Partial<Customer>): Promise<boolean> => {
    if (!customer) return false

    try {
      const response = await fetch(`/api/users/${customer.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const responseData = await response.json()
        setCustomer(responseData.doc)
        console.log('✅ Profile updated')
        return true
      } else {
        console.error('❌ Profile update failed')
        return false
      }
    } catch (error) {
      console.error('❌ Profile update error:', error)
      return false
    }
  }

  const value: CustomerAuthContextType = {
    customer,
    isLoading,
    isLoggedIn: !!customer,
    login,
    register,
    logout,
    updateProfile,
  }

  return <CustomerAuthContext.Provider value={value}>{children}</CustomerAuthContext.Provider>
}

// Hook to use customer auth
export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext)
  if (context === undefined) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider')
  }
  return context
}
