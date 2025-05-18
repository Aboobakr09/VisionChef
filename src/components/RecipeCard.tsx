import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChefHat, Users, Star, Heart, BookmarkPlus } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  size?: 'small' | 'medium' | 'large';
}

const RecipeCard = ({ recipe, size = 'medium' }: RecipeCardProps) => {
  const { id, title, description, imageUrl, prepTime, cookTime, difficulty, servings, rating, reviews } = recipe;

  const totalTime = prepTime + cookTime;

  const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-success-500 text-white';
      case 'Medium':
        return 'bg-warning-500 text-white';
      case 'Hard':
        return 'bg-error-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const cardSizeClass = {
    small: 'h-48',
    medium: 'h-64',
    large: 'h-80',
  };

  return (
    <div className="group relative">
      <Link
        to={`/cooking/${id}`}
        className="block rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-shadow duration-300"
      >
        <div className="relative">
          <div className={`${cardSizeClass[size]} w-full overflow-hidden`}>
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(
                difficulty
              )}`}
            >
              {difficulty}
            </span>
          </div>
        </div>

        <div className="bg-white p-4">
          <h3 className="font-display font-semibold text-lg text-gray-900 mb-1 group-hover:text-primary-500 transition-colors">
            {title}
          </h3>
          {size !== 'small' && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
          )}

          <div className="flex items-center gap-2 mb-3">
            {rating && (
              <div className="flex items-center">
                <Star className="w-4 h-4 text-warning-500 fill-current" />
                <span className="ml-1 text-sm font-medium">{rating}</span>
                {reviews && (
                  <span className="text-gray-500 text-sm ml-1">({reviews})</span>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{totalTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat size={14} />
              <span>{difficulty}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{servings} servings</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 bg-white rounded-full shadow-md hover:bg-primary-50 text-gray-700 hover:text-primary-500 transition-colors">
          <Heart size={16} />
        </button>
        <button className="p-2 bg-white rounded-full shadow-md hover:bg-primary-50 text-gray-700 hover:text-primary-500 transition-colors">
          <BookmarkPlus size={16} />
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;