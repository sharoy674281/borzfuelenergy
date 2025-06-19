'use client'

import React from 'react'
import { useCustomerAuth } from '../context/CustomerAuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { User, Package, MapPin, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { customer, isLoading, logout } = useCustomerAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !customer) {
      router.push('/')
    }
  }, [customer, isLoading, router])

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // Show nothing if not logged in (will redirect)
  if (!customer) {
    return null
  }

  const navigation = [
    { name: 'Profile', href: '/account', icon: User },
    { name: 'Orders', href: '/account/orders', icon: Package },
    { name: 'Addresses', href: '/account/addresses', icon: MapPin },
    { name: 'Settings', href: '/account/settings', icon: Settings },
  ]

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-medium">
                    {customer.firstName} {customer.lastName}
                  </h2>
                  <p className="text-gray-400 text-sm">{customer.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            <div className="bg-gray-800 rounded-lg p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
