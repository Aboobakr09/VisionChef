import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { allRecipes } from '../data/mockData';
import RecipeInstructions from '../components/RecipeInstructions';
import { optimizeRecipe } from '../services/api';

const CookingPage = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const originalRecipe = allRecipes.find((r) => r.id === recipeId);

  // State for the (possibly optimized) recipe
  const [recipe, setRecipe] = useState(originalRecipe);

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Recipe Not Found</h1>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't find the recipe you're looking for.
          </p>
          <Link
            to="/recipes"
            className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="mb-6">
        <Link
          to="/recipes"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Recipes
        </Link>
      </div>

      <RecipeInstructions recipe={recipe} />

      <div className="mt-8 text-center">
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={async () => {
            if (recipe) {
              const result = await optimizeRecipe(recipe);
              setRecipe(result);
            }
          }}
        >
          ✨ Improve this Recipe
        </button>
      </div>
    </div>
  );
};

export default CookingPage;