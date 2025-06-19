// BorzFuel API utilities - Kobler Next.js til Payload CMS

const API_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'

// Hent alle publiserte produkter
export async function getProducts() {
  try {
    const response = await fetch(
      `${API_URL}/api/products?where[status][equals]=published&populate=image`,
    )

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Hent alle benefits
export async function getBenefits() {
  try {
    const response = await fetch(`${API_URL}/api/benefits?sort=order&limit=10`)

    if (!response.ok) {
      throw new Error('Failed to fetch benefits')
    }

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching benefits:', error)
    return []
  }
}

// Hent alle ingredienser
export async function getIngredients() {
  try {
    const response = await fetch(`${API_URL}/api/ingredients?sort=order&limit=20`)

    if (!response.ok) {
      throw new Error('Failed to fetch ingredients')
    }

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching ingredients:', error)
    return []
  }
}

// Hent header data (hvis du har Header global)
export async function getHeader() {
  try {
    const response = await fetch(`${API_URL}/api/globals/header`)

    if (!response.ok) {
      throw new Error('Failed to fetch header')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching header:', error)
    return null
  }
}

// Hent footer data (hvis du har Footer global)
export async function getFooter() {
  try {
    const response = await fetch(`${API_URL}/api/globals/footer`)

    if (!response.ok) {
      throw new Error('Failed to fetch footer')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching footer:', error)
    return null
  }
}

// TypeScript type definitions
export interface Product {
  id: string
  name: string
  slug: string
  price: number
  compareAtPrice?: number
  shortDescription?: string
  description?: any
  image?: {
    url: string
    alt: string
  }
  badge?: string
  rating?: number
  reviewCount?: number
  status: 'draft' | 'published' | 'archived'
  inStock?: boolean
  features?: Feature[]
  // Relationships kommer automatisk via Payload hooks
  ingredients?: Ingredient[]
  benefits?: Benefit[]
}

export interface Feature {
  id?: string
  icon: 'truck' | 'shield' | 'clock' | 'award'
  text: string
  color: 'green' | 'blue' | 'yellow' | 'red'
}

export interface Benefit {
  id: string
  title: string
  description: string
  highlight?: string
  icon: 'zap' | 'target' | 'battery' | 'brain' | 'shield' | 'award'
  order?: number
}

export interface Ingredient {
  id: string
  name: string
  amount: string
  benefit: string
  category: 'pump' | 'endurance' | 'energy' | 'focus' | 'cognitive' | 'strength'
  order?: number
}
