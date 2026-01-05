# https://bird-species-model.onrender.com
# uvicorn main:app --host 0.0.0.0 --port 5000

from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
import io
import open_clip


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and processor ONCE
MODELS = {
    "bird": {
        "processor": AutoImageProcessor.from_pretrained("chriamue/bird-species-classifier"),
        "model": AutoModelForImageClassification.from_pretrained("chriamue/bird-species-classifier")
    },
    "plant": {
        "processor": AutoImageProcessor.from_pretrained("dima806/medicinal_plants_image_detection"),
        "model": AutoModelForImageClassification.from_pretrained("dima806/medicinal_plants_image_detection")
    },
}

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
for m in MODELS.values():
    m["model"].to(device)
    m["model"].eval()
torch.set_grad_enabled(False)

CLIP_MODEL_NAME = "hf-hub:imageomics/bioclip-2"
clip_model, _, clip_preprocess = open_clip.create_model_and_transforms(
    CLIP_MODEL_NAME
)
clip_tokenizer = open_clip.get_tokenizer(CLIP_MODEL_NAME)
clip_model.to(device)
clip_model.eval()
ANIMAL_LABELS = [
    "lion",
    "tiger",
    "elephant",
    "zebra",
    "dog",
    "cat",
    "bear",
    "wolf",
    "deer",
    "monkey"
]


def clip_classify(image: Image.Image, labels: list[str]):
    image_tensor = clip_preprocess(image).unsqueeze(0).to(device)
    text_tokens = clip_tokenizer(labels).to(device)

    with torch.no_grad():
        img_feat = clip_model.encode_image(image_tensor)
        txt_feat = clip_model.encode_text(text_tokens)

        img_feat /= img_feat.norm(dim=-1, keepdim=True)
        txt_feat /= txt_feat.norm(dim=-1, keepdim=True)

        similarity = (img_feat @ txt_feat.T).softmax(dim=-1)
        probs = similarity[0].cpu()

    idx = probs.argmax().item()
    return labels[idx], round(100 * probs[idx].item(), 2)



@app.post("/predict")
async def predict(
    model_type: str = Form(...),
    file: UploadFile = File(...)
):
    try:
        if model_type not in ["animal", "bird", "plant"]:
            raise HTTPException(400, "Invalid model type")
        
        image_bytes = await file.read()
        if len(image_bytes) > 5 * 1024 * 1024:
            raise HTTPException(status_code=413, detail="File too large.")
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        
        
        # Bird or Plant classifier
        if model_type != 'animal':
            processor = MODELS[model_type]["processor"]
            model = MODELS[model_type]["model"]
            # raw bytes -> mem buffer -> PIL Image -> RGB
            # convert("RGB") because model expects 3 channel input
            inputs = processor(images=image, return_tensors="pt").to(device)
            
            with torch.inference_mode():
                outputs = model(**inputs)
                logits = outputs.logits # logits is raw weighted sum, not softmaxxed yet
                probs = torch.nn.functional.softmax(logits, dim=-1) # softmax fn
                pred_idx = torch.argmax(probs, dim=-1)
                confidence = round(100*probs[0, pred_idx].item(), 2)
                label = model.config.id2label[pred_idx.item()].title()

            return {"label": label, "confidence": confidence}
        
        # Animal CLIP
        else:
            label, confidence = clip_classify(image, ANIMAL_LABELS)
            print(label, confidence)
            return {
                "label": label, "confidence": confidence
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/test")
async def health():
    return {"status" : "OK"}

