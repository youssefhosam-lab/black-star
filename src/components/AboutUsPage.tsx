import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../App';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Lightbulb, Users, Target, Award } from 'lucide-react';

// Star Icon Component
const StarIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 224 184" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M143.719 110.121C156.233 101.407 171.96 95.7044 189.287 94.385L223.521 91.7763L189.287 89.1675C171.96 87.8479 156.243 82.1452 143.719 73.4316L190.782 26.8837L134.096 65.5295C123.485 55.2537 116.54 42.339 114.933 28.1123L111.756 4.76837e-07L108.579 28.1123C106.972 42.339 100.027 55.2461 89.416 65.5295L32.7299 26.8837L79.7927 73.4316C67.2789 82.1452 51.5514 87.8479 34.2351 89.1675L1.04308e-07 91.7763L34.2351 94.385C51.5607 95.7044 67.2789 101.415 79.7927 110.121L32.7299 156.669L89.416 118.023C100.027 128.299 106.972 141.214 108.579 155.433L111.756 183.545L114.933 155.433C116.54 141.206 123.494 128.299 134.096 118.023L190.782 156.669L143.719 110.121Z" 
      fill="currentColor"
    />
  </svg>
);

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
        isScrolled ? 'bg-white border-b border-black/10' : 'bg-white/95 backdrop-blur-sm border-b border-white/20'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => navigate('welcome')} className="flex items-center gap-2.5 hover:opacity-60 transition-opacity">
          <StarIcon className="w-6 h-6 text-black" />
          <span className="tracking-wider uppercase text-sm font-medium text-black">Black Star</span>
        </button>

        {/* Center - Navigation */}
        <div className="hidden sm:flex items-center gap-6">
          <button
            onClick={() => navigate('welcome')}
            className="text-sm text-black relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => navigate('about')}
            className="text-sm font-medium text-black relative"
          >
            About Us
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('login')}
            className="hidden sm:block text-sm hover:opacity-60 transition-opacity text-black"
          >
            Log In
          </button>
          <button
            onClick={() => navigate('register')}
            className="bg-black text-white px-5 py-2.5 text-sm font-medium hover:bg-black/80 transition-all hover:shadow-lg"
          >
            Sign Up
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export function AboutUsPage() {
  const { navigate } = useApp();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffffff] to-[#4a5565] via-50% via-[#e5e7eb] relative">
      <Header />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#E6C36A] opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#E6C36A] opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6 leading-tight">
                Where Fashion Ideas<br />Become Reality
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
                Black Star is a platform built to connect creativity, production, and opportunity within the fashion industry.
              </p>
              <p className="text-lg text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                Our platform brings together designers, local brands, manufacturers, and models into one connected ecosystem where ideas can move from concept to real products.
              </p>
              
              <motion.button
                onClick={() => navigate('register')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-black/80 transition-all hover:shadow-xl group"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-8 sm:p-12 shadow-lg"
            >
              <h2 className="text-4xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  Black Star was created to simplify the way fashion is created and shared. Many designers and brands have ideas but struggle to find the right materials, manufacturers, or people to help bring those ideas to life.
                </p>
                <p>
                  We built Black Star as a platform where creativity meets opportunity. By connecting customers, brands, manufacturers, and models in one place, we make it easier for fashion ideas to become real products.
                </p>
                <p>
                  Our goal is to support emerging creators, empower local brands, and provide the tools needed to turn inspiration into reality.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-8 shadow-lg"
              >
                <div className="w-12 h-12 bg-[#E6C36A] rounded-full flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-4">
                  Mission
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our mission is to provide a platform that empowers creativity and collaboration in the fashion industry by connecting designers, brands, manufacturers, and models in one unified space.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-8 shadow-lg"
              >
                <div className="w-12 h-12 bg-[#E6C36A] rounded-full flex items-center justify-center mb-6">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-4">
                  Vision
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our vision is to build a digital hub where fashion ideas can move smoothly from design to production, while supporting local talent and encouraging innovation in fashion creation.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl sm:text-5xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-4">
                Our Values
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Creativity */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-10 h-10 bg-[#E6C36A] rounded-full flex items-center justify-center mb-4">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0B0D10] mb-3">Creativity</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We believe fashion starts with ideas. Our platform is designed to give creators the freedom to express their vision.
                </p>
              </motion.div>

              {/* Collaboration */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-10 h-10 bg-[#E6C36A] rounded-full flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0B0D10] mb-3">Collaboration</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Great fashion is rarely created alone. We encourage connections between designers, brands, manufacturers, and models.
                </p>
              </motion.div>

              {/* Opportunity */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-10 h-10 bg-[#E6C36A] rounded-full flex items-center justify-center mb-4">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0B0D10] mb-3">Opportunity</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Black Star opens doors for local brands, new designers, and emerging models to grow and showcase their work.
                </p>
              </motion.div>

              {/* Quality */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-10 h-10 bg-[#E6C36A] rounded-full flex items-center justify-center mb-4">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0B0D10] mb-3">Quality</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We focus on connecting users with reliable manufacturers and materials to ensure strong production results.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Black Star Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-8 sm:p-12 shadow-lg"
            >
              <h2 className="text-4xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
                Why Choose Black Star
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  Black Star offers a unique platform that connects every stage of the fashion process.
                </p>
                <p>
                  Users can design their own clothing, discover local brands, find manufacturers for materials and production, and connect with professional models.
                </p>
                <p>
                  By bringing all these elements together, Black Star creates a space where fashion ideas can grow, collaborate, and become reality.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-8 sm:p-12 shadow-lg"
            >
              <h2 className="text-4xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
                Our Process
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  Black Star simplifies the journey from fashion idea to finished product.
                </p>
                <p>
                  Users start by creating an account and exploring the platform. Customers and designers can create clothing designs or discover products from local brands.
                </p>
                <p>
                  Brands can connect with manufacturers to source materials and begin production, while also finding models to represent their collections.
                </p>
                <p>
                  Through collaboration and connection, ideas are transformed into real fashion pieces.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#E6C36A] opacity-20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-6">
                Join the Future of Fashion Creation
              </h2>
              <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto">
                Whether you are a designer, brand, manufacturer, or model, Black Star gives you the space to collaborate, create, and grow within the fashion industry.
              </p>
              
              <motion.button
                onClick={() => navigate('register')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-black/80 transition-all hover:shadow-xl group"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2.5 mb-4">
              <StarIcon className="w-6 h-6 text-[#E6C36A]" />
              <span className="tracking-wider uppercase text-sm font-medium">Black Star</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 Black Star. Where Fashion Ideas Become Reality.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}