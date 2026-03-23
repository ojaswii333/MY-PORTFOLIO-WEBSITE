'use client';

import { useState, useCallback } from 'react';

import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEasterEgg, EasterEggOverlay } from '@/components/EasterEgg';

import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';
import Experience from '@/sections/Experience';
import Contact from '@/sections/Contact';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { unlocked, dismiss } = useEasterEgg();

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={handleLoadingComplete} />}
      <CustomCursor />
      <EasterEggOverlay unlocked={unlocked} onDismiss={dismiss} />

      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
