from langchain_nvidia_ai_endpoints import ChatNVIDIA
import os
from dotenv import load_dotenv

# === Load API key from .env ===
load_dotenv()
nvidia_api_key = os.getenv("NVIDIA_API_KEY")

# === Setup NVIDIA LLaMA client ===
client = ChatNVIDIA(
    model="meta/llama-3.3-70b-instruct",
    api_key=nvidia_api_key,
    temperature=0.3,
    top_p=0.7,
    max_tokens=1024,
)

# === Semantic Analysis Function ===
def analyze_caption_with_llama(caption: str) -> dict:
    prompt = f"""
You are a kitchen vision assistant. Analyze the following image caption.

Caption: {caption}

Return the result in this exact format:

Image Topic: <main topic>  
Confidence: <confidence as a number only>  
Ingredients: <comma-separated ingredients or 'N/A'>
"""

    try:
        response = client.invoke([{"role": "user", "content": prompt}])
        print("🧠 Raw Output:\n", response.content)

        # Parse manually from structured text
        lines = response.content.strip().split("\n")
        topic = lines[0].split(":", 1)[1].strip()
        confidence = int(lines[1].split(":", 1)[1].strip())
        ingredients_raw = lines[2].split(":", 1)[1].strip()

        ingredients = [] if ingredients_raw.lower() == "n/a" else [i.strip() for i in ingredients_raw.split(",")]

        return {
            "topic": topic,
            "confidence": confidence,
            "ingredients": ingredients
        }

    except Exception as e:
        print(f"❌ Error analyzing caption: {e}")
        return {"topic": "Unknown", "confidence": 0, "ingredients": []}

# === Test Driver ===
if __name__ == "__main__":
    caption = "A healthy spahgetti."
    result = analyze_caption_with_llama(caption)
    print("\n✅ Parsed Result:")
    print(result)
