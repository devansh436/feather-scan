# https://bird-species-model.onrender.com
# uvicorn main:app --host 0.0.0.0 --port 5000

import io, os, json
from dotenv import load_dotenv
from pathlib import Path
from typing import List, Dict, Optional

from PIL import Image
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from google import genai

from model import classify_bird_or_plant, classify_animal

# ---------- APP ----------
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------- JSON DATA ---------
DATA_PATH = Path("data")
STATIC_TYPES = {"animal", "plant"}

STATIC_DATA: Dict[str, List[Dict]] = {}

load_dotenv()

def load_static_data():
    for t in STATIC_TYPES:
        file_path = DATA_PATH / f"{t}.json"
        if not file_path.exists():
            raise FileNotFoundError(f"{t}.json not found")

        with file_path.open("r", encoding="utf-8") as f:
            STATIC_DATA[t] = json.load(f)

load_static_data()

def get_static_info(species_type: str, label: str) -> Optional[Dict]:
    label = label.lower()
    for item in STATIC_DATA.get(species_type, []):
        if item.get("common_name", "").lower() == label:
            return item
    return None

# ---------- GEMINI ----------
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

llm_cache: Dict[str, Dict] = {}

async def enrich_with_llm(label: str, species_type: str, confidence: float):
    if label in llm_cache:
        return llm_cache[label]
    
    prompt = f"""
Return information about the {species_type} named "{label}" as pure JSON.
DO NOT WRITE IN MARKDOWN TEXT, write in plain-text ONLY.

Keys:
name, scientific_name, confidence, habitat, origin, description

Only return valid JSON, e.g.:
{{
  "name": "Bald Eagle",
  "scientific_name": "Haliaeetus leucocephalus",
  "confidence": 97.3,
  "habitat": "Near large bodies of open water, forests",
  "origin": "North America",
  "description": "A large bird of prey known for its white head and tail."
}}

Rules:
- confidence must be numeric (no %)
- habitat must match the species type
- no markdown, no extra text
"""

    try:
        print('Sending prompt...')
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt        
        )    
        print('Response received...')
        text = response.candidates[0].content.parts[0].text
        data = json.loads(text)
        llm_cache[label] = data
        return data
    except Exception:
        return None


# ---------- ROUTES ----------
@app.post("/predict")
async def predict(
    model_type: str = Form(...),
    file: UploadFile = File(...)
):
        
    if model_type not in ["animal", "bird", "plant"]:
        raise HTTPException(400, "Invalid model type")
    
    image_bytes = await file.read()
    if len(image_bytes) > 5 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File too large.")
    
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    
    try:
        if model_type == 'animal':
            label, confidence = classify_animal(image)
        else:
            label, confidence = classify_bird_or_plant(image, model_type)
        
        species_info = await get_species_info(model_type, label, confidence)
        

        return {
            "label": label,
            "type": model_type,
            "confidence": confidence,
            "info": species_info
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def get_species_info(
    species_type: str,
    label: str,
    confidence: float
) -> Optional[Dict]:
    
    if species_type == 'bird':
        return await enrich_with_llm(label, species_type, confidence)
        
    return get_static_info(species_type, label)

@app.get("/test")
async def health():
    return {"status" : "OK"}

