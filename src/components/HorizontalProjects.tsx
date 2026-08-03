import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const HorizontalProjects = ({ projects }: { projects: any[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const scrollElement = scrollRef.current;
      if (!scrollElement) return;

      const getScrollAmount = () => {
        let scrollWidth = scrollElement.scrollWidth;
        return -(scrollWidth - window.innerWidth);
      };

      const tween = gsap.to(scrollElement, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollElement.scrollWidth - window.innerWidth}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="projects" className="h-screen w-full flex flex-col justify-center bg-[var(--color-bg)] overflow-hidden relative">
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-white/5 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-white/5 pointer-events-none"></div>

      <div className="flex h-full items-center">
        <div className="pl-8 sm:pl-16 lg:pl-24 pr-16 w-[45vw] flex-shrink-0 flex flex-col justify-center">
          <span className="text-[var(--color-primary)] font-mono text-sm tracking-widest uppercase mb-4 block">Case Studies</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            Selected <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">Works</span>
          </h2>
          <p className="mt-8 text-[var(--color-text-muted)] text-lg leading-relaxed max-w-sm">
            High-performance Shopify storefronts and headless architectures. Built for speed, conversions, and clean developer experience.
          </p>
          <div className="mt-12 flex items-center gap-4 text-sm text-[var(--color-text-muted)] font-mono">
            <div className="w-12 h-[1px] bg-[var(--color-primary)]"></div>
            Scroll to explore
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-8 lg:gap-16 pr-[20vw] items-center h-[65vh]">
          {projects.map((project: any, index: number) => (
            <div key={index} className="w-[85vw] sm:w-[60vw] md:w-[40vw] h-full flex-shrink-0 relative group rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0d24] flex flex-col">
              
              {/* Image / Visual mock area */}
              <div className="h-[45%] w-full bg-[#050714] border-b border-white/5 relative overflow-hidden flex items-center justify-center group-hover:bg-[#070921] transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-3/4 h-3/4 rounded-xl border border-white/10 bg-black/50 shadow-2xl overflow-hidden group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-700">
                  <div className="w-full h-6 bg-white/5 border-b border-white/10 flex items-center px-3 gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="w-full h-full p-4 font-mono text-[10px] text-white/30 leading-relaxed">
                     <span className="text-[var(--color-accent)]">query</span> getProduct {'{'} <br/>
                     &nbsp;&nbsp;product(handle: "dev") {'{'} <br/>
                     &nbsp;&nbsp;&nbsp;&nbsp;title <br/>
                     &nbsp;&nbsp;&nbsp;&nbsp;performance: "100" <br/>
                     &nbsp;&nbsp;{'}'} <br/>
                     {'}'}
                  </div>
                </div>
              </div>

              {/* Content area */}
              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-mono text-[var(--color-accent)]">0{index + 1}</span>
                    {project.featured && (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-8">
                  {project.skills?.map((skill: string, i: number) => (
                    <span key={i} className="px-3 py-1 rounded-md text-[11px] font-semibold bg-white/5 text-[var(--color-text)] border border-white/10">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalProjects;
