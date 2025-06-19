import React from 'react'
import { Star, Quote } from 'lucide-react'

export function Testimonials() {
  // Hardkodede testimonials (som du ville ha det)
  const testimonials = [
    {
      id: '1',
      name: 'Alex K.',
      role: 'CrossFit Athlete',
      quote:
        "BorzFuel has transformed my training. The focus and energy are unmatched - I'm hitting PRs I never thought possible.",
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '2',
      name: 'Sarah M.',
      role: 'Powerlifter',
      quote:
        "Finally a pre-workout that delivers what it promises. The pump is insane and I can push through plateaus like they're nothing.",
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1594736797933-d0800ba86d7d?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '3',
      name: 'Derek W.',
      role: 'MMA Fighter',
      quote:
        "I've tried dozens of pre-workouts. Nothing comes close to the intensity BorzFuel gives me. It's like unlocking beast mode.",
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=100&h=100&fit=crop&crop=face',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            THE PACK{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
              DOESN'T LIE
            </span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Join the elite athletes who have unleashed their inner Borz. Real results from real
            warriors.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-gradient-to-b from-gray-900 to-gray-950 p-8 border border-gray-800 hover:border-blue-600/50 transition-all duration-300 rounded-xl relative overflow-hidden hover:transform hover:-translate-y-2"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-20">
                <Quote size={32} className="text-blue-500" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#3b82f6" color="#3b82f6" className="mr-1" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-200 italic mb-8 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Profile */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-blue-500 font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-blue-400 text-sm font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <div className="text-4xl font-bold text-blue-500 mb-2">4.9</div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#3b82f6" color="#3b82f6" className="mr-1" />
              ))}
            </div>
            <p className="text-gray-400 text-sm">Average Rating</p>
          </div>

          <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <div className="text-4xl font-bold text-blue-500 mb-2">500+</div>
            <p className="text-gray-400 text-sm">Verified Reviews</p>
          </div>

          <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <div className="text-4xl font-bold text-blue-500 mb-2">97%</div>
            <p className="text-gray-400 text-sm">Would Recommend</p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-4 rounded-full border border-gray-700">
            <Star size={20} fill="#3b82f6" color="#3b82f6" className="mr-2" />
            <span className="text-white font-medium mr-2">Trusted by</span>
            <span className="text-blue-500 font-bold">1000+ athletes</span>
            <span className="text-white font-medium ml-2">worldwide</span>
          </div>
        </div>
      </div>
    </section>
  )
}
