'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'

// Cart item type
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: {
    url: string
    alt: string
  }
}

// Cart state type
interface CartState {
  items: CartItem[]
  isOpen: boolean
  totalItems: number
  totalPrice: number
}

// Cart actions
type CartAction =
  | { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' }

// Initial state
const initialState: CartState = {
  items: [],
  isOpen: false,
  totalItems: 0,
  totalPrice: 0,
}

// Cart reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { quantity = 1, ...product } = action.payload
      const existingItem = state.items.find((item) => item.id === product.id)

      let newItems: CartItem[]
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        newItems = [...state.items, { ...product, quantity }]
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: id })
      }

      const newItems = state.items.map((item) => (item.id === id ? { ...item, quantity } : item))

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case 'CLEAR_CART':
      return initialState

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      }

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      }

    default:
      return state
  }
}

// Cart context
const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

// Cart provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

// Custom hook to use cart
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  const { state, dispatch } = context

  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } })
  }

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' })
  }

  return {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
  }
}
