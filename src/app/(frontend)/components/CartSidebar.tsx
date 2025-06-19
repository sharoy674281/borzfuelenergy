'use client'

import React from 'react'
import { ShoppingCart, X, Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'

export function CartSidebar() {
  const { items, isOpen, totalItems, totalPrice, closeCart, removeFromCart, updateQuantity } =
    useCart()
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />{' '}
      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md sm:max-w-sm bg-gray-900 z-50 flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center">
            <ShoppingCart className="mr-2" size={18} />
            Cart ({totalItems})
          </h2>
          <button onClick={closeCart} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>{' '}
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {items.length === 0 ? (
            <div className="text-center text-gray-400 mt-8">
              <ShoppingCart size={40} className="mx-auto mb-4 opacity-50" />
              <p className="text-sm sm:text-base">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 sm:space-x-4 bg-gray-800 p-3 sm:p-4 rounded-lg"
                >
                  {/* Product Image */}
                  {item.image ? (
                    <img
                      src={item.image.url}
                      alt={item.image.alt}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                      <ShoppingCart size={16} className="text-gray-500" />
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-xs sm:text-sm truncate">
                      {item.name}
                    </h3>
                    <p className="text-blue-400 font-bold text-sm sm:text-base">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-1 sm:mt-2 space-x-1 sm:space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-700 hover:bg-gray-600 p-1 rounded transition-colors"
                      >
                        <Minus size={15} />
                      </button>
                      <span className="text-white text-xs sm:text-sm px-1 sm:px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-700 hover:bg-gray-600 p-1 rounded transition-colors"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>{' '}
        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-700 p-4 sm:p-6">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-base sm:text-lg font-bold text-white">Total:</span>
              <span className="text-lg sm:text-xl font-bold text-blue-400">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 py-2.5 sm:py-3 text-white font-bold text-sm sm:text-base rounded-lg transition-all duration-300 transform hover:scale-[1.02]">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
