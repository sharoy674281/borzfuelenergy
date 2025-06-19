import React from 'react';
import { Zap, Target, Battery, Brain, Shield, Award, ArrowRight } from 'lucide-react';
import { Benefit } from '../lib/api';

interface ProductBenefitsProps {
  benefits: Benefit[];
}

// Icon mapping
const iconMap = {
  zap: Zap,
  target: Target,
  battery: Battery,
  brain: Brain,
  shield: Shield,
  award: Award,
};

export function ProductBenefits({ benefits }: ProductBenefitsProps) {
  // Bruk Payload data hvis det finnes, ellers fallback
  const benefitsToShow = benefits && benefits.length > 0 ? benefits : [
    {
      id: '1',
      title: 'EXPLOSIVE ENERGY',
      description: 'Scientifically formulated to deliver sustained energy without the crash. Dominate every rep, every set, every workout.',
      highlight: '300mg Caffeine',
      icon: 'zap' as const
    },
    {
      id: '2',
      title: 'LASER FOCUS',
      description: 'Enhanced cognitive performance to lock in and attack your goals with predator-like intensity and concentration.',
      highlight: 'Alpha-GPC + Tyrosine',
      icon: 'target' as const
    },
    {
      id: '3',
      title: 'EXTENDED ENDURANCE',
      description: 'Push past your limits with improved stamina and delayed fatigue. Go harder for longer with every scoop.',
      highlight: '6g Citrulline Malate',
      icon: 'battery' as const
    },
    {
      id: '4',
      title: 'MIND-MUSCLE CONNECTION',
      description: 'Advanced nootropics create the ultimate neural pathway for maximum muscle recruitment and growth.',
      highlight: 'Nootropic Blend',
      icon: 'brain' as const
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-gradient-to-b from-gray-950 to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            UNLEASH YOUR{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
              FULL POTENTIAL
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            BorzFuel is engineered for those who refuse to be average. For the
            hunters, not the hunted. Experience the difference that clinical dosing makes.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefitsToShow.map((benefit) => {
            const IconComponent = iconMap[benefit.icon] || Zap;
            
            return (
              <div 
                key={benefit.id}
                className="group bg-gradient-to-b from-gray-950 to-gray-900 p-8 border border-gray-800 hover:border-blue-600/50 hover:transform hover:-translate-y-2 transition-all duration-300 rounded-xl relative overflow-hidden"
              >
                {/* Background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-6 p-3 bg-gray-800/50 rounded-lg w-fit group-hover:bg-blue-600/20 transition-colors duration-300">
                    <IconComponent size={32} className="text-blue-500" />
                  </div>
                  {benefit.highlight && (
                    <span className="text-blue-400 text-sm font-bold tracking-wider mb-2 block">
                      {benefit.highlight}
                    </span>
                  )}
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
                
                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight size={16} className="text-blue-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="mb-6">
            <p className="text-gray-400 mb-2">Ready to join the pack?</p>
            <p className="text-2xl font-bold text-white">
              <span className="text-blue-500">97%</span> of athletes report improved performance
            </p>
          </div>
          <a 
            href="#buy" 
            className="group bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-10 py-5 text-white font-bold inline-flex items-center transition-all duration-300 rounded-lg shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
          >
            CLAIM YOUR POWER
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}