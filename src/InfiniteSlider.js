import React, { useState, useRef, useEffect } from "react";
import "./styles/InfiniteSlider.less";

/**
 * InfiniteSlider - A lightweight carousel component with optional infinite scrolling
 *
 * @param {Object} props
 * @param {React.ReactNode[]} props.children - Slides to display
 * @param {number} props.slideWidth - Width of each slide in pixels (default: 200)
 * @param {number} props.slideHeight - Height of each slide in pixels (default: 220)
 * @param {number} props.slidesToScroll - Number of slides to scroll per click (default: 3)
 * @param {number} props.gap - Gap between slides in pixels (default: 16)
 * @param {boolean} props.showScrollbar - Whether to show the scrollbar (default: true)
 * @param {boolean} props.loop - Enable infinite looping (default: false)
 * @param {boolean} props.autoPlay - Enable auto-play (default: false)
 * @param {number} props.autoPlaySpeed - Auto-play speed in ms (default: 3000)
 */
const InfiniteSlider = ({
  children,
  slideWidth = 200,
  slideHeight = 220,
  slidesToScroll = 3,
  gap = 16,
  showScrollbar = true,
  loop = false,
  autoPlay = false,
  autoPlaySpeed = 3000,
}) => {
  const contentRef = useRef(null);
  const [showStartArrow, setShowLeftArrow] = useState(false);
  const [showEndArrow, setShowRightArrow] = useState(true);
  const isScrollingRef = useRef(false);
  
  // Process slides
  const slides = React.Children.toArray(children) || [];
  const itemCount = slides.length;
  
  // Only enable infinite looping if we have enough slides
  const canLoop = loop && itemCount > slidesToScroll;
  
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    
    // Initial position
    content.scrollLeft = 0;
    
    // Function to update arrow visibility
    const updateArrows = () => {
      if (!content) return;
      
      // For infinite loop, always show both arrows when we have enough slides
      if (canLoop && itemCount > slidesToScroll) {
        setShowLeftArrow(true);
        setShowRightArrow(true);
        return;
      }
      
      const { scrollLeft, scrollWidth, clientWidth } = content;
      const maxScroll = scrollWidth - clientWidth;
      
      // Because of RTL, we need to check the absolute value of scrollLeft
      const scrollLeftAbs = Math.abs(scrollLeft);
      
      const isAtStart = scrollLeftAbs <= 5;
      const isAtEnd = scrollLeftAbs >= maxScroll - 5;
      
      setShowLeftArrow(!isAtStart);
      setShowRightArrow(!isAtEnd);
    };
    
    // Handle scroll events
    const handleScroll = () => {
      if (!content) return;
      updateArrows();
    };
    
    // Set up event listeners
    content.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateArrows);
    
    // Set initial state
    updateArrows();
    
    // Auto-play functionality
    let autoPlayInterval;
    if (autoPlay) {
      autoPlayInterval = setInterval(() => {
        if (!isScrollingRef.current) {
          scrollToNext();
        }
      }, autoPlaySpeed);
    }
    
    return () => {
      content.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateArrows);
      
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    };
  }, [
    slideWidth,
    gap,
    canLoop,
    autoPlay,
    autoPlaySpeed,
    slidesToScroll,
    itemCount
  ]);
  
  // Standard scroll implementation for previous
  const scrollToPrev = () => {
    if (!contentRef.current || isScrollingRef.current) return;
    
    const content = contentRef.current;
    const dir = document.documentElement.dir || document.dir || "ltr";
    const isRTL = dir === "rtl";
    
    // Calculate the amount to scroll
    const scrollSlideDistance = (slideWidth + gap) * slidesToScroll;
    
    // Check if we're at the beginning and loop is enabled
    const isAtStart = Math.abs(content.scrollLeft) <= 5;
    
    if (canLoop && isAtStart) {
      // If at the beginning and loop is enabled, scroll to the end
      isScrollingRef.current = true;
      
      // Get maximum scroll position
      const maxScroll = content.scrollWidth - content.clientWidth;
      
      // Scroll to end
      content.scrollTo({
        left: isRTL ? -maxScroll : maxScroll,
        behavior: "smooth"
      });
      
      // Reset scroll lock after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    } else {
      // Normal scroll - direction is reversed in RTL
      isScrollingRef.current = true;
      content.scrollBy({
        left: isRTL ? scrollSlideDistance : -scrollSlideDistance,
        behavior: "smooth",
      });
      
      // Reset scroll lock after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    }
  };
  
  // Standard scroll implementation for next
  const scrollToNext = () => {
    if (!contentRef.current || isScrollingRef.current) return;
    
    const content = contentRef.current;
    const dir = document.documentElement.dir || document.dir || "ltr";
    const isRTL = dir === "rtl";
    
    // Calculate values for checks
    const scrollSlideDistance = (slideWidth + gap) * slidesToScroll;
    const maxScroll = content.scrollWidth - content.clientWidth;
    const currentScroll = Math.abs(content.scrollLeft);
    
    // Check if we're at the end
    const isAtEnd = maxScroll - currentScroll <= 5;
    
    if (canLoop && isAtEnd) {
      // If at the end and loop is enabled, scroll to the beginning
      isScrollingRef.current = true;
      
      // Scroll to start
      content.scrollTo({
        left: 0,
        behavior: "smooth"
      });
      
      // Reset scroll lock after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    } else {
      // Normal scroll - direction is reversed in RTL
      isScrollingRef.current = true;
      content.scrollBy({
        left: isRTL ? -scrollSlideDistance : scrollSlideDistance,
        behavior: "smooth",
      });
      
      // Reset scroll lock after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    }
  };
  
  return (
    <div className="infinite-slider">
      <div className="infinite-slider__wrapper">
        {showStartArrow && (
          <button
            className="infinite-slider__button infinite-slider__button--start"
            aria-label="Previous"
            onClick={scrollToPrev}
            disabled={isScrollingRef.current}
          >
            ❮
          </button>
        )}
        
        <div
          ref={contentRef}
          className={`infinite-slider__content ${
            showScrollbar ? "" : "infinite-slider__content--hide-scrollbar"
          }`}
        >
          <div 
            className="infinite-slider__body" 
            style={{ gap: `${gap}px` }}
          >
            {slides.map((slide, index) => (
              <div
                className="infinite-slider__slide"
                key={`slide-${index}`}
                style={{
                  width: `${slideWidth}px`,
                  height: `${slideHeight}px`,
                  flexShrink: 0,
                }}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>
        
        {showEndArrow && (
          <button
            className="infinite-slider__button infinite-slider__button--end"
            aria-label="Next"
            onClick={scrollToNext}
            disabled={isScrollingRef.current}
          >
            ❯
          </button>
        )}
      </div>
    </div>
  );
};

export default InfiniteSlider;