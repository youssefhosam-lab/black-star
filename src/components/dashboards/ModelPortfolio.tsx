import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { Star, ChevronDown, Check, Clock, ThumbsUp, ArrowRight, ShieldCheck, Camera, Ruler, X, User } from 'lucide-react';
import { useApp } from '../../App';
import { ModelProfileSettings } from '../model/ModelProfileSettings';

// --- SHARED ASSETS ---
const IMAGES = {
  portrait: "https://images.unsplash.com/photo-1761882469824-f77e7c07e85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdCUyMGVkaXRvcmlhbCUyMGJsYWNrJTIwYW5kJTIwd2hpdGUlMjBhcnRpc3RpY3xlbnwxfHx8fDE3Njk0NzQ2MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  gallery1: "https://images.unsplash.com/photo-1759090889287-e27b577edd49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBhcnRpc3RpY3xlbnwxfHx8fDE3Njk0NzQ2MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  gallery2: "https://images.unsplash.com/photo-1712556374079-ca1f4b764f9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBydW53YXklMjB3YWxraW5nJTIwZnVsbCUyMGJvZHklMjBhcnRpc3RpY3xlbnwxfHx8fDE3Njk0NzQ2MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  gallery3: "https://images.unsplash.com/photo-1736462832668-551150b5e5b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHBob3RvZ3JhcGh5JTIwcG9ydHJhaXQlMjBhcnRpc3RpY3xlbnwxfHx8fDE3Njk0NzQ2MzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
};

const StarIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 224 184" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M143.719 110.121C156.233 101.407 171.96 95.7044 189.287 94.385L223.521 91.7763L189.287 89.1675C171.96 87.8479 156.243 82.1452 143.719 73.4316L190.782 26.8837L134.096 65.5295C123.485 55.2537 116.54 42.339 114.933 28.1123L111.756 4.76837e-07L108.579 28.1123C106.972 42.339 100.027 55.2461 89.416 65.5295L32.7299 26.8837L79.7927 73.4316C67.2789 82.1452 51.5514 87.8479 34.2351 89.1675L1.04308e-07 91.7763L34.2351 94.385C51.5607 95.7044 67.2789 101.415 79.7927 110.121L32.7299 156.669L89.416 118.023C100.027 128.299 106.972 141.214 108.579 155.433L111.756 183.545L114.933 155.433C116.54 141.206 123.494 128.299 134.096 118.023L190.782 156.669L143.719 110.121Z" fill="currentColor" />
  </svg>
);

const TypingText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    const timeout = setTimeout(() => {
      let current = '';
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          current += text[index];
          setDisplayedText(current);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 40); 
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);
  return <span className={className}>{displayedText}</span>;
};

// ==========================================
// VIEW 1: MUSEUM VIEW (LIGHT / ORIGINAL)
// ==========================================

const MuseumLabel = ({ title, year, designer, collection, medium }: any) => (
  <motion.div 
    className="border border-[#E6E2DD] p-4 relative group cursor-pointer bg-transparent transition-colors hover:border-[#C6B48A] w-full"
    whileHover={{ backgroundColor: 'rgba(246, 243, 239, 0.5)' }}
  >
    <div className="absolute top-0 left-4 right-4 h-[1px] bg-[#C6B48A] opacity-50" />
    <div className="space-y-1 font-serif italic text-[#5A5A5A] text-[13px] leading-relaxed">
      <p className="font-semibold text-[#111111] not-italic">{title}, {year}</p>
      <p>{designer}</p>
      <p>{collection}</p>
      <p>{medium}</p>
    </div>
  </motion.div>
);

