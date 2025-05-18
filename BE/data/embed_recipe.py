import json
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.docstore.document import Document

# Load recipe data
with open("recipes.json", "r", encoding="utf-8") as f:
    recipes = json.load(f)

# Prepare LangChain documents
docs = []
for recipe in recipes:
    ingredients_text = ", ".join(recipe["ingredients"])
    metadata = {
        "title": recipe["title"],
        "ingredients": recipe["ingredients"],
        "steps": recipe["steps"]
    }
    docs.append(Document(page_content=ingredients_text, metadata=metadata))

# Embed using MiniLM
embedder = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Build vector store
vectorstore = FAISS.from_documents(docs, embedder)

# Save both FAISS and metadata index
vectorstore.save_local("data", index_name="recipe_index")

print("✅ FAISS index + metadata saved at /data/recipe_index.[faiss,pkl]")
print("✅ Recipe metadata saved at /data/recipes.json")