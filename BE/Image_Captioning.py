import torch
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration

# Load once (use globally or cache in your app)
device = "cuda" if torch.cuda.is_available() else "cpu"
precision = torch.float16 if device == "cuda" else torch.float32

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base", use_fast=True)
model = BlipForConditionalGeneration.from_pretrained(
    "Salesforce/blip-image-captioning-base",
    torch_dtype=precision
).to(device)

def tag_image_with_blip(image: Image.Image, prompt: str = None) -> str:
    """
    Generates a food-related caption for an image using the BLIP model.
    If a prompt is provided (e.g., "What ingredients are in this image?"),
    it performs conditional captioning. Otherwise, it returns a general caption.
    """
    if prompt:
        inputs = processor(image, prompt, return_tensors="pt").to(device, precision)
    else:
        inputs = processor(image, return_tensors="pt").to(device, precision)

    with torch.no_grad():
        output = model.generate(**inputs)
        caption = processor.decode(output[0], skip_special_tokens=True)
    
    return caption


# Example usage
if __name__ == "__main__":
    # Load an image
    image_path = "sample_food.jpg"
    image = Image.open(image_path).convert("RGB")

    # Generate caption
    caption = tag_image_with_blip(image)
    print(f"Generated Caption: {caption}")

    # Conditional captioning with a prompt
    prompt = "A delicious dish with"
    conditional_caption = tag_image_with_blip(image, prompt)
    print(f"Conditional Caption: {conditional_caption}")