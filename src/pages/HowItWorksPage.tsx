import React from 'react';
import { Camera, Mic, ChefHat, Search } from 'lucide-react';

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <Search size={32} className="text-primary-500" />,
      title: 'Find a Recipe',
      description:
        'Search for recipes by name, cuisine, or ingredients. Use filters to narrow down results based on prep time and difficulty.',
      imageUrl: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    },
    {
      icon: <Camera size={32} className="text-primary-500" />,
      title: 'Scan Your Ingredients',
      description:
        'Take a photo of ingredients you have, and our AI will detect them and suggest recipes you can make with what you have on hand.',
      imageUrl: 'https://images.pexels.com/photos/5905521/pexels-photo-5905521.jpeg',
    },
    {
      icon: <ChefHat size={32} className="text-primary-500" />,
      title: 'Follow Step-by-Step Instructions',
      description:
        'Each recipe comes with clear, easy-to-follow instructions. View ingredients, preparation steps, and cooking times all in one place.',
      imageUrl: 'https://images.pexels.com/photos/4049896/pexels-photo-4049896.jpeg',
    },
    {
      icon: <Mic size={32} className="text-primary-500" />,
      title: 'Use Voice Commands',
      description:
        'Keep your hands free while cooking. Use voice commands to navigate through recipe steps, repeat instructions, or start over.',
      imageUrl: 'https://images.pexels.com/photos/7545532/pexels-photo-7545532.jpeg',
    },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            How VisionChef Works
          </h1>
          <p className="text-xl text-gray-600">
            Your AI-powered cooking companion that makes cooking easy, interactive,
            and fun with voice assistance and ingredient recognition.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 items-center`}
            >
              <div className="w-full md:w-1/2">
                <div
                  className="rounded-xl overflow-hidden shadow-medium h-64 md:h-80 w-full"
                  style={{
                    backgroundImage: `url(${step.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-soft border border-gray-100">
                  <div className="mb-4">{step.icon}</div>
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">
                    {step.title}
                  </h2>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
            Ready to Transform Your Cooking Experience?
          </h2>
          <a
            href="/recipes"
            className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-medium transition-colors text-lg"
          >
            Start Cooking with VisionChef
          </a>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;