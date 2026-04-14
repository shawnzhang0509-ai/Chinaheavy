import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'Equipment Sales',
    description: 'Direct access to China\'s top manufacturers. We source new and refurbished heavy machinery tailored to your specifications and budget.',
    image: '/service-sales.jpg',
    icon: '01'
  },
  {
    id: 2,
    title: 'Custom Solutions',
    description: 'From modifications to complete production line design, we create bespoke solutions that match your unique operational requirements.',
    image: '/hero-bg.jpg',
    icon: '02'
  },
  {
    id: 3,
    title: 'Global Logistics',
    description: 'End-to-end shipping and customs clearance. We handle all documentation, packaging, and transportation to your destination.',
    image: '/service-logistics.jpg',
    icon: '03'
  },
  {
    id: 4,
    title: 'After-Sales Support',
    description: 'Comprehensive warranty, spare parts supply, and technical support to keep your equipment running at peak performance.',
    image: '/service-support.jpg',
    icon: '04'
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

      // Accordion panels slide up
      gsap.fromTo(accordionRef.current?.querySelectorAll('.service-panel') || [],
        { y: '100%' },
        {
          y: '0%',
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: accordionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="services"
      className="relative w-full py-20 lg:py-32 bg-white"
    >
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="animate-item inline-block text-[#f2c500] font-semibold text-sm tracking-wider uppercase mb-4">
            What We Offer
          </span>
          <h2 className="animate-item text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
            OUR <span className="text-[#f2c500]">SERVICES</span>
          </h2>
          <p className="animate-item text-lg text-gray-600 max-w-2xl mx-auto">
            From sourcing to delivery and beyond, we provide comprehensive solutions 
            for all your heavy equipment needs.
          </p>
        </div>

        {/* Interactive Accordion */}
        <div 
          ref={accordionRef}
          className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px]"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-panel relative overflow-hidden rounded-sm cursor-pointer transition-all duration-500 ease-out
                ${activeIndex === index ? 'lg:flex-[2]' : 'lg:flex-1'}
                ${activeIndex !== null && activeIndex !== index ? 'lg:flex-[0.5]' : ''}
              `}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={service.image}
                  alt={service.title}
                  className={`w-full h-full object-cover transition-transform duration-700
                    ${activeIndex === index ? 'scale-100' : 'scale-110'}
                  `}
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 transition-opacity duration-500
                  ${activeIndex === index 
                    ? 'bg-gradient-to-t from-black/90 via-black/50 to-transparent' 
                    : 'bg-gradient-to-t from-black/80 via-black/60 to-black/40'}
                `} />
              </div>

              {/* Content */}
              <div className="relative h-full min-h-[300px] lg:min-h-0 p-6 lg:p-8 flex flex-col justify-end">
                {/* Number */}
                <span className={`text-6xl lg:text-8xl font-bold text-white/20 absolute top-4 right-4 transition-all duration-500
                  ${activeIndex === index ? 'opacity-100' : 'opacity-50'}
                `}>
                  {service.icon}
                </span>

                {/* Title - Vertical when collapsed on desktop */}
                <h3 className={`text-2xl lg:text-3xl font-bold text-white mb-4 transition-all duration-500
                  ${activeIndex === index || activeIndex === null ? '' : 'lg:writing-mode-vertical'}
                `}
                style={{ writingMode: (activeIndex !== null && activeIndex !== index) ? 'vertical-rl' : 'horizontal-tb' }}
                >
                  {service.title}
                </h3>

                {/* Description - Only visible when active */}
                <div className={`overflow-hidden transition-all duration-500
                  ${activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 lg:max-h-0'}
                `}>
                  <p className="text-white/90 text-lg leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <button className="inline-flex items-center gap-2 text-[#f2c500] font-semibold hover:gap-3 transition-all duration-300">
                    Learn More
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
