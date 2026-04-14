import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Clock, Package, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: Users,
    value: 150,
    suffix: '+',
    label: 'Partner Manufacturers',
    description: 'Direct relationships with top Chinese factories'
  },
  {
    icon: Clock,
    value: 24,
    suffix: '/7',
    label: 'Customer Support',
    description: 'Round-the-clock assistance worldwide'
  },
  {
    icon: Package,
    value: 5000,
    suffix: '+',
    label: 'Units Delivered',
    description: 'Successfully shipped to 80+ countries'
  },
  {
    icon: Award,
    value: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Based on post-delivery surveys'
  }
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= value) {
                setCount(value);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, duration / steps);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={counterRef} className="text-5xl lg:text-6xl font-bold text-[#f2c500]">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entrance animation
      gsap.fromTo(cardsRef.current?.querySelectorAll('.stat-card') || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Icon SVG draw animation
      const icons = cardsRef.current?.querySelectorAll('.stat-icon');
      icons?.forEach((icon) => {
        gsap.fromTo(icon,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: icon,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="stats"
      className="relative w-full py-20 lg:py-32 bg-[#1a1a1a] grain-overlay"
    >
      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#f2c500] font-semibold text-sm tracking-wider uppercase mb-4">
            Our Impact
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            TRUSTED BY <span className="text-[#f2c500]">INDUSTRY LEADERS</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div 
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-card group relative p-8 rounded-sm backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#f2c500]/50 transition-all duration-500"
            >
              {/* Icon */}
              <div className="stat-icon mb-6">
                <stat.icon className="w-12 h-12 text-[#f2c500] breathe" strokeWidth={1.5} />
              </div>

              {/* Counter */}
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />

              {/* Label */}
              <h3 className="text-xl font-bold text-white mt-2 mb-2">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm">
                {stat.description}
              </p>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#f2c500]/0 group-hover:border-[#f2c500] transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#f2c500]/0 group-hover:border-[#f2c500] transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Join hundreds of satisfied clients worldwide
          </p>
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-[#f2c500] text-black font-semibold rounded-sm hover:bg-[#d4a700] transition-colors duration-300">
            Start Your Project
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