const MuseumGalleryWork = ({ image, title, year, designer, collection, medium, description, align = "left" }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isRight = align === "right";

  return (
    <div ref={ref} className={`flex flex-col ${isRight ? 'items-end' : 'items-start'} py-20 relative w-full max-w-[1200px] mx-auto px-8 md:px-20`}>
       <motion.div
         className="relative max-w-[640px] w-full"
         initial={{ opacity: 0, scale: 0.98 }}
         animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
         transition={{ duration: 0.4, ease: "easeOut" }}
       >
         <img src={image} alt={title} className="w-full h-auto shadow-sm rounded-sm" />
         <div className={`hidden lg:block absolute top-8 ${isRight ? 'right-full mr-12' : 'left-full ml-12'} w-56 z-10`}>
            <MuseumLabel title={title} year={year} designer={designer} collection={collection} medium={medium} />
         </div>
       </motion.div>
       <motion.div 
         className={`mt-8 max-w-[480px] ${isRight ? 'text-right' : 'text-left'}`}
         initial={{ opacity: 0 }}
         animate={isInView ? { opacity: 1 } : { opacity: 0 }}
         transition={{ delay: 0.2, duration: 0.5 }}
       >
          <p className="font-serif italic text-[#5A5A5A] text-[16px] leading-[160%]">{description}</p>
       </motion.div>
    </div>
  );
};

