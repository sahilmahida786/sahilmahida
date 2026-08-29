"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScrollProgress = () => {
      if (!progressBarRef.current) return;
      
      const scrollElement = document.documentElement;
      const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
      
      if (scrollHeight <= 0) return;
      
      const scrollProgress = window.scrollY / scrollHeight;
      
      // Use scaleX for GPU acceleration, avoiding layout thrashing
      progressBarRef.current.style.transform = `scaleX(${scrollProgress})`;
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    
    // Initial call
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left bg-accent pointer-events-none scale-x-0 transition-transform duration-75 ease-out motion-reduce:hidden" ref={progressBarRef} aria-hidden="true" />
  );
}
