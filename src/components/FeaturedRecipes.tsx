import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RecipeCard from './RecipeCard';
import { featuredRecipes } from '../data/mockData';

const FeaturedRecipes = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const scrollAmount = container.offsetWidth * 0.8;
    
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(scrollPosition + scrollAmount);
    }
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollRef.current 
    ? scrollPosition < scrollRef.current.scrollWidth - scrollRef.current.offsetWidth
    : true;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Featured Recipes
            </h2>
            <p className="text-gray-600">
              Discover our handpicked selection of delicious recipes to try today.
            </p>
          </div>

          <div className="hidden md:flex gap-2">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full border ${
                canScrollLeft
                  ? 'border-gray-300 hover:bg-gray-100 text-gray-700'
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`p-2 rounded-full border ${
                canScrollRight
                  ? 'border-gray-300 hover:bg-gray-100 text-gray-700'
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredRecipes.map((recipe) => (
              <div 
                key={recipe.id} 
                className="min-w-[280px] md:min-w-[320px] snap-start"
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden flex justify-center mt-6 gap-2">
          <button
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full border ${
              canScrollLeft
                ? 'border-gray-300 hover:bg-gray-100 text-gray-700'
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border ${
              canScrollRight
                ? 'border-gray-300 hover:bg-gray-100 text-gray-700'
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;