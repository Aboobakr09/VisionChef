import React, { useState, useEffect } from 'react';
import { Search, FilterX, Clock, ChefHat } from 'lucide-react';
import { cuisines, allRecipes } from '../data/mockData';
import { FilterOptions, Recipe } from '../types';
import RecipeCard from './RecipeCard';

const RecipeSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    cuisine: '',
    prepTime: null,
    cookTime: null,
    difficulty: null,
  });
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const prepTimeOptions = [
    { value: 15, label: 'Under 15 min' },
    { value: 30, label: 'Under 30 min' },
    { value: 60, label: 'Under 1 hour' },
  ];

  const difficultyOptions = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
  ];

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const results = allRecipes.filter(recipe => {
          const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              recipe.ingredients.some(ingredient => 
                                ingredient.toLowerCase().includes(searchQuery.toLowerCase()));
          
          const matchesCuisine = !filters.cuisine || recipe.cuisine.toLowerCase() === filters.cuisine.toLowerCase();
          const matchesPrepTime = !filters.prepTime || recipe.prepTime <= filters.prepTime;
          const matchesDifficulty = !filters.difficulty || recipe.difficulty === filters.difficulty;

          return matchesSearch && matchesCuisine && matchesPrepTime && matchesDifficulty;
        });
        setSearchResults(results);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, filters]);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const resetFilters = () => {
    setFilters({
      cuisine: '',
      prepTime: null,
      cookTime: null,
      difficulty: null,
    });
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  return (
    <section className="py-10 bg-gray-50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
              Find Your Perfect Recipe
            </h2>
            <p className="text-gray-600">
              Search by name, ingredient, or use filters to discover your next meal.
            </p>
          </div>

          <div className="relative">
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search recipes or ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                />
                <Search 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
              </div>
              <button
                onClick={toggleFilters}
                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-3 rounded-r-lg flex items-center justify-center transition-colors"
              >
                <ChefHat size={20} />
              </button>
            </div>

            {filtersVisible && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow-soft border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-900">Filters</h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1"
                  >
                    <FilterX size={16} />
                    Reset
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cuisine
                    </label>
                    <select
                      value={filters.cuisine}
                      onChange={(e) => handleFilterChange('cuisine', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    >
                      <option value="">All Cuisines</option>
                      {cuisines.map((cuisine) => (
                        <option key={cuisine.id} value={cuisine.id}>
                          {cuisine.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prep Time
                    </label>
                    <select
                      value={filters.prepTime || ''}
                      onChange={(e) => 
                        handleFilterChange('prepTime', e.target.value ? Number(e.target.value) : null)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    >
                      <option value="">Any Time</option>
                      {prepTimeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty
                    </label>
                    <select
                      value={filters.difficulty || ''}
                      onChange={(e) => 
                        handleFilterChange('difficulty', e.target.value || null)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    >
                      <option value="">Any Difficulty</option>
                      {difficultyOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {isSearching ? (
            <div className="mt-8 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-2 text-gray-600">Searching recipes...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : searchQuery && (
            <div className="mt-8 text-center">
              <p className="text-gray-600">No recipes found. Try different search terms or filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecipeSearch;