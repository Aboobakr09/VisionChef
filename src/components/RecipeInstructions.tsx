import React, { useState } from 'react';
import { Recipe } from '../types';
import VoiceCommandButtons from './VoiceCommandButtons';
import { ChevronRight, Check, Clock, Users, ChefHat, Star, Heart, BookmarkPlus, PlayCircle } from 'lucide-react';

interface RecipeInstructionsProps {
  recipe: Recipe;
}

const RecipeInstructions = ({ recipe }: RecipeInstructionsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showNutrition, setShowNutrition] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleNextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
      // Speak the next instruction
      const utterance = new SpeechSynthesisUtterance(recipe.instructions[currentStep + 1]);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleRepeat = () => {
    const utterance = new SpeechSynthesisUtterance(recipe.instructions[currentStep]);
    window.speechSynthesis.speak(utterance);
  };

  const handleStartOver = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    const utterance = new SpeechSynthesisUtterance(recipe.instructions[0]);
    window.speechSynthesis.speak(utterance);
  };

  const toggleStepCompletion = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((step) => step !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl overflow-hidden shadow-soft border border-gray-100">
          {recipe.videoUrl && (
            <div className="relative h-96 bg-gray-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="p-4 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors">
                  <PlayCircle size={48} />
                </button>
              </div>
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
                {recipe.title}
              </h1>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full transition-colors ${
                    isLiked ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                </button>
                <button 
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-2 rounded-full transition-colors ${
                    isSaved ? 'bg-primary-50 text-primary-500' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <BookmarkPlus size={20} className={isSaved ? 'fill-current' : ''} />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{recipe.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock size={16} className="text-primary-500" />
                <span>{recipe.prepTime + recipe.cookTime} min total</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <ChefHat size={16} className="text-primary-500" />
                <span>{recipe.difficulty}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Users size={16} className="text-primary-500" />
                <span>{recipe.servings} servings</span>
              </div>
              {recipe.rating && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Star size={16} className="text-warning-500 fill-current" />
                  <span>{recipe.rating} ({recipe.reviews} reviews)</span>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold text-gray-900">Ingredients</h2>
                  <button
                    onClick={() => setShowNutrition(!showNutrition)}
                    className="text-sm text-primary-500 hover:text-primary-600"
                  >
                    {showNutrition ? 'Hide Nutrition' : 'Show Nutrition'}
                  </button>
                </div>

                {showNutrition && recipe.nutritionInfo && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Protein</div>
                      <div className="font-medium">{recipe.nutritionInfo.protein}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Carbs</div>
                      <div className="font-medium">{recipe.nutritionInfo.carbs}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Fat</div>
                      <div className="font-medium">{recipe.nutritionInfo.fat}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Fiber</div>
                      <div className="font-medium">{recipe.nutritionInfo.fiber}</div>
                    </div>
                  </div>
                )}

                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="bg-primary-100 text-primary-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        •
                      </span>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Instructions</h2>
                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 p-3 rounded-lg transition-colors border ${
                        currentStep === index
                          ? 'bg-primary-50 border-primary-200'
                          : completedSteps.includes(index)
                          ? 'bg-gray-50 border-gray-200 opacity-75'
                          : 'bg-white border-gray-100'
                      }`}
                    >
                      <button
                        onClick={() => toggleStepCompletion(index)}
                        className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center border ${
                          completedSteps.includes(index)
                            ? 'bg-success-500 border-success-500 text-white'
                            : currentStep === index
                            ? 'border-primary-500 text-primary-500'
                            : 'border-gray-300 text-gray-400'
                        }`}
                      >
                        {completedSteps.includes(index) ? (
                          <Check size={14} />
                        ) : currentStep === index ? (
                          <ChevronRight size={14} />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </button>
                      <div
                        className={`${
                          completedSteps.includes(index) ? 'line-through text-gray-500' : 'text-gray-700'
                        }`}
                      >
                        {instruction}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {recipe.tips && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Cook's Tips</h2>
                  <ul className="space-y-2">
                    {recipe.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="bg-primary-100 text-primary-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recipe.variations && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Recipe Variations</h2>
                  <ul className="space-y-2">
                    {recipe.variations.map((variation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="bg-primary-100 text-primary-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                          •
                        </span>
                        <span className="text-gray-700">{variation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* --- Add improvements block here --- */}
              {recipe.improvements?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-primary-600 mb-2">Suggested Improvements</h3>
                  <ul className="list-disc ml-6 text-gray-700">
                    {recipe.improvements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <VoiceCommandButtons
          onNextStep={handleNextStep}
          onRepeat={handleRepeat}
          onStartOver={handleStartOver}
        />

        <div className="bg-white rounded-xl p-4 shadow-soft border border-gray-100">
          <h3 className="font-medium text-gray-900 mb-2">Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
            <div
              className="bg-primary-500 h-2.5 rounded-full"
              style={{
                width: `${((currentStep + 1) / recipe.instructions.length) * 100}%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            Step {currentStep + 1} of {recipe.instructions.length}
          </p>
          
          <div className="mt-4">
            <h3 className="font-medium text-gray-900 mb-2">Jump to Step</h3>
            <div className="grid grid-cols-5 gap-2">
              {recipe.instructions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`h-8 w-full flex items-center justify-center rounded text-sm ${
                    currentStep === index
                      ? 'bg-primary-500 text-white'
                      : completedSteps.includes(index)
                      ? 'bg-success-100 text-success-700 border border-success-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {recipe.author && (
          <div className="bg-white rounded-xl p-4 shadow-soft border border-gray-100">
            <h3 className="font-medium text-gray-900 mb-3">Recipe Author</h3>
            <div className="flex items-center gap-3">
              <img
                src={recipe.author.avatar}
                alt={recipe.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-gray-900">{recipe.author.name}</div>
                <button className="text-sm text-primary-500 hover:text-primary-600">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeInstructions;