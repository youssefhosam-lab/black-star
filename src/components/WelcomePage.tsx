import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../App';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';

// Star Icon Component (minimal, used sparingly)
const StarIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 224 184" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M143.719 110.121C156.233 101.407 171.96 95.7044 189.287 94.385L223.521 91.7763L189.287 89.1675C171.96 87.8479 156.243 82.1452 143.719 73.4316L190.782 26.8837L134.096 65.5295C123.485 55.2537 116.54 42.339 114.933 28.1123L111.756 4.76837e-07L108.579 28.1123C106.972 42.339 100.027 55.2461 89.416 65.5295L32.7299 26.8837L79.7927 73.4316C67.2789 82.1452 51.5514 87.8479 34.2351 89.1675L1.04308e-07 91.7763L34.2351 94.385C51.5607 95.7044 67.2789 101.415 79.7927 110.121L32.7299 156.669L89.416 118.023C100.027 128.299 106.972 141.214 108.579 155.433L111.756 183.545L114.933 155.433C116.54 141.206 123.494 128.299 134.096 118.023L190.782 156.669L143.719 110.121Z" 
      fill="currentColor"
    />
  </svg>
);

// Typing Animation Component
const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay + (currentIndex * 10)); // 10ms per character
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <>{displayedText}</>;
};

// Header Component
const Header = () => {
  const { navigate } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white border-b border-black/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <StarIcon className="w-6 h-6 text-black" />
          <span className="tracking-wider uppercase text-sm font-medium">Black Star</span>
        </div>

        {/* Center - Navigation */}
        <div className="hidden sm:flex items-center gap-6">
          <button
            onClick={() => navigate('welcome')}
            className="text-sm text-black relative"
          >
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>
          </button>
          <button
            onClick={() => navigate('about')}
            className="text-sm text-black relative group"
          >
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('login')}
            className="text-sm hover:opacity-60 transition-opacity px-2 py-1"
          >
            Log in
          </button>
          <button
            onClick={() => navigate('register')}
            className="text-sm px-5 py-2.5 border border-black hover:bg-black hover:text-white transition-all duration-300"
          >
            Sign up
          </button>
        </div>
      </div>
    </motion.header>
  );
};

