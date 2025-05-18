import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 z-0"></div>
      
      {/* Background pattern */}
      <div className="absolute top-0 left-0 right-0 h-full w-full bg-[url('https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg')] bg-cover bg-center opacity-10 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Your Voice-Assisted <span className="text-primary-500">AI Cooking</span> Companion
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Discover recipes, get step-by-step voice guidance, and cook with confidence. 
            Let VisionChef transform your kitchen experience with AI-powered assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/recipes"
              className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Start Cooking
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary-600 border border-primary-500 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>
      </div>
      
      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff">
          <path d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;