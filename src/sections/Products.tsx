import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: 'Hydraulic Excavators',
    description: '20-80 ton capacity, crawler and wheeled options',
    image: '/product-excavator.jpg',
    specs: ['20-80 Ton', 'Crawler/Wheeled', 'Tier 4 Engine']
  },
  {
    id: 2,
    name: 'Bulldozers',
    description: 'High-power dozers for mining and construction',
    image: '/product-bulldozer.jpg',
    specs: ['230-850 HP', 'Crawler Type', 'Ripper Option']
  },
  {
    id: 3,
    name: 'Mobile Cranes',
    description: 'All-terrain and truck-mounted cranes',
    image: '/product-crane.jpg',
    specs: ['25-500 Ton', 'All-Terrain', 'Telescopic Boom']
  },
  {
    id: 4,
    name: 'Wheel Loaders',
    description: 'Front-end loaders for material handling',
    image: '/product-loader.jpg',
    specs: ['3-12 Ton', 'Articulated', 'Quick Coupler']
  },
  {
    id: 5,
    name: 'Diesel Engines',
    description: 'Industrial power units for various applications',
    image: '/product-engine.jpg',
    specs: ['100-2000 HP', 'Water Cooled', 'EPA Certified']
  },
  {
    id: 6,
    name: 'Road Rollers',
    description: 'Compaction equipment for road construction',
    image: '/product-roller.jpg',
    specs: ['10-20 Ton', 'Single/Double Drum', 'Vibration']
  }
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current?.querySelectorAll('.animate-item') || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards 3D flip animation
      const cards = gridRef.current?.querySelectorAll('.product-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(card,
          { 
            rotateX: 45, 
            y: 100, 
            opacity: 0,
            transformPerspective: 1000
          },
          {
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Grid skew on scroll
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const skewAmount = self.getVelocity() / 500;
          gsap.to(gridRef.current, {
            skewX: Math.max(-2, Math.min(2, skewAmount)),
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="products"
      className="relative w-full py-20 lg:py-32 bg-[#f9f9f9]"
    >
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="animate-item inline-block text-[#f2c500] font-semibold text-sm tracking-wider uppercase mb-4">
            Our Products
          </span>
          <h2 className="animate-item text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
            PREMIUM <span className="text-[#f2c500]">EQUIPMENT</span>
          </h2>
          <p className="animate-item text-lg text-gray-600 max-w-2xl mx-auto">
            We source and supply a comprehensive range of heavy machinery from China's leading manufacturers, 
            ensuring quality, reliability, and competitive pricing.
          </p>
        </div>

        {/* Products Grid */}
        <div 
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: '1000px' }}
        >
          {products.map((product) => (
            <div 
              key={product.id}
              className="product-card group relative bg-white rounded-sm overflow-hidden shadow-lg card-lift cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-white">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 img-zoom"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="w-5 h-5 text-[#f2c500] group-hover:rotate-180 transition-transform duration-500" />
                  <h3 className="text-xl font-bold text-black group-hover:text-[#f2c500] transition-colors duration-300">
                    {product.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>

                {/* Specs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.specs.map((spec, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-[#f9f9f9] text-sm text-gray-700 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button className="inline-flex items-center gap-2 text-black font-semibold group-hover:text-[#f2c500] transition-colors duration-300">
                  Get Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-semibold rounded-sm hover:bg-[#f2c500] hover:text-black transition-colors duration-300">
            View All Products
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
