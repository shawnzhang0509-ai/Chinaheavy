import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Globe, Wrench, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Rigorous inspection and certification for every unit'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Shipping to 80+ countries worldwide'
  },
  {
    icon: Wrench,
    title: 'Full Support',
    description: 'Complete after-sales service and spare parts'
  },
  {
    icon: TrendingUp,
    title: 'Competitive Pricing',
    description: 'Direct factory connections for best rates'
  }
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(imageRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current?.querySelectorAll('.animate-item') || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Features animation
      gsap.fromTo(featuresRef.current?.querySelectorAll('.feature-card') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Image parallax
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const img = imageRef.current?.querySelector('img');
          if (img) {
            gsap.set(img, { objectPosition: `50% ${self.progress * 20}%` });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative w-full py-20 lg:py-32 bg-white"
    >
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <span className="animate-item inline-block text-[#f2c500] font-semibold text-sm tracking-wider uppercase mb-4">
              About Us
            </span>
            
            <h2 className="animate-item text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
              BRIDGING CHINA'S<br />
              <span className="text-[#f2c500]">INDUSTRIAL EXCELLENCE</span><br />
              TO THE WORLD
            </h2>
            
            <p className="animate-item text-lg text-gray-600 mb-6 leading-relaxed">
              At China Heavy Equipment Solutions, we specialize in connecting global businesses with China's premier heavy machinery manufacturers. With over 15 years of experience, we've built a reputation for reliability, quality, and exceptional service.
            </p>
            
            <p className="animate-item text-lg text-gray-600 mb-8 leading-relaxed">
              From excavators and bulldozers to diesel engines and complete production lines, we source, inspect, and deliver equipment that meets the highest international standards. Our team of experts ensures every transaction is smooth, from initial inquiry to final delivery.
            </p>

            <div className="animate-item flex flex-wrap gap-4">
              <div className="px-6 py-3 bg-[#f9f9f9] rounded-sm">
                <span className="block text-3xl font-bold text-[#f2c500]">15+</span>
                <span className="text-sm text-gray-600">Years Experience</span>
              </div>
              <div className="px-6 py-3 bg-[#f9f9f9] rounded-sm">
                <span className="block text-3xl font-bold text-[#f2c500]">5000+</span>
                <span className="text-sm text-gray-600">Units Delivered</span>
              </div>
              <div className="px-6 py-3 bg-[#f9f9f9] rounded-sm">
                <span className="block text-3xl font-bold text-[#f2c500]">80+</span>
                <span className="text-sm text-gray-600">Countries Served</span>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div ref={imageRef} className="order-1 lg:order-2 relative">
            <div className="relative overflow-hidden rounded-sm shadow-2xl">
              <img 
                src="/about-truck.jpg" 
                alt="Heavy mining truck"
                className="w-full h-[400px] lg:h-[600px] object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 bg-[#f2c500] px-6 py-3 rounded-sm">
                <span className="text-black font-bold text-lg">Trusted Partner</span>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-[#f2c500] rounded-sm -z-10" />
          </div>
        </div>

        {/* Features Grid */}
        <div ref={featuresRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card group p-6 bg-[#f9f9f9] rounded-sm hover:bg-black transition-colors duration-300"
            >
              <feature.icon className="w-10 h-10 text-[#f2c500] mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-black group-hover:text-white mb-2 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
