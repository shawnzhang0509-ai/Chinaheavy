import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal with glitch effect simulation
      const title = contentRef.current?.querySelector('h2');
      if (title) {
        gsap.fromTo(title,
          { 
            opacity: 0,
            clipPath: 'inset(0 100% 0 0)'
          },
          {
            opacity: 1,
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.5,
            ease: 'steps(5)',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      gsap.fromTo(contentRef.current?.querySelectorAll('.animate-item') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Form entrance
      gsap.fromTo(formRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your inquiry! We will contact you within 24 hours.');
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative w-full py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/cta-bg.jpg"
          alt="Construction site"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div ref={contentRef}>
            <span className="animate-item inline-block text-[#f2c500] font-semibold text-sm tracking-wider uppercase mb-4">
              Get In Touch
            </span>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              READY TO <span className="text-[#f2c500]">POWER</span><br />
              YOUR PROJECTS?
            </h2>
            
            <p className="animate-item text-lg text-white/80 mb-8 leading-relaxed">
              Whether you need a single machine or a complete fleet, our team is ready to help you find the perfect equipment solution. Contact us today for a free consultation and quote.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="animate-item flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f2c500] rounded-sm flex items-center justify-center">
                  <Mail className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email Us</p>
                  <p className="text-white font-semibold">contact@chinaheavyequip.com</p>
                </div>
              </div>

              <div className="animate-item flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f2c500] rounded-sm flex items-center justify-center">
                  <Phone className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Call Us</p>
                  <p className="text-white font-semibold">+86 21 8888 8888</p>
                </div>
              </div>

              <div className="animate-item flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f2c500] rounded-sm flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Visit Us</p>
                  <p className="text-white font-semibold">Shanghai, China</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md rounded-sm p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Request a Quote
            </h3>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">First Name</label>
                  <input 
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/50 focus:outline-none focus:border-[#f2c500] transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Last Name</label>
                  <input 
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/50 focus:outline-none focus:border-[#f2c500] transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Email</label>
                <input 
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/50 focus:outline-none focus:border-[#f2c500] transition-colors"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Company</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/50 focus:outline-none focus:border-[#f2c500] transition-colors"
                  placeholder="Your Company Name"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Equipment Needed</label>
                <select 
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white focus:outline-none focus:border-[#f2c500] transition-colors"
                >
                  <option value="" className="text-black">Select Equipment Type</option>
                  <option value="excavator" className="text-black">Excavators</option>
                  <option value="bulldozer" className="text-black">Bulldozers</option>
                  <option value="crane" className="text-black">Cranes</option>
                  <option value="loader" className="text-black">Wheel Loaders</option>
                  <option value="engine" className="text-black">Diesel Engines</option>
                  <option value="roller" className="text-black">Road Rollers</option>
                  <option value="other" className="text-black">Other / Multiple</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/50 focus:outline-none focus:border-[#f2c500] transition-colors resize-none"
                  placeholder="Tell us about your project requirements..."
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#f2c500] text-black font-bold text-lg rounded-sm hover:bg-[#d4a700] transition-colors duration-300 flex items-center justify-center gap-2 group"
              >
                Submit Inquiry
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