// Hero Section
const Hero = () => {
  const { navigate } = useApp();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 50,
      y: (e.clientY - rect.top - rect.height / 2) / 50,
    });
  };

  const scrollToRoles = () => {
    document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-[#fafafa] flex items-center py-24 lg:py-32" onMouseMove={handleMouseMove}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Headline with Typing Animation */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight"
            >
              <TypingText text="Fashion without illusion" delay={300} />
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-base sm:text-lg lg:text-xl text-black/70 max-w-xl leading-relaxed"
            >
              A single platform connecting customers, local brands, manufacturers, and models — with clarity, ownership, and control.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <button
                onClick={scrollToRoles}
                className="group px-7 py-3.5 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 text-sm uppercase tracking-wider"
              >
                Explore the platform
              </button>
              <button
                onClick={() => navigate('about-us')}
                className="text-sm uppercase tracking-wider hover:opacity-60 transition-opacity underline px-2 py-3.5"
              >
                Learn why we built Black Star
              </button>
            </motion.div>
          </div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative h-[350px] md:h-[400px] flex items-center justify-center"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            {/* Subtle abstract star geometry */}
            <div className="relative w-56 h-56 md:w-64 md:h-64">
              <StarIcon className="w-full h-full text-black/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-44 h-44 md:w-48 md:h-48 border border-black/5 rotate-45 bg-[rgba(0,0,0,0)]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Why Black Star Section
const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollY } = useScroll();
  const { navigate } = useApp();
  
  // Very subtle parallax for star icon (10-15px max)
  const starY = useTransform(scrollY, [0, 1000], [0, 15]);

  return (
    <section ref={ref} className="min-h-screen bg-[#fafafa] flex items-center py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <div className="space-y-8 lg:space-y-10">
            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.2] tracking-tight"
            >
              Black Star is on a mission<br />
              to clear the fog that surrounds<br />
              the fashion industry.
            </motion.h2>

            {/* Supporting Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="space-y-5 text-base sm:text-lg lg:text-xl text-black/70 leading-relaxed max-w-xl"
            >
              <p>
                For too long, fashion has been built on noise — hidden processes, unclear ownership, and illusion over craft.
              </p>
              <p>
                Black Star exists to bring clarity back. To connect creators, manufacturers, and talent through transparency, accountability, and real work.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <button
                onClick={() => navigate('about-us')}
                className="px-7 py-3.5 border border-black hover:border-black/80 hover:bg-black/5 transition-all duration-300 text-sm uppercase tracking-wider"
              >
                Discover the mission
              </button>
            </motion.div>
          </div>

          {/* Right Column - Star Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <motion.div
              style={{ y: starY }}
              className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72"
            >
              <StarIcon className="w-full h-full text-black/90" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Role Card Component
const RoleCard = ({ 
  title, 
  description, 
  delay = 0,
  onClick
}: { 
  title: string; 
  description: string; 
  delay?: number;
  onClick?: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      onClick={onClick}
      className="group bg-white border border-black/20 rounded-lg p-6 lg:p-8 cursor-pointer hover:border-black hover:shadow-lg transition-all duration-300"
    >
      <h3 className="text-xl lg:text-2xl mb-3 lg:mb-4">{title}</h3>
      <p className="text-sm lg:text-base text-black/70 leading-relaxed">{description}</p>
    </motion.div>
  );
};

// Roles Section
const RolesSection = () => {
  const { navigate } = useApp();

  const roles = [
    {
      title: "Customer",
      description: "Design, order, and participate. Create custom pieces, join the customer community, and rate quality — not promises."
    },
    {
      title: "Local Brand",
      description: "Build your identity. Design professionally, manage production, hire models, and grow with real data."
    },
    {
      title: "Manufacturer",
      description: "Control production, not chaos. Manage fabrics, services, orders, and collaborate directly with other manufacturers."
    },
    {
      title: "Model",
      description: "Your work, your reputation. Showcase your portfolio, manage jobs, track income, and compete through ranking."
    }
  ];

  return (
    <section id="roles" className="min-h-screen bg-[#fafafa] py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-3">Roles</h2>
          <p className="text-base sm:text-lg lg:text-xl text-black/70">Choose who you are on the platform</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6 max-w-6xl mx-auto">
          {roles.map((role, index) => (
            <RoleCard
              key={role.title}
              title={role.title}
              description={role.description}
              delay={index * 0.1}
              onClick={() => navigate('register')}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorks = () => {
  const steps = [
    "Choose your role",
    "Design or select",
    "Connect production",
    "Track, rate, grow"
  ];

  return null;
};

// Trust Section
const TrustSection = () => {
  const points = [
    "Built for real production",
    "Clear roles, clear ownership",
    "Ratings based on work, not marketing",
    "No hidden steps"
  ];

  return null;
};

// Contact Section
const ContactSection = () => {
  const { navigate } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Customer', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', role: 'Customer', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="bg-[#fafafa] min-h-[600px] flex items-center relative py-16 lg:py-24 border-t border-[#e5e5e5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Mission + Links */}
          <div className="flex flex-col justify-between h-full space-y-12 lg:space-y-0">
            <div className="relative">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
               >
                  <p className="text-base lg:text-lg text-black mb-3">Black Star is not built for speed.</p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0b0b0b]">
                    It is built for clarity, accountability, and craft.
                  </h2>
               </motion.div>
               
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="mt-10 lg:mt-14"
               >
                 <button 
                   onClick={() => navigate('login')}
                   className="bg-[#0b0b0b] text-white px-8 py-4 text-base lg:text-lg hover:bg-black/90 transition-colors"
                 >
                   Enter the Platform
                 </button>
               </motion.div>
            </div>

            <div className="pt-12 lg:pt-20 border-t border-[#e5e5e5] flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-[#0b0b0b] gap-4">
              <div>© Black Star 2025</div>
              <div className="flex gap-5">
                <a href="#" className="hover:underline">Instagram</a>
                <a href="#" className="hover:underline">Twitter</a>
                <a href="#" className="hover:underline">LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            {/* Name */}
            <div className="group">
              <label className="block text-xs uppercase tracking-[1.2px] mb-3">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full pb-3 border-b border-[#e5e5e5] bg-transparent focus:border-black focus:outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-xs uppercase tracking-[1.2px] mb-3">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full pb-3 border-b border-[#e5e5e5] bg-transparent focus:border-black focus:outline-none transition-colors"
              />
            </div>

            {/* Role (Dropdown) */}
            <div className="group">
              <label className="block text-xs uppercase tracking-[1.2px] mb-3">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full pb-3 border-b border-[#e5e5e5] bg-transparent focus:border-black focus:outline-none transition-colors appearance-none rounded-none cursor-pointer"
              >
                <option value="Customer">Customer</option>
                <option value="Brand">Brand</option>
                <option value="Manufacturer">Manufacturer</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div className="group">
              <label className="block text-xs uppercase tracking-[1.2px] mb-3">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={3}
                className="w-full pb-3 border-b border-[#e5e5e5] bg-transparent focus:border-black focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={submitted}
                className="group flex items-center gap-2 text-sm font-bold uppercase tracking-[1.4px] hover:opacity-60 transition-opacity disabled:opacity-50"
              >
                {submitted ? 'Message Sent' : 'Contact us'}
                {!submitted && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-white border-t border-black/10 py-10 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <StarIcon className="w-5 h-5 text-black" />
            <span className="tracking-wider uppercase text-sm font-medium">Black Star</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 lg:gap-8 text-sm">
            <a href="#" className="hover:opacity-60 transition-opacity">About</a>
            <a href="#roles" className="hover:opacity-60 transition-opacity">Roles</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Contact</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Privacy</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Component
export function WelcomePage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <Hero />
      <WhySection />
      <RolesSection />
      <HowItWorks />
      <TrustSection />
      <ContactSection />
      <Footer />
    </div>
  );
}