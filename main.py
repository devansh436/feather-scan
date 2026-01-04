# https://bird-species-model.onrender.com
# uvicorn main:app --host 0.0.0.0 --port 5000

from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import io

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and processor ONCE
processor = AutoImageProcessor.from_pretrained("chriamue/bird-species-classifier")
model = AutoModelForImageClassification.from_pretrained("chriamue/bird-species-classifier")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()
torch.set_grad_enabled(False)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        if len(image_bytes) > 5 * 1024 * 1024:
            raise HTTPException(status_code=413, detail="File too large.")
        
        # raw bytes -> mem buffer -> PIL Image -> RGB
        # convert("RGB") because model expects 3 channel input
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        inputs = processor(images=image, return_tensors="pt").to(device)

        with torch.inference_mode():
            outputs = model(**inputs)
            logits = outputs.logits # logits is raw weighted sum, not softmaxxed yet
            probs = torch.nn.functional.softmax(logits, dim=-1) # softmax fn
            pred_idx = torch.argmax(probs, dim=-1)
            confidence = round(100*probs[0, pred_idx].item(), 2)
            label = model.config.id2label[pred_idx.item()].title()

        return {"label": label, "confidence": confidence}
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))

@app.get("/test")
async def health():
    return {"status" : "OK"}