const MuseumView = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F3EF] pt-20">
      <style>{`
         .font-serif { font-family: 'Playfair Display', serif; }
         .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>
      
      {/* Intro */}
      <section className="min-h-[80vh] flex items-center justify-center pt-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full max-w-[1200px] px-8 md:px-20">
          <div className="col-span-12 md:col-span-6 flex justify-center md:justify-end md:pr-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative w-full max-w-[400px] h-[560px] rounded-[6px] overflow-hidden shadow-lg">
              <motion.img src={IMAGES.portrait} alt="Model Portrait" className="w-full h-full object-cover" initial={{ filter: "grayscale(0%)" }} animate={{ filter: "grayscale(100%)" }} transition={{ delay: 1.2, duration: 0.6 }} />
            </motion.div>
          </div>
          <div className="col-span-12 md:col-span-6 flex flex-col justify-center pl-4">
            <div className="mb-10">
              <h1 className="font-serif text-[48px] md:text-[56px] leading-[1.1] font-semibold text-[#111111] tracking-[0.02em]">
                <div className="block h-[60px] md:h-[70px]"><TypingText text="Elena" delay={0} /></div>
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.3 }} className="block">Vauclair</motion.div>
              </h1>
            </div>
            <motion.div className="space-y-5 font-sans text-[#5A5A5A] text-[14px] leading-[160%]">
               <p className="text-[#111111]">A muse of silent expressionism.</p>
               <p>179cm / 5'10.5" — 81-60-89</p>
               <p>Rank: #04 Global</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="flex flex-col items-center w-full">
         <MuseumGalleryWork 
           image={IMAGES.gallery2}
           title="The Walking Form"
           year="2024"
           designer="Noir Et Blanc"
           collection="Fall / Winter"
           medium="Runway"
           description="Capturing the moment of suspension. The garment flows as an extension of the body's natural rhythm."
           align="left"
         />
         <div className="w-full h-[1px] bg-[#E6E2DD] max-w-[1000px] mx-auto opacity-50 my-12" />
         <MuseumGalleryWork 
           image={IMAGES.gallery1}
           title="Static Silence"
           year="2023"
           designer="Aesthete"
           collection="Campaign"
           medium="Digital / Editorial"
           description="A study in stillness. The contrast between soft texture and hard shadow creates a narrative of resilience."
           align="right"
         />
      </section>

      {/* Timeline */}
      <section className="py-24 px-8 md:px-20 max-w-[1200px] mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="col-span-12 md:col-span-4 md:col-start-3">
               <h2 className="font-serif text-[42px] text-[#111111] mb-[34px] px-[34px] py-[56px] mt-[78px] mr-[0px] ml-[24px] text-center">Career Timeline</h2>
            </div>
            <div className="col-span-12 md:col-span-6 relative">
               <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#E6E2DD]" />
               <div className="space-y-8 pl-12 py-4">
                  {[
                    { year: "2024", title: "Opening Walk", brand: "Noir Et Blanc" },
                    { year: "2023", title: "Global Campaign", brand: "Aesthete" },
                    { year: "2023", title: "Editorial Feature", brand: "Vogue Italia" },
                    { year: "2022", title: "Debut", brand: "Urban Revolt" }
                  ].map((ev, i) => (
                    <div key={i}>
                      <span className="text-xs text-[#C6B48A] tracking-wider block mb-1">{ev.year}</span>
                      <h3 className="font-serif text-xl text-[#111111]">{ev.title}</h3>
                      <p className="text-sm text-[#5A5A5A]">{ev.brand}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Additional Archive */}
      <div className="flex justify-center pb-32">
        {!showMore ? (
            <button 
              onClick={() => setShowMore(true)}
              className="group relative pb-2 font-serif text-lg text-[#111111]"
            >
              Continue the exhibition
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C6B48A] transition-all duration-300 group-hover:w-full group-hover:h-[2px] opacity-70 group-hover:opacity-100" />
            </button>
        ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full"
            >
              <div className="text-center mb-16">
                <span className="font-serif italic text-[#5A5A5A]">Archive Collection</span>
              </div>
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-[1000px] mx-auto px-8 md:px-20 pb-32"
              >
                <div className="flex flex-col gap-4">
                    <img src={IMAGES.gallery3} className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Extra 1" />
                    <p className="font-serif italic text-[#5A5A5A] text-sm text-center mt-2">Backstage, Milan 2024</p>
                </div>
                <div className="flex flex-col gap-4 pt-12 md:pt-24">
                    <img src={IMAGES.gallery1} className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Extra 2" />
                    <p className="font-serif italic text-[#5A5A5A] text-sm text-center mt-2">Studio Session, "Void"</p>
                </div>
              </motion.div>
            </motion.div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// VIEW 2: LOCAL BRAND VIEW (DARK / PRO)
// ==========================================

const BrandGalleryWork = ({ image, title, year, collection, description, align = "left" }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isRight = align === "right";

  const highlightKeywords = (text: string) => {
    const keywords = ["stillness", "texture", "shadow", "resilience", "suspension", "rhythm", "extension", "editorial-ready", "structure"];
    const parts = text.split(new RegExp(`(${keywords.join('|')})`, 'gi'));
    return parts.map((part, i) => 
      keywords.some(k => k.toLowerCase() === part.toLowerCase()) ? 
      <span key={i} className="text-[#F0F0F0] font-medium border-b border-[#C6B48A]/50 pb-0.5">{part}</span> : part
    );
  };

  return (
    <div ref={ref} className={`flex flex-col ${isRight ? 'items-end' : 'items-start'} py-24 relative w-full max-w-[1200px] mx-auto px-8 md:px-20`}>
       <motion.div
         className="relative max-w-[540px] w-full group"
         initial={{ opacity: 0, y: 40 }}
         animate={isInView ? { opacity: 1, y: 0 } : {}}
         transition={{ duration: 0.6, ease: "easeOut" }}
       >
         <img src={image} alt={title} className="w-full h-auto shadow-2xl rounded-[1px] brightness-90 group-hover:brightness-100 transition-all duration-500" />
         
         <div className="absolute inset-y-0 right-0 w-64 bg-[#1A1A1A]/90 backdrop-blur-md translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out border-l border-[#333] z-20 flex flex-col p-6">
            <h4 className="font-mono text-xs text-[#C6B48A] uppercase tracking-wider mb-6">Brand Analysis</h4>
            <div className="space-y-6">
               <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#F0F0F0] text-sm"><Ruler size={14} className="text-[#888]" /><span>Fit Accuracy</span></div>
                  <div className="w-full h-1 bg-[#333] rounded-full overflow-hidden"><div className="h-full bg-[#F0F0F0] w-[95%]" /></div>
               </div>
               <div className="pt-4 border-t border-[#333]">
                  <span className="block text-[10px] text-[#888] uppercase mb-2">Style Range</span>
                  <div className="flex flex-wrap gap-2">
                     <span className="px-2 py-1 bg-[#333] text-[#CCC] text-[10px] uppercase">Minimal</span>
                     <span className="px-2 py-1 bg-[#333] text-[#CCC] text-[10px] uppercase">Avant-Garde</span>
                  </div>
               </div>
               <div className="flex items-center gap-2 text-[#4ADE80] text-xs pt-2"><ShieldCheck size={14} /><span>High Reliability</span></div>
            </div>
         </div>

         <div className={`hidden lg:block absolute top-12 ${isRight ? 'right-full mr-8' : 'left-full ml-8'} w-48 z-10`}>
             <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }} className="flex flex-col items-start gap-2">
                <div className="bg-[#1A1A1A] border border-[#333] px-3 py-1.5 text-[10px] text-[#C6B48A] uppercase tracking-wider flex items-center gap-2"><Check size={10} /> Production-Ready</div>
                <div className="text-[#666] text-[10px] uppercase tracking-widest pl-1">Low Risk Asset</div>
             </motion.div>
         </div>
       </motion.div>

       <motion.div className={`mt-6 max-w-[480px] ${isRight ? 'text-right' : 'text-left'}`} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2, duration: 0.5 }}>
          <div className="font-mono text-xs text-[#666] mb-2">{title} — {collection}</div>
          <p className="font-sans text-[#AAAAAA] text-[15px] leading-[160%]">{highlightKeywords(description)}</p>
       </motion.div>
    </div>
  );
};

const BrandTimelineEvent = ({ year, title, brand, outcome, index }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} className="relative pl-12 py-8 group" initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: index * 0.15, duration: 0.5 }}>
      <div className="absolute left-[-5px] top-10 w-[9px] h-[9px] rounded-full bg-[#333] border border-[#666] transition-all duration-300 group-hover:bg-[#F0F0F0] group-hover:border-[#F0F0F0]" />
      <div className="transition-opacity duration-300 opacity-70 group-hover:opacity-100">
        <div className="flex items-center gap-3 mb-2">
           <span className="font-mono text-xs text-[#C6B48A] tracking-wider">{year}</span>
           <div className="h-[1px] w-8 bg-[#333]" />
           <span className="font-mono text-xs text-[#666] uppercase">{brand}</span>
        </div>
        <h3 className="font-serif text-xl text-[#F0F0F0] mb-3">{title}</h3>
        <div className="flex flex-wrap gap-2 group/tags">
           {outcome.map((tag: string, i: number) => (
             <span key={i} className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#1A1A1A] border border-[#333] text-[10px] text-[#CCC] uppercase tracking-wide">
                {tag === 'On-time' && <Clock size={10} className="text-[#4ADE80]" />}
                {tag === 'High Satisfaction' && <ThumbsUp size={10} className="text-[#C6B48A]" />}
                {tag === 'Repeat' && <Check size={10} className="text-[#60A5FA]" />}
                {tag}
             </span>
           ))}
        </div>
      </div>
    </motion.div>
  );
};

const LocalBrandView = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen bg-[#0E0E0E] pt-20">
       <style>{`
         .font-serif { font-family: 'Playfair Display', serif; }
         .font-sans { font-family: 'Inter', sans-serif; }
         .font-mono { font-family: 'Space Mono', monospace; }
         .grain-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999; opacity: 0.04;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
         }
       `}</style>
       <div className="grain-overlay" />

       {/* Intro */}
       <section className="min-h-[90vh] flex items-center justify-center pt-24 pb-20 relative">
          <div className="absolute top-24 right-8 md:right-20">
             <div className="font-mono text-[10px] text-[#C6B48A] uppercase tracking-widest border border-[#C6B48A]/30 px-3 py-1 rounded-full">Viewing as: Local Brand</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full max-w-[1200px] px-8 md:px-20">
             <div className="col-span-12 md:col-span-5 flex justify-center md:justify-end relative">
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative w-full max-w-[400px] h-[600px] overflow-hidden rounded-[2px]">
                   <motion.img src={IMAGES.portrait} alt="Model Portrait" className="w-full h-full object-cover" initial={{ filter: "grayscale(0%) contrast(100%)" }} animate={{ filter: "grayscale(100%) contrast(108%)" }} transition={{ duration: 0.8 }} />
                </motion.div>
             </div>
             <div className="col-span-12 md:col-span-7 flex flex-col justify-center pl-4 md:pl-12">
                <h1 className="font-serif text-[64px] leading-[1] text-[#F0F0F0] mb-8">Elena Vauclair</h1>
                <div className="space-y-8 font-sans text-[#888888]">
                   <div className="group relative inline-block">
                      <div className="flex items-baseline gap-4 mb-1">
                         <span className="text-[#F0F0F0] text-lg font-medium">179cm / 81-60-89</span>
                         <span className="text-xs font-mono text-[#C6B48A] opacity-60">Brands typically check this first</span>
                      </div>
                      <div className="h-[1px] w-full bg-gradient-to-r from-[#C6B48A]/50 to-transparent" />
                   </div>
                   <div className="flex items-center gap-3"><span className="font-mono text-xs uppercase tracking-wider text-[#888888]">Status</span><span className="px-3 py-1 rounded-full border border-[#4ADE80]/30 text-[#4ADE80] text-xs uppercase tracking-wide bg-[#4ADE80]/5">Available / Limited</span></div>
                   <div className="pt-4 border-t border-[#333] max-w-md"><p className="text-sm leading-relaxed text-[#666]">Specializing in architectural silhouettes and silent expressionism. A reliable partner for editorial and campaign work requiring minimal direction.</p></div>
                </div>
             </div>
          </div>
       </section>

       {/* Gallery */}
       <section className="flex flex-col items-center w-full pb-20">
          <BrandGalleryWork image={IMAGES.gallery2} title="Noir Et Blanc" collection="Fall / Winter" year="2024" description="Strong presence in editorial shoots. Capturing the moment of suspension." align="left" />
          <div className="w-full h-[1px] bg-[#333] max-w-[1000px] mx-auto opacity-50 my-12" />
          <BrandGalleryWork image={IMAGES.gallery1} title="Aesthete" collection="Campaign" year="2023" description="Editorial-ready presence. A study in stillness and structure." align="right" />
       </section>

       {/* Timeline */}
       <section className="py-32 px-8 md:px-20 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
             <div className="col-span-12 md:col-span-4 md:col-start-3"><h2 className="font-serif text-[32px] text-[#F0F0F0] mb-4">Track Record</h2></div>
             <div className="col-span-12 md:col-span-6 space-y-4">
               {[
                 { year: "2024", title: "Opening Walk: Fall/Winter", brand: "Noir Et Blanc", outcome: ["On-time", "High Satisfaction"] },
                 { year: "2023", title: "Global Campaign: Sicilian", brand: "Aesthete", outcome: ["Repeat", "High ROI"] },
                 { year: "2023", title: "Editorial: 'The New Silence'", brand: "Vogue Italia", outcome: ["Publication"] },
                 { year: "2022", title: "Debut: SS23 Show", brand: "Urban Revolt", outcome: ["Scouted", "On-time"] }
               ].map((ev, i) => <BrandTimelineEvent key={i} index={i} {...ev} />)}
             </div>
          </div>
       </section>

       {/* Brand Archive Button */}
       <div className="flex justify-center pb-40">
          {!showMore ? (
             <button 
               onClick={() => setShowMore(true)}
               className="group relative px-8 py-4 bg-[#1A1A1A] border border-[#333] hover:border-[#C6B48A] transition-all duration-300 overflow-hidden"
             >
               <span className="relative z-10 font-mono text-xs uppercase tracking-widest text-[#F0F0F0] flex items-center gap-3">
                 Show full archive
                 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </span>
               <div className="absolute inset-0 bg-[#C6B48A] opacity-0 group-hover:opacity-1 transition-opacity duration-300" />
             </button>
          ) : (
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
             >
                <div className="text-center mb-16">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#666]">Archive Loaded</span>
                </div>
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-[1000px] mx-auto px-8 md:px-20 pb-32"
                >
                    <div className="flex flex-col gap-4">
                        <img src={IMAGES.gallery3} className="w-full h-[500px] object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700" alt="Extra 1" />
                    </div>
                    <div className="flex flex-col gap-4 pt-12 md:pt-24">
                        <img src={IMAGES.gallery1} className="w-full h-[500px] object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700" alt="Extra 2" />
                    </div>
                </motion.div>
             </motion.div>
          )}
       </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT & HEADER LOGIC
// ==========================================

export function ModelPortfolio() {
  const [viewMode, setViewMode] = useState<'museum' | 'brand'>('museum');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { navigate } = useApp();

  return (
    <div className="relative">
       {/* Global Typography Imports - Loaded once */}
       <style>{`
         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
       `}</style>

       {/* Sticky Header with Toggles */}
       <div className={`fixed top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-8 border-b transition-colors duration-500 ${viewMode === 'brand' ? 'bg-[#0E0E0E]/90 border-[#333]' : 'bg-[#F6F3EF] border-[#E6E2DD]/50'}`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('model-dashboard')}
              className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <StarIcon className={`w-6 h-6 ${viewMode === 'brand' ? 'text-[#F0F0F0]' : 'text-[#111111]'}`} />
            </button>

            {/* Profile Picture with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="relative group"
              >
                <div
                  className={`w-10 h-10 rounded-full bg-cover bg-center border-2 transition-colors ${viewMode === 'brand' ? 'border-[#333] hover:border-[#C6B48A]' : 'border-[#E6E2DD] hover:border-[#C6B48A]'}`}
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080)' }}
                />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute left-0 top-full mt-4 w-48 py-2 rounded shadow-xl border ${viewMode === 'brand' ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E6E2DD]'}`}
                  >
                    <button
                      onClick={() => {
                        setShowProfileSettings(true);
                        setIsProfileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-mono uppercase tracking-wider hover:opacity-70 flex items-center gap-2 ${viewMode === 'brand' ? 'text-[#F0F0F0]' : 'text-[#111111]'}`}
                    >
                      <User size={14} />
                      My Profile
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className={`absolute left-1/2 -translate-x-1/2 font-serif text-lg tracking-wide uppercase transition-colors duration-500 ${viewMode === 'brand' ? 'text-[#F0F0F0]' : 'text-[#111111]'}`}>
             Museum
          </div>

          <div className="relative">
             <button 
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               className="flex items-center gap-2 cursor-pointer group"
             >
                <span className={`font-mono text-xs uppercase tracking-wider transition-colors ${viewMode === 'brand' ? 'text-[#C6B48A]' : 'text-[#5A5A5A]'}`}>
                   {viewMode === 'brand' ? 'Viewing as: Local Brand' : 'View as'}
                </span>
                <ChevronDown className={`w-4 h-4 transition-colors ${viewMode === 'brand' ? 'text-[#F0F0F0]' : 'text-[#5A5A5A]'}`} />
             </button>

             {/* Dropdown Menu */}
             <AnimatePresence>
                {isMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute right-0 top-full mt-4 w-48 py-2 rounded shadow-xl border ${viewMode === 'brand' ? 'bg-[#1A1A1A] border-[#333]' : 'bg-white border-[#E6E2DD]'}`}
                  >
                     <button 
                       onClick={() => { setViewMode('museum'); setIsMenuOpen(false); }}
                       className={`w-full text-left px-4 py-2 text-xs font-mono uppercase tracking-wider hover:opacity-70 ${viewMode === 'museum' ? 'opacity-50 cursor-default' : ''} ${viewMode === 'brand' ? 'text-[#F0F0F0]' : 'text-[#111111]'}`}
                     >
                       Default View
                     </button>
                     <button 
                       onClick={() => { setViewMode('brand'); setIsMenuOpen(false); }}
                       className={`w-full text-left px-4 py-2 text-xs font-mono uppercase tracking-wider hover:opacity-70 ${viewMode === 'brand' ? 'opacity-50 cursor-default' : ''} ${viewMode === 'brand' ? 'text-[#C6B48A]' : 'text-[#111111]'}`}
                     >
                       Local Brand
                     </button>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
       </div>

       {/* View Switcher */}
       <AnimatePresence mode="wait">
          {viewMode === 'museum' ? (
             <motion.div 
               key="museum"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.5 }}
             >
               <MuseumView />
             </motion.div>
          ) : (
             <motion.div 
               key="brand"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.5 }}
             >
               <LocalBrandView />
             </motion.div>
          )}
       </AnimatePresence>

       {/* Profile Settings Modal */}
       <AnimatePresence>
         {showProfileSettings && (
           <ModelProfileSettings onClose={() => setShowProfileSettings(false)} />
         )}
       </AnimatePresence>
    </div>
  );
}