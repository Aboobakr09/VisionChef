import React, { useState } from 'react';
import RecipeSearch from '../components/RecipeSearch';
import RecipeCard from '../components/RecipeCard';
import { allRecipes, cuisines } from '../data/mockData';
import { FilterOptions } from '../types';
import { getSpeech } from '../services/ttsService';
import { useTranslation } from 'react-i18next';

const RecipesPage = () => {
    const { t } = useTranslation();
    const [filters, setFilters] = useState<FilterOptions>({
        cuisine: '',
        prepTime: null,
        cookTime: null,
        difficulty: null,
    });

    // Filter recipes based on active filters
    const filteredRecipes = allRecipes.filter((recipe) => {
        if (filters.cuisine && recipe.cuisine.toLowerCase() !== filters.cuisine) {
            return false;
        }
        if (filters.prepTime && recipe.prepTime > filters.prepTime) {
            return false;
        }
        if (filters.difficulty && recipe.difficulty !== filters.difficulty) {
            return false;
        }
        return true;
    });

    const handleTextToSpeech = async (text: string) => {
        try {
            const translatedText = t(text);
            const audioUrl = await getSpeech(translatedText);
            const audio = new Audio(audioUrl);
            audio.play();
        } catch (error) {
            console.error('Error playing speech:', error);
        }
    };

    return (
        <div className="pt-20">
            <RecipeSearch />
            
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-3xl font-display font-bold text-gray-900 mb-6">
                        All Recipes
                    </h1>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredRecipes.map((recipe) => (
                            <div key={recipe.id}>
                                <RecipeCard recipe={recipe} />
                                <button onClick={() => handleTextToSpeech(recipe.instructions.join(' '))} className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">
                                    Listen to Instructions
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    {filteredRecipes.length === 0 && (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No recipes found</h3>
                            <p className="text-gray-600">
                                Try adjusting your search or filters to find what you're looking for.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default RecipesPage;