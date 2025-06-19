import React from 'react'
import './globals.css'
import { CartProvider } from './context/CartContext'
import { CustomerAuthProvider } from './context/CustomerAuthContext'
import { GlobalModals } from './components/GlobalModals'

export const metadata = {
  description: 'BorzFuel - Premium Pre-Workout Supplement',
  title: 'BorzFuel - Unleash the Borz in You',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white">
        <CustomerAuthProvider>
          <CartProvider>
            <main>{children}</main>
            <GlobalModals />
          </CartProvider>
        </CustomerAuthProvider>
      </body>
    </html>
  )
}
