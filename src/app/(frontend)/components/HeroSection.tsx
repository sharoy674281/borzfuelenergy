import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Product } from '../lib/api'

interface HeroSectionProps {
  product?: Product | null
}

export function HeroSection({ product }: HeroSectionProps) {
  // Fallback hvis ingen produktdata
  const productImage = product?.image?.url
   || '/pwo mock eks bilde.png'
   console.log(productImage);
  const productImageAlt = product?.image?.alt || 'BorzFuel Pre-Workout Supplement'
  const productName = product?.name || 'BORZFUEL'

  return (
    <section
      id="product"
      className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden bg-gradient-to-b from-black to-gray-950"
    >
      {/* Lightning Pattern Background */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="bolt-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="60%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g>
            {/* Aggressive, sharp, glowing lightning */}
            <path
              d="M30 5 L50 40 L38 42 L60 80 L45 85"
              stroke="url(#bolt-gradient)"
              strokeWidth="0.9"
              fill="none"
              filter="url(#glow)"
              opacity="0.95"
            />
            <path
              d="M100 0 L120 35 L110 38 L135 80 L120 95"
              stroke="url(#bolt-gradient)"
              strokeWidth="1"
              fill="none"
              filter="url(#glow)"
              opacity="0.9"
            />
            <path
              d="M170 10 L185 50 L175 55 L195 90 L180 98"
              stroke="url(#bolt-gradient)"
              strokeWidth="1"
              fill="none"
              filter="url(#glow)"
              opacity="0.9"
            />
            {/* Extra thin, jagged background bolts */}
            <path
              d="M60 60 L70 80 L65 85 L80 95"
              stroke="#93c5fd"
              strokeWidth="0.5"
              fill="none"
              filter="url(#glow)"
              opacity="0.35"
            />
            <path
              d="M130 45 L140 65 L135 70 L150 80"
              stroke="#93c5fd"
              strokeWidth="0.5"
              fill="none"
              filter="url(#glow)"
              opacity="0.35"
            />
          </g>
        </svg>
      </div>

      {/* Wolf Claw Marks Effect */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-30 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="claw1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="60%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="claw2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
            <linearGradient id="claw3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <filter id="claw-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Aggressive, sharp, glowing claw marks */}
          <path
            d="M85 10 Q90 40 75 80 Q73 90 85 99"
            stroke="url(#claw1)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            filter="url(#claw-glow)"
            opacity="0.95"
          />
          <path
            d="M70 18 Q78 50 62 85 Q61 95 73 99"
            stroke="url(#claw2)"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            filter="url(#claw-glow)"
            opacity="0.85"
          />
          <path
            d="M55 25 Q65 60 50 92 Q49 98 61 99"
            stroke="url(#claw3)"
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
            filter="url(#claw-glow)"
            opacity="0.8"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="mb-4">
              <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 py-1 text-sm font-bold tracking-wider mb-3 rounded-md">
                PREMIUM PRE-WORKOUT
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                UNLEASH THE{' '}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                  BORZ
                </span>{' '}
                IN YOU
              </h1>
              <p className="text-gray-400 text-lg mb-8 max-w-lg">
                Dominate your workouts with the most powerful pre-workout
                formula designed for peak performance, extreme focus and savage
                intensity.
              </p>
            </div>

            {/* Mobile: Product Image between text and buttons */}
            <div className="md:hidden mb-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <div
                    className="w-[80%] h-[80%] rounded-full blur-2xl opacity-60"
                    style={{
                      background: 'radial-gradient(circle at 60% 40%, #181f2f 60%, #1e293b 100%)',
                      boxShadow: '0 0 80px 20px #1e40af, 0 0 0 0 #000'
                    }}
                  />
                </div>
                <div className="relative z-10">
                  <img
                    src={productImage}
                    alt={productImageAlt}
                    className="mx-auto max-h-[400px] drop-shadow-2xl"
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 font-bold transform rotate-12 z-20">
                  NEW FORMULA
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#buy"
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-8 py-4 text-white font-bold text-center transition-colors rounded-md flex items-center justify-center"
              >
                BUY NOW <ArrowRight className="ml-2" size={20} />
              </a>
              <a
                href="#ingredients"
                className="border border-white hover:bg-white hover:text-black px-8 py-4 text-white font-bold text-center transition-colors rounded-md"
              >
                INGREDIENTS
              </a>
            </div>
            
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gray-800 border-2 border-black"
                  ></div>
                ))}
              </div>
              <div className="ml-4">
                <div className="text-sm text-gray-400">Trusted by</div>
                <div className="text-white font-bold">1000+ Athletes</div>
              </div>
            </div>
          </div>

          {/* Desktop: Product Image on right side */}
          <div className="md:w-1/2 relative hidden md:block">
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div
                className="w-[80%] h-[80%] rounded-full blur-2xl opacity-60"
                style={{
                  background: 'radial-gradient(circle at 60% 40%, #181f2f 60%, #1e293b 100%)',
                  boxShadow: '0 0 80px 20px #1e40af, 0 0 0 0 #000'
                }}
              />
            </div>
            <div className="relative z-10">
              <img
                src={productImage}
                alt={productImageAlt}
                className="mx-auto max-h-[600px] drop-shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 font-bold transform rotate-12 z-20">
              NEW FORMULA
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}