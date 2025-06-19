// BorzFuel Homepage - App Router version

// Import API utilities
import { getProducts, getBenefits, getIngredients } from './lib/api'

// Import komponenter (du må lage/flytte disse)
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import Link from 'next/link'
import { HeroSection } from './components/HeroSection'
import { BuySection } from './components/BuySection'
import { ProductBenefits } from './components/ProductBenefits'
import { Ingredients } from './components/Ingredients'
import { Testimonials } from './components/Testimonials'
import { AboutSection } from './components/AboutSection'
import { CartSidebar } from './components/CartSidebar'

export default async function HomePage() {
  // I App Router kan vi fetch direkte i server component
  try {
    // Hent data fra alle collections parallelt
    const [products, benefits, ingredients] = await Promise.all([
      getProducts(),
      getBenefits(),
      getIngredients(),
    ])

    // Bruk første produkt som featured product
    const featuredProduct = products[0] || null

    return (
      <>
        <Header />

        {/* Hero - hardkodet siden det endres sjelden */}
        <HeroSection product={featuredProduct} />

        {/* Buy Section - bruker ekte produktdata fra Payload */}

        {/* Benefits - bruker ekte data fra Benefits collection */}
        <ProductBenefits benefits={benefits} />
        {/* Testimonials - hardkodet siden det endres sjelden */}
        <Testimonials />

        {/* Ingredients - bruker ekte data fra Ingredients collection */}
        <Ingredients ingredients={ingredients} />
        <AboutSection />
        {featuredProduct && <BuySection product={featuredProduct} />}

        <Footer />

        {/* Cart Sidebar */}
        <CartSidebar />
      </>
    )
  } catch (error) {
    console.error('Error loading homepage:', error)

    // Fallback UI hvis noe går galt
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">BorzFuel</h1>
          <p className="text-gray-400 mb-8">Loading content...</p>
          <Link
            href="/admin"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold transition-colors"
          >
            Go to Admin Panel
          </Link>
        </div>
      </div>
    )
  }
}

// Metadata for SEO
export const metadata = {
  title: 'BorzFuel - Premium Pre-Workout Supplement',
  description:
    'Unleash the Borz in you with our science-backed pre-workout formula. Clinical doses, no fillers, explosive energy.',
}
