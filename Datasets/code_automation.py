import pandas as pd
import json
from pathlib import Path

def format_recipe(row):
    """Format a row of recipe data into the desired structure."""
    ingredients = [i.strip().lower() for i in str(row["Cleaned-Ingredients"]).split(",") if i.strip()]
    steps = [s.strip() for s in str(row["TranslatedInstructions"]).split(".") if s.strip()]
    tags = [row["Cuisine"].lower()] if pd.notna(row["Cuisine"]) else []
    
    return {
        "title": row["TranslatedRecipeName"],
        "ingredients": ingredients,
        "steps": steps,
        "tags": tags,
        "time_minutes": row["TotalTimeInMins"],
        #"url": row["URL"] if pd.notna(row["URL"]) else None,
        #"image": row["image-url"] if pd.notna(row["image-url"]) else None
    }

def main():
    try:
        # Load the CSV file
        xlsx_path = "Cleaned_Indian_Food_Dataset.csv"
        if not Path(xlsx_path).exists():
            raise FileNotFoundError(f"File not found: {xlsx_path}")
        
        # Read CSV file
        df = pd.read_csv(xlsx_path)
        
        # Validate required columns
        required_columns = [
            "Cleaned-Ingredients", 
            "TranslatedInstructions", 
            "TranslatedRecipeName",
            "Cuisine", 
            "TotalTimeInMins", 
            #"URL", 
            #"image-url"
        ]
        missing_columns = [col for col in required_columns if col not in df.columns]
        if missing_columns:
            raise ValueError(f"Missing required columns: {', '.join(missing_columns)}")
        
        # Apply the formatting function
        recipes = df.apply(format_recipe, axis=1).tolist()
        
        # Save to JSON
        json_path = "recipes_converted.json"
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(recipes, f, indent=2, ensure_ascii=False)
        
        print(f"Successfully converted {len(recipes)} recipes to {json_path}")
        return json_path

    except Exception as e:
        print(f"Error: {str(e)}")
        return None

if __name__ == "__main__":
    main()
