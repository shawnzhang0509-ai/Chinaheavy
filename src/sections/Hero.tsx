import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(imageRef.current, { scale: 1.2, filter: 'blur(10px)' });
      gsap.set(titleRef.current?.querySelectorAll('.char') || [], { y: '100%', opacity: 0 });
      gsap.set(subtitleRef.current, { x: -50, opacity: 0 });
      gsap.set(btnRef.current, { scale: 0 });

      // Entry timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(imageRef.current, {
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out'
      })
      .to(titleRef.current?.querySelectorAll('.char') || [], {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out'
      }, '-=0.8')
      .to(subtitleRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .to(btnRef.current, {
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
      }, '-=0.3');

      // Scroll parallax
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (contentRef.current) {
            gsap.set(contentRef.current, { y: self.progress * 300 });
          }
          if (imageRef.current) {
            gsap.set(imageRef.current, { y: self.progress * 100 });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split title into characters
  const titleText = 'CHINA HEAVY';
  const titleChars = titleText.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image Layer */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full slow-zoom"
      >
        <img 
          src="/hero-bg.jpg" 
          alt="Heavy machinery at construction site"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content Layer */}
      <div 
        ref={contentRef}
        className="relative z-10 h-full flex items-center"
      >
        <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
          <div className="max-w-3xl">
            {/* Main Title */}
            <h1 
              ref={titleRef}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none mb-4 overflow-hidden"
            >
              {titleChars}
            </h1>
            
            {/* Subtitle */}
            <p 
              ref={subtitleRef}
              className="text-lg sm:text-xl md:text-2xl text-white/90 font-light mb-8 max-w-xl"
            >
              Your trusted partner for excavators, bulldozers, cranes, diesel engines, and complete production lines from China's top manufacturers.
            </p>

            {/* CTA Button */}
            <button
              ref={btnRef}
              onClick={scrollToProducts}
              className="group magnetic-btn pulse-glow inline-flex items-center gap-3 px-8 py-4 bg-[#f2c500] text-black font-semibold text-lg rounded-sm hover:bg-[#d4a700] transition-colors duration-300"
            >
              Explore Solutions
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}
