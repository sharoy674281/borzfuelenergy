import React from 'react'
import { CheckCircle, Shield, Award, FlaskConical } from 'lucide-react'
import { Ingredient } from '../lib/api'

interface IngredientsProps {
  ingredients: Ingredient[]
}

export function Ingredients({ ingredients }: IngredientsProps) {
  // Bruk Payload data hvis det finnes, ellers fallback
  const ingredientsToShow =
    ingredients && ingredients.length > 0
      ? ingredients
      : [
          {
            id: '1',
            name: 'L-Citrulline Malate',
            amount: '8,000mg',
            benefit: 'Enhanced blood flow and massive pumps',
            category: 'pump' as const,
          },
          {
            id: '2',
            name: 'Beta-Alanine',
            amount: '3,200mg',
            benefit: 'Increased muscular endurance and power output',
            category: 'endurance' as const,
          },
          {
            id: '3',
            name: 'Caffeine Anhydrous',
            amount: '350mg',
            benefit: 'Explosive energy and mental alertness',
            category: 'energy' as const,
          },
          {
            id: '4',
            name: 'L-Theanine',
            amount: '200mg',
            benefit: 'Smooth energy without jitters or crash',
            category: 'focus' as const,
          },
          {
            id: '5',
            name: 'Alpha-GPC',
            amount: '300mg',
            benefit: 'Enhanced mind-muscle connection and focus',
            category: 'cognitive' as const,
          },
          {
            id: '6',
            name: 'Betaine Anhydrous',
            amount: '2,500mg',
            benefit: 'Increased power and strength',
            category: 'strength' as const,
          },
        ]

  const getCategoryColor = (category: string) => {
    const colors = {
      pump: 'text-red-400 bg-red-400/10',
      endurance: 'text-orange-400 bg-orange-400/10',
      energy: 'text-yellow-400 bg-yellow-400/10',
      focus: 'text-green-400 bg-green-400/10',
      cognitive: 'text-purple-400 bg-purple-400/10',
      strength: 'text-blue-400 bg-blue-400/10',
    }
    return colors[category as keyof typeof colors] || 'text-gray-400 bg-gray-400/10'
  }

  return (
    <section id="ingredients" className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            SCIENCE-BACKED{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
              FORMULA
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Every ingredient in clinical doses. No fillers. No compromises. Just pure performance
            backed by research.
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {ingredientsToShow.map((ingredient) => (
            <div
              key={ingredient.id}
              className="group bg-gradient-to-b from-gray-900 to-gray-950 p-6 border border-gray-800 hover:border-blue-600/50 transition-all duration-300 rounded-xl relative overflow-hidden hover:transform hover:-translate-y-1"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Header with icon and category */}
                <div className="flex items-start justify-between mb-4">
                  <CheckCircle size={24} className="text-blue-500 flex-shrink-0 mt-1" />
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${getCategoryColor(ingredient.category)}`}
                  >
                    {ingredient.category.charAt(0).toUpperCase() + ingredient.category.slice(1)}
                  </span>
                </div>

                {/* Ingredient name and amount */}
                <div className="mb-3">
                  <h3 className="font-bold text-lg text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
                    {ingredient.name}
                  </h3>
                  <span className="text-blue-400 font-mono text-xl font-bold">
                    {ingredient.amount}
                  </span>
                </div>

                {/* Benefit description */}
                <p className="text-gray-400 text-sm leading-relaxed">{ingredient.benefit}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl border border-gray-800">
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FlaskConical size={32} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Clinical Doses</h3>
            <p className="text-gray-400 text-sm">
              Research-backed amounts for maximum effectiveness
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl border border-gray-800">
            <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Third-Party Tested</h3>
            <p className="text-gray-400 text-sm">Verified purity and potency in every batch</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl border border-gray-800">
            <div className="w-16 h-16 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} className="text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Fillers</h3>
            <p className="text-gray-400 text-sm">Pure ingredients, no unnecessary additives</p>
          </div>
        </div>

        {/* Certificate Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 border border-gray-700 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">THIRD-PARTY TESTED</h3>
                <p className="text-gray-400 leading-relaxed">
                  Every batch is rigorously tested for purity and potency. No banned substances.
                  Certified clean for competitive athletes.
                </p>
              </div>
            </div>
            <a
              href="#"
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-8 py-4 text-white font-bold text-center transition-all duration-300 rounded-lg shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 whitespace-nowrap"
            >
              VIEW CERTIFICATE
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
