'use client'

import React, { useState, useEffect } from 'react'
import { LoginModal } from './LoginModal'

// Global modal state management
let setGlobalLoginModal: ((open: boolean) => void) | null = null

export function openLoginModal() {
  if (setGlobalLoginModal) {
    console.log('🚀 Opening login modal from global function')
    setGlobalLoginModal(true)
  }
}

export function closeLoginModal() {
  if (setGlobalLoginModal) {
    console.log('🚪 Closing login modal from global function')
    setGlobalLoginModal(false)
  }
}

export function GlobalModals() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  useEffect(() => {
    // Set global reference
    setGlobalLoginModal = setIsLoginModalOpen

    // Cleanup on unmount
    return () => {
      setGlobalLoginModal = null
    }
  }, [])

  console.log('🔍 GlobalModals - isLoginModalOpen:', isLoginModalOpen)

  return (
    <>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}
