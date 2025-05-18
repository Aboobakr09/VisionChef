from langchain_nvidia_ai_endpoints import ChatNVIDIA
import os
from dotenv import load_dotenv
import json
import re

load_dotenv()
nvidia_api_key = os.getenv("NVIDIA_API_KEY")

llm = ChatNVIDIA(
    model="meta/llama-3.3-70b-instruct",
    api_key=nvidia_api_key,
    temperature=0.3,
    top_p=0.7,
    max_tokens=1500,
)

def optimize_recipe_with_llama(recipe: dict) -> dict:
    """
    Analyze and return an updated recipe with any suggested improvements.
    """
    prompt = f"""
You are a professional recipe optimizer.

Given the following recipe, check if any improvements are needed.
If improvements can be made, return a **modified** version of the recipe with better ingredients or steps.

Respond ONLY in this JSON format:

{{
  "improvement_applied": true or false,
  "improvements": ["list of suggestions or 'None'"],
  "title": "updated title (if changed)",
  "ingredients": ["updated list"],
  "steps": ["step 1", "step 2", ...]
}}

Recipe Title: {recipe['title']}

Ingredients:
{json.dumps(recipe['ingredients'], indent=2)}

Steps:
{json.dumps(recipe['steps'], indent=2)}
"""

    try:
        response = llm.invoke([{"role": "user", "content": prompt}])
        content = response.content.strip()

        # Try parsing JSON directly
        match = re.search(r"\{.*\}", content, re.DOTALL)
        if match:
            parsed = json.loads(match.group())
            return parsed

        return {
            "error": "Model did not return valid JSON.",
            "raw_output": content
        }

    except Exception as e:
        return {
            "error": str(e),
            "raw_output": ""
        }

if __name__ == "__main__":
    # A sample recipe dict
    sample_recipe = {
        "title": "Simple Pasta",
        "ingredients": [
            "200g spaghetti",
            "2 tbsp olive oil",
            "1 clove garlic, minced",
            "100g cherry tomatoes, halved",
            "salt",
            "pepper"
        ],
        "steps": [
            "Cook the spaghetti according to package instructions.",
            "Heat olive oil in a pan and sauté garlic until fragrant.",
            "Add tomatoes, season with salt and pepper, and cook for 5 minutes.",
            "Toss in the drained spaghetti and mix well.",
            "Serve hot."
        ]
    }

    optimized = optimize_recipe_with_llama(sample_recipe)
    print("🔄 Optimized Recipe:")
    print(json.dumps(optimized, indent=2))
