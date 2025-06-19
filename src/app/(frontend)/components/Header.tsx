'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, ShoppingCart, User, LogOut, Settings } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useCustomerAuth } from '../context/CustomerAuthContext'
import { openLoginModal } from './GlobalModals'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { totalItems, toggleCart } = useCart()
  const { customer, isLoggedIn, logout } = useCustomerAuth()

  const userMenuRef = useRef<HTMLDivElement>(null) // Debug logging
  useEffect(() => {
    console.log('🔍 Header Debug:')
    console.log('- isLoggedIn:', isLoggedIn)
    console.log('- customer:', customer)
    console.log('- isUserMenuOpen:', isUserMenuOpen)
  }, [isLoggedIn, customer, isUserMenuOpen])

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-gray-800/50">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold text-white tracking-wide">
          BORZ<span className="text-blue-500">FUEL</span>
        </a>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-10">
          <a
            href="#buy"
            className="text-gray-300 hover:text-white transition-colors font-medium tracking-wide"
          >
            Product
          </a>
          <a
            href="#benefits"
            className="text-gray-300 hover:text-white transition-colors font-medium tracking-wide"
          >
            Benefits
          </a>
          <a
            href="#ingredients"
            className="text-gray-300 hover:text-white transition-colors font-medium tracking-wide"
          >
            Ingredients
          </a>
          <a
            href="#about"
            className="text-gray-300 hover:text-white transition-colors font-medium tracking-wide"
          >
            About
          </a>
        </nav>{' '}
        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            {' '}
            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  console.log('🖱️ User menu button clicked!')
                  console.log('Current isUserMenuOpen:', isUserMenuOpen)
                  setIsUserMenuOpen(!isUserMenuOpen)
                }}
                className={`text-gray-300 hover:text-white transition-colors p-2 hover:bg-gray-800/50 rounded-lg flex items-center space-x-2 ${
                  isLoggedIn ? 'text-blue-400' : ''
                }`}
              >
                <User size={20} />
                {isLoggedIn && customer && (
                  <span className="text-sm font-medium">
                    {customer.firstName || customer.email}
                  </span>
                )}
              </button>{' '}
              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-12 bg-gray-900 border border-gray-700 rounded-lg shadow-xl min-w-48 z-50 animate-fade-in">
                  {isLoggedIn ? (
                    // Logged in menu
                    <>
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-sm text-gray-400">Signed in as</p>
                        <p className="text-white font-medium">{customer?.email}</p>
                      </div>
                      <div className="py-2">
                        {' '}
                        <button
                          className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors flex items-center space-x-2"
                          onClick={() => {
                            console.log('🔧 Profile clicked - redirecting to /account')
                            window.location.href = '/account'
                            setIsUserMenuOpen(false)
                          }}
                        >
                          <Settings size={16} />
                          <span>My Account</span>
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors flex items-center space-x-2"
                          onClick={() => {
                            console.log('🚪 Logout clicked')
                            logout()
                            setIsUserMenuOpen(false)
                          }}
                        >
                          <LogOut size={16} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    // Not logged in menu
                    <div className="py-2">
                      {' '}
                      <button
                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        onClick={() => {
                          console.log('🔑 Sign In clicked')
                          console.log('Opening login modal via global function')
                          openLoginModal()
                          setIsUserMenuOpen(false)
                        }}
                      >
                        Sign In
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        onClick={() => {
                          console.log('📝 Create Account clicked')
                          console.log('Opening login modal via global function')
                          openLoginModal()
                          setIsUserMenuOpen(false)
                        }}
                      >
                        Create Account
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={toggleCart}
              className="text-gray-300 hover:text-white transition-colors p-2 hover:bg-gray-800/50 rounded-lg relative"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
          <a
            href="#buy"
            className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-2 text-white font-bold transition-all rounded-lg hover:from-blue-600 hover:to-blue-800 hover:shadow-lg transform hover:scale-105"
          >
            BUY NOW
          </a>{' '}
        </div>
        {/* Mobile Menu Button & Cart */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={toggleCart}
            className="text-white hover:text-blue-500 transition-colors p-2 hover:bg-gray-800/50 rounded-lg relative"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="text-white hover:text-blue-500 transition-colors p-2 hover:bg-gray-800/50 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-950/98 backdrop-blur-md border-t border-gray-800/50 animate-slide-down">
          <div className="container mx-auto px-6 py-8 flex flex-col h-screen space-y-10">
            <a
              href="#buy"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all py-4 px-6 rounded-lg font-medium tracking-wide animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Product
            </a>
            <a
              href="#benefits"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all py-4 px-6 rounded-lg font-medium tracking-wide animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Benefits
            </a>
            <a
              href="#ingredients"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all py-4 px-6 rounded-lg font-medium tracking-wide animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Ingredients
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all py-4 px-6 rounded-lg font-medium tracking-wide animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            {/* Mobile Actions */}
            <div
              className="pt-6 mt-6 border-t border-gray-800/50 space-y-4 animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              {' '}
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      console.log('📱 Mobile user button clicked - opening login modal')
                      openLoginModal()
                      setIsMenuOpen(false)
                    }
                  }}
                  className={`text-gray-300 hover:text-white transition-colors p-3 hover:bg-gray-800/50 rounded-lg ${
                    isLoggedIn ? 'text-blue-400' : ''
                  }`}
                >
                  <User size={22} />
                </button>
                <button
                  onClick={toggleCart}
                  className="text-gray-300 hover:text-white transition-colors p-3 hover:bg-gray-800/50 rounded-lg relative"
                >
                  <ShoppingCart size={22} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
              <a
                href="#buy"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 py-4 text-white font-bold text-center transition-all rounded-lg shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                BUY NOW
              </a>
            </div>{' '}
          </div>{' '}
        </div>
      )}
    </header>
  )
}
