from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from typing import List
from PIL import Image
import io

from Image_Captioning import tag_image_with_blip
from semantic_analyzer import analyze_caption_with_llama
from semantic_retriever import get_recipe_from_semantic_analysis
from optimized_llama import optimize_recipe_with_llama

app = FastAPI(title="VisionChef API", description="AI-powered cooking assistant backend", version="1.0")

class CaptionInput(BaseModel):
    caption: str

class SemanticInput(BaseModel):
    topic: str
    confidence: int
    ingredients: List[str]

class RecipeInput(BaseModel):
    title: str
    ingredients: List[str]
    steps: List[str]

@app.post("/upload-image")
async def upload_image(image: UploadFile = File(...)):
    contents = await image.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    caption = tag_image_with_blip(img)
    return {"caption": caption}

@app.post("/analyze-caption")
def analyze_caption(payload: CaptionInput):
    return analyze_caption_with_llama(payload.caption)

@app.post("/get-recipe")
def get_recipe(payload: SemanticInput):
    return get_recipe_from_semantic_analysis(payload.dict())

@app.post("/optimize-recipe")
def optimize_recipe(payload: RecipeInput):
    return optimize_recipe_with_llama(payload.dict())