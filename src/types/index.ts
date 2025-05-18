export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  cuisine: string;
  prepTime: number;
  cookTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  servings: number;
  calories: number;
  isFeatured?: boolean;
  rating?: number;
  reviews?: number;
  nutritionInfo?: {
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
  author?: {
    name: string;
    avatar: string;
  };
  tips?: string[];
  variations?: string[];
  collections?: string[];
  videoUrl?: string;
}

export interface CuisineType {
  id: string;
  name: string;
}

export interface VoiceCommandStatus {
  isListening: boolean;
  lastCommand?: string;
  status: 'idle' | 'listening' | 'processing';
}

export interface FilterOptions {
  cuisine: string;
  prepTime: number | null;
  cookTime: number | null;
  difficulty: string | null;
  rating?: number | null;
  ingredients?: string[];
  dietary?: string[];
}

export interface Review {
  id: string;
  userId: string;
  recipeId: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  photos?: string[];
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  recipeCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  favorites: string[];
  collections: Collection[];
  reviews: Review[];
}