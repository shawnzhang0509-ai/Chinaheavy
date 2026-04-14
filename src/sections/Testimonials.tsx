import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Michael Richardson',
    position: 'Operations Director',
    company: 'Atlas Construction Group',
    location: 'Australia',
    avatar: '/avatar-1.jpg',
    quote: 'China Heavy Equipment Solutions has been our go-to supplier for over 5 years. Their attention to quality and seamless logistics have saved us both time and money. The excavators we purchased exceeded our expectations in performance and reliability.'
  },
  {
    id: 2,
    name: 'James Okafor',
    position: 'Project Manager',
    company: 'West African Mining Corp',
    location: 'Nigeria',
    avatar: '/avatar-2.jpg',
    quote: 'Working with CHES transformed our mining operations. They sourced custom bulldozers that perfectly matched our terrain requirements. The after-sales support is exceptional - spare parts arrive within days, not weeks.'
  },
  {
    id: 3,
    name: 'Sarah Chen',
    position: 'Procurement Head',
    company: 'Pacific Infrastructure Ltd',
    location: 'Singapore',
    avatar: '/avatar-3.jpg',
    quote: 'The team at CHES understands international business. They handled all certifications and customs documentation flawlessly. Our complete production line was delivered on schedule and is running at 98% efficiency.'
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

      // Slider entrance
      gsap.fromTo(sliderRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sliderRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);

    const slides = sliderRef.current?.querySelectorAll('.testimonial-slide');
    if (!slides) return;

    // Animate out current
    gsap.to(slides[currentIndex], {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: 'power2.in'
    });

    // Animate in new
    setCurrentIndex(index);
    gsap.fromTo(slides[index],
      { opacity: 0, scale: 1.1 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: 0.3,
        ease: 'power2.out',
        onComplete: () => setIsAnimating(false)
      }
    );
  };

  const nextSlide = () => {
    const next = (currentIndex + 1) % testimonials.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
    goToSlide(prev);
  };

  return (
    <section 
      ref={sectionRef}
      id="testimonials"
      className="relative w-full py-20 lg:py-32 bg-[#f9f9f9]"
    >
      <div className="w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="animate-item inline-block text-[#f2c500] font-semibold text-sm tracking-wider uppercase mb-4">
            Testimonials
          </span>
          <h2 className="animate-item text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
            WHAT OUR <span className="text-[#f2c500]">CLIENTS SAY</span>
          </h2>
        </div>

        {/* Testimonial Slider */}
        <div ref={sliderRef} className="relative max-w-4xl mx-auto">
          {/* Slides Container */}
          <div className="relative min-h-[400px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-slide absolute inset-0 transition-all duration-500
                  ${index === currentIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-90 z-0'}
                `}
              >
                <div className="bg-white rounded-sm shadow-xl p-8 lg:p-12">
                  {/* Quote Icon */}
                  <Quote className="w-12 h-12 text-[#f2c500] mb-6" />

                  {/* Quote Text */}
                  <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-black">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600">
                        {testimonial.position}, {testimonial.company}
                      </p>
                      <p className="text-sm text-[#f2c500]">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#f2c500] hover:text-black transition-colors duration-300 disabled:opacity-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300
                    ${index === currentIndex 
                      ? 'bg-[#f2c500] w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'}
                  `}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#f2c500] hover:text-black transition-colors duration-300 disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
