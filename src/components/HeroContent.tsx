import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const springConfig = { type: "spring", stiffness: 120, damping: 20, mass: 1 };
const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};
const fadeUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: springConfig }
};

const TiltCard = ({ children, className }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-2xl transition-shadow duration-300 ${className}`}
      whileHover={{ scale: 1.02, transition: springConfig }}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

const StatCounter = ({ value, suffix, label }: any) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let current = 0;
    const step = value / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center lg:text-left">
      <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
        {count}{suffix}
      </div>
      <div className="text-[10px] sm:text-xs text-[var(--color-text-muted)] font-medium mt-0.5 leading-tight">{label}</div>
    </div>
  );
};

export const HeroContent = ({ siteConfig, stats, children }: { siteConfig: any, stats: any[], children?: React.ReactNode }) => {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center"
    >
      {/* ═══ LEFT ═══ */}
      <div className="order-1 text-center lg:text-left">
        
        {/* Badges */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 justify-center lg:justify-start mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span className="text-xs font-semibold text-green-400">{siteConfig.availability}</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#96BF48]/30 bg-[#96BF48]/[0.08]">
            <img src="https://cdn.simpleicons.org/shopify/96BF48" alt="Shopify" width="13" height="13" loading="eager" />
            <span className="text-xs font-semibold text-[#96BF48]">Shopify Hydrogen</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#61DAFB]/30 bg-[#61DAFB]/[0.08]">
            <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" width="13" height="13" loading="eager" />
            <span className="text-xs font-semibold text-[#61DAFB]">React & MERN Stack</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1 
          id="hero-name"
          variants={fadeUp} 
          className="font-extrabold text-[var(--color-text)] tracking-tight mb-3" 
          style={{ fontSize: "clamp(2.6rem,6.5vw,5rem)", lineHeight: 1.05, overflow: "visible" }}
        >
          {siteConfig.name.split(" ").map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap" style={{ marginRight: "0.28em" }}>
              {word.split("").map((char, ci) => {
                const delay = 0.12 + (wi * word.length + ci) * 0.04;
                return (
                  <span 
                    key={ci} 
                    className="char-reveal" 
                    style={{ animationDelay: `${delay}s`, display: "inline-block" }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          ))}
        </motion.h1>

        {/* Role */}
        <motion.p variants={fadeUp} className="text-lg sm:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#14b8a6] via-[#dfc15d] to-[#14b8a6] mb-4 bg-[length:200%_auto] animate-[gradient-shift_6s_linear_infinite]">
          {siteConfig.title}
        </motion.p>

        {/* Tagline */}
        <motion.p variants={fadeUp} className="text-[var(--color-text-muted)] text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
          I build <span className="font-bold text-[var(--color-text)]">high-performance web apps</span> that convert and scale.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#playzone" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[var(--color-btn-text)] bg-[var(--color-primary)] rounded-xl hover:bg-[var(--color-accent)] shadow-[0_0_24px_rgba(20,184,166,0.35)] hover:shadow-[0_0_30px_rgba(223,193,93,0.4)] transition-all duration-200">
            Enter Storefront Playzone
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </motion.a>
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={siteConfig.resume} download className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[var(--color-text)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-accent)]/60 hover:text-[var(--color-accent)] hover:bg-[var(--glass-bg)] transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download CV
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {stats.map((s, idx) => (
            <StatCounter key={idx} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </motion.div>

      </div>

      {/* ═══ RIGHT: 3D WebGL Liquid Photo & Glassmorphic Cards ═══ */}
      <motion.div variants={fadeUp} className="order-2 flex justify-center lg:justify-end perspective-1000">
        <div className="flex flex-col items-center gap-5 w-full max-w-[400px] lg:max-w-[360px]">
          
          {children}

          {/* Glassmorphic Code Card */}
          <TiltCard className="hover:shadow-[0_20px_50px_rgba(223, 193, 93,0.15)]">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
              <span className="ml-1.5 text-[10px] font-mono text-white/40 select-none">developer.ts</span>
            </div>
            <div className="p-4 font-mono text-[11px] leading-[1.8] text-white/80">
              <div><span className="text-purple-400">const</span> <span className="text-cyan-400">developer</span> <span className="text-white">=</span> <span className="text-yellow-300">&#123;</span></div>
              <div className="pl-4"><span className="text-cyan-400">specialties</span><span className="text-white">:</span> <span className="text-yellow-300">[</span><span className="text-emerald-400">"Headless Shopify"</span><span className="text-white">,</span> <span className="text-emerald-400">"MERN Stack"</span><span className="text-yellow-300">]</span><span className="text-white">,</span></div>
              <div className="pl-4"><span className="text-cyan-400">frontEnd</span><span className="text-white">:</span> <span className="text-emerald-400">"React 19 / Remix / Next.js"</span><span className="text-white">,</span></div>
              <div className="pl-4"><span className="text-cyan-400">backEnd</span><span className="text-white">:</span> <span className="text-emerald-400">"Node.js / Express / GraphQL"</span><span className="text-white">,</span></div>
              <div className="pl-4"><span className="text-cyan-400">database</span><span className="text-white">:</span> <span className="text-emerald-400">"MongoDB / SQL Server"</span><span className="text-white">,</span></div>
              <div className="pl-4"><span className="text-cyan-400">performance</span><span className="text-white">:</span> <span className="text-emerald-400">"Sub-100ms TTFB Edge Cache"</span></div>
              <div><span className="text-yellow-300">&#125;</span></div>
            </div>
          </TiltCard>

        </div>
      </motion.div>
    </motion.div>
  );
};
