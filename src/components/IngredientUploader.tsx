import React, { useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { uploadImage, analyzeCaption, getRecipes } from '../services/api';

const IngredientUploader = (props: { onCaptionReady?: (caption: string) => void }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeImage = () => {
    setSelectedImage(null);
    setDetectedIngredients([]);
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Simulate AI image analysis with a timeout
    setTimeout(() => {
      // Mock detected ingredients
      setDetectedIngredients([
        'Tomatoes',
        'Onions',
        'Bell Peppers',
        'Garlic',
        'Olive Oil',
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // 1. Upload image and get caption
        const { caption } = await uploadImage(file);

        // 2. Analyze caption to get semantic info
        const semantic = await analyzeCaption(caption);
        console.log('🧠 Semantic:', semantic);

        // 3. (Optional) Get recipes based on semantic info
        const recipesResult = await getRecipes(semantic);
        setRecipes(recipesResult.matched_recipes);

        // Notify parent component with the caption
        if (props.onCaptionReady) {
          props.onCaptionReady(caption);
        }
      } catch (error) {
        console.error('Error in image analysis pipeline:', error);
      }
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
            Detect Your Ingredients
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take a photo of ingredients you have, and we'll suggest recipes you can make.
            Simply upload an image or use your camera to get started.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-3">
              {!selectedImage ? (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 h-72 flex flex-col items-center justify-center text-center"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <Upload size={36} className="text-gray-400 mb-3" />
                  <p className="text-gray-500 mb-4">
                    Drag & drop an image here, or click to select
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                      <Upload size={16} />
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                    <label className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary-600 border border-primary-500 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                      <Camera size={16} />
                      Take Photo
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden h-72">
                  <img
                    src={selectedImage}
                    alt="Uploaded ingredients"
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    onClick={removeImage}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <div className="bg-gray-50 p-4 rounded-lg h-full">
                <h3 className="font-medium text-gray-900 mb-3">Detected Ingredients</h3>
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center h-[calc(100%-2rem)]">
                    <div className="animate-pulse w-10 h-10 rounded-full bg-primary-200 mb-3"></div>
                    <p className="text-gray-500 text-sm">Analyzing your ingredients...</p>
                  </div>
                ) : detectedIngredients.length > 0 ? (
                  <ul className="space-y-2">
                    {detectedIngredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="bg-white p-2 px-3 rounded border border-gray-200 text-gray-700 flex justify-between items-center"
                      >
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[calc(100%-2rem)] text-center">
                    <p className="text-gray-500 text-sm">
                      {selectedImage
                        ? 'No ingredients detected. Try another image.'
                        : 'Upload an image to detect ingredients.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {detectedIngredients.length > 0 && (
            <div className="mt-6 text-center">
              <button className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Find Recipes With These Ingredients
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IngredientUploader;