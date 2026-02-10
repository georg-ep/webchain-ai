"use client";

import { FeaturedProjectCarousel } from "@/components/featured-project-carousel";
import { InquireModal } from "@/components/inquire-modal";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-border-subtle bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-48 h-8 flex items-center justify-start">
              <img src="/brand/large.svg" alt="WebChain Labs" className="h-full w-auto object-contain" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-16">
            <Link
              className="text-[10px] font-medium uppercase tracking-[0.2em] hover:text-white transition-colors opacity-60 hover:opacity-100"
              href="#principles"
            >
              Principles
            </Link>
            <Link
              className="text-[10px] font-medium uppercase tracking-[0.2em] hover:text-white transition-colors opacity-60 hover:opacity-100"
              href="#projects"
            >
              Work
            </Link>
            <Link
              className="text-[10px] font-medium uppercase tracking-[0.2em] hover:text-white transition-colors opacity-60 hover:opacity-100"
              href="#process"
            >
              Process
            </Link>
          </div>
          <InquireModal>
            <button className="hidden md:block border border-slate-300 dark:border-white/20 hover:border-white px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all">
                Inquire
            </button>
          </InquireModal>
          <button 
            className="md:hidden p-2" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 z-50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-64 bg-background-dark border-l border-white/10 z-50 md:hidden">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Menu</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2"
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1 p-6">
                <Link
                  className="text-sm font-medium uppercase tracking-wider hover:text-white transition-colors opacity-60 hover:opacity-100 py-3"
                  href="#principles"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Principles
                </Link>
                <Link
                  className="text-sm font-medium uppercase tracking-wider hover:text-white transition-colors opacity-60 hover:opacity-100 py-3"
                  href="#projects"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Work
                </Link>
                <Link
                  className="text-sm font-medium uppercase tracking-wider hover:text-white transition-colors opacity-60 hover:opacity-100 py-3"
                  href="#process"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Process
                </Link>
              </div>

              {/* Inquire Button */}
              <div className="mt-auto p-6">
                <InquireModal>
                  <button 
                    className="w-full border border-white/20 hover:border-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
                  >
                    Inquire
                  </button>
                </InquireModal>
              </div>
            </div>
          </div>
        </>
      )}

      <main className="relative pt-24">
        <div className="fixed inset-0 grid-lines pointer-events-none opacity-50 z-0"></div>
        <section className="relative min-h-[85vh] flex items-center px-6 lg:px-12 py-24 z-10">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-8 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <span className="h-px w-12 bg-slate-400 dark:bg-slate-600"></span>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
                  Est. 2024
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] dark:text-white mb-10">
                We build systems that{" "}
                <span className="italic font-light text-slate-400">think</span>,
                <br /> not just software that executes.
              </h1>
              <p className="max-w-xl text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light mb-16 font-serif italic">
                We design autonomous systems that handle the thinking, so your team can focus on the doing. Custom AI architecture built for real-world impact.
              </p>
              <div className="flex flex-wrap gap-8 items-center">
                <Link
                  className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
                  href="#projects"
                >
                  Explore Works
                  <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 relative hidden lg:block">
              <div className="relative w-full aspect-[3/4] border-l border-white/10 p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500">
                      Latency
                    </span>
                    <span className="text-xs font-mono">12ms</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500">
                      Inference
                    </span>
                    <span className="text-xs font-mono">99.8%</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500">
                      Nodes
                    </span>
                    <span className="text-xs font-mono">14.2B</span>
                  </div>
                </div>
                <div className="mt-12 opacity-40">
                  <svg
                    className="w-full"
                    fill="none"
                    viewBox="0 0 200 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 50 C 50 50, 50 20, 100 20 C 150 20, 150 80, 200 80"
                      stroke="currentColor"
                      strokeWidth="1"
                    ></path>
                    <path
                      d="M0 50 C 50 50, 50 80, 100 80 C 150 80, 150 20, 200 20"
                      stroke="currentColor"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="relative py-32 px-6 lg:px-12 bg-background-light dark:bg-[#0c0c0c] z-10"
          id="principles"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
              <div className="lg:col-span-1">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
                  Manifesto
                </h2>
              </div>
              <div className="lg:col-span-3">
                <h3 className="text-3xl md:text-5xl font-serif font-light dark:text-white leading-tight">
                  AI where it creates leverage, <br />
                  <span className="italic text-slate-500">
                    software where it creates certainty.
                  </span>
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group relative bg-white dark:bg-[#111] p-10 border border-slate-200 dark:border-white/5 hover:border-white/20 transition-all duration-500">
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-slate-200 dark:bg-white/10 group-hover:bg-white transition-colors"></div>
                <span className="text-[10px] font-mono text-slate-400 mb-12 block">
                  001
                </span>
                <h4 className="text-2xl font-serif mb-4 dark:text-white italic">
                  Deterministic Core
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light">
                  Foundational logic must be absolute. We engineer 100%
                  reliability for data integrity, reserving AI for higher-order
                  reasoning.
                </p>
              </div>
              <div className="group relative bg-white dark:bg-[#111] p-10 border border-slate-200 dark:border-white/5 hover:border-white/20 transition-all duration-500">
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-slate-200 dark:bg-white/10 group-hover:bg-white transition-colors"></div>
                <span className="text-[10px] font-mono text-slate-400 mb-12 block">
                  002
                </span>
                <h4 className="text-2xl font-serif mb-4 dark:text-white italic">
                  Probabilistic Edge
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light">
                  Deployment of models for synthesis and pattern matching.
                  Leveraging ambiguity as a feature, not a bug, in creative
                  workflows.
                </p>
              </div>
              <div className="group relative bg-white dark:bg-[#111] p-10 border border-slate-200 dark:border-white/5 hover:border-white/20 transition-all duration-500">
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-slate-200 dark:bg-white/10 group-hover:bg-white transition-colors"></div>
                <span className="text-[10px] font-mono text-slate-400 mb-12 block">
                  003
                </span>
                <h4 className="text-2xl font-serif mb-4 dark:text-white italic">
                  Human Agency
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light">
                  Systems designed to augment, not replace. We build rigorous
                  &quot;human-in-the-loop&quot; protocols for high-stakes decision making.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="py-32 px-6 lg:px-12 z-10 relative bg-background-dark"
          id="projects"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="flex justify-between items-end mb-24 border-b border-white/10 pb-8">
              <h2 className="text-4xl md:text-6xl font-serif font-medium dark:text-white">
                Selected Works
              </h2>
              <Link
                className="hidden md:inline-block text-[10px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors opacity-60 hover:opacity-100 mb-2"
                href="#"
              >
                Archive (14)
              </Link>
            </div>
            <FeaturedProjectCarousel />
          </div>
        </section>
        <section
          className="py-32 px-6 lg:px-12 bg-[#080808] z-10 relative border-t border-white/5"
          id="process"
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
                  Methodology
                </h2>
                <h3 className="text-3xl md:text-4xl font-serif dark:text-white mb-8">
                  Rigorous Evaluation
                </h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed max-w-xs">
                  We don't just prompt and pray. Our engineering process treats
                  AI components with the same scientific rigor as traditional
                  distributed systems.
                </p>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
                  <div className="bg-[#080808] p-10 hover:bg-[#0f0f0f] transition-colors relative">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-xs font-mono text-slate-500">
                        PHASE I
                      </span>
                      <span className="material-symbols-outlined text-white/40 text-lg">
                        radar
                      </span>
                    </div>
                    <h5 className="font-serif text-xl mb-3 dark:text-white">
                      Cognitive Mapping
                    </h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Defining the boundaries of deterministic logic vs
                      probabilistic reasoning. Establishing the architectural
                      constraints.
                    </p>
                  </div>
                  <div className="bg-[#080808] p-10 hover:bg-[#0f0f0f] transition-colors relative">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-xs font-mono text-slate-500">
                        PHASE II
                      </span>
                      <span className="material-symbols-outlined text-white/40 text-lg">
                        science
                      </span>
                    </div>
                    <h5 className="font-serif text-xl mb-3 dark:text-white">
                      Model Prototyping
                    </h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Rapid iteration of model selection. Quantifying output
                      quality against golden datasets.
                    </p>
                  </div>
                  <div className="bg-[#080808] p-10 hover:bg-[#0f0f0f] transition-colors relative">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-xs font-mono text-slate-500">
                        PHASE III
                      </span>
                      <span className="material-symbols-outlined text-white/40 text-lg">
                        security
                      </span>
                    </div>
                    <h5 className="font-serif text-xl mb-3 dark:text-white">
                      Guardrail Engineering
                    </h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Implementing semantic filters and adversarial testing to
                      ensure system safety and alignment.
                    </p>
                  </div>
                  <div className="bg-[#080808] p-10 hover:bg-[#0f0f0f] transition-colors relative">
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-xs font-mono text-slate-500">
                        PHASE IV
                      </span>
                      <span className="material-symbols-outlined text-white/40 text-lg">
                        deployed_code
                      </span>
                    </div>
                    <h5 className="font-serif text-xl mb-3 dark:text-white">
                      High-Availability Scale
                    </h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Deploying to distributed edge networks with real-time
                      monitoring of token usage and drift.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-40 px-6 lg:px-12 bg-background-dark text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/[0.02] grid-lines opacity-20 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-5xl md:text-7xl font-serif font-medium dark:text-white mb-12 tracking-tight">
              Ready to architect the <br />
              <span className="italic text-slate-500">intelligent layer?</span>
            </h2>
            <div className="flex flex-col items-center gap-8">
              <InquireModal>
                <button className="bg-white text-black hover:bg-slate-200 px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] transition-all">
                    Initiate Consultation
                </button>
              </InquireModal>
              <Link
                className="text-xs uppercase tracking-widest font-medium text-slate-500 hover:text-white transition-colors"
                href="mailto:hello@webchain.studio"
              >
                hello@webchain.studio
              </Link>
            </div>
          </div>
        </section>
        <footer className="py-20 px-6 lg:px-12 bg-black border-t border-white/5">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
              <div className="md:col-span-5">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-40 h-8 flex items-center justify-start">
                    <img src="/brand/large.svg" alt="WebChain Labs" className="h-full w-auto object-contain" />
                  </div>
                </div>
                <p className="max-w-xs text-slate-500 text-xs leading-relaxed font-light">
                  Dubai &amp; London based.
                  <br />
                  Engineering next-generation systems with architectural
                  precision.
                </p>
              </div>
              <div className="md:col-span-4 md:col-start-9 flex flex-col items-end">
                <div className="text-[10px] uppercase tracking-widest font-medium text-slate-500 mb-6">Connect</div>
                <div className="flex items-center gap-2">
                  {Object.entries(siteConfig.links).map(([name, url], index) => (
                    <Link
                      key={name}
                      href={url}
                      target="_blank"
                      className={`border h-8 w-8 flex items-center justify-center border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-full cursor-pointer group ${
                        index === 4 ? "p-1" : "p-2"
                      }`}
                    >
                      <Image
                        alt={`Webchain ${name}`}
                        width={16}
                        height={16}
                        className="h-full w-full opacity-40 group-hover:opacity-100 transition-opacity"
                        src={`/socials/${name}.svg`}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[10px] font-medium text-slate-600 uppercase tracking-widest">
                © 2026 WebChain Labs Inc.
              </p>
              <div className="flex gap-8 text-[10px] font-medium text-slate-600 uppercase tracking-widest">
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
