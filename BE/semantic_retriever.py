import os
import json
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

# Point this at the **folder** where you did vectorstore.save_local()
FAISS_FOLDER = os.path.join(os.path.dirname(__file__), "data")
JSON_PATH    = os.path.join(FAISS_FOLDER, "recipe_vectors.json")

def load_vectorstore():
    emb = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vs  = FAISS.load_local(
        FAISS_FOLDER,
        emb,
        index_name="recipe_index",  # ✅ THIS LINE FIXES THE MISSING .pkl ERROR
        allow_dangerous_deserialization=True
    )

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        recipes = json.load(f)

    return vs, recipes

def get_recipe_from_semantic_analysis(semantic: dict, top_k=3):
    if not semantic.get("ingredients"):
        return {"error": "No ingredients found in semantic analysis."}

    query = " ".join(semantic["ingredients"])
    vs, recipes = load_vectorstore()

    results = vs.similarity_search_with_score(query, k=top_k)

    matched = []
    for doc, score in results:
        matched.append({
            "title":       doc.metadata["title"],
            "score":       round(score, 3),
            "ingredients": doc.metadata.get("ingredients", []),
            "steps":       doc.metadata.get("steps", [])
        })

    return {
        "query_ingredients": semantic["ingredients"],
        "matched_recipes":   matched
    }

if __name__ == "__main__":
    sem = {"topic":"Pasta","confidence":95,"ingredients":["spaghetti","tomato sauce","basil"]}
    print(get_recipe_from_semantic_analysis(sem))