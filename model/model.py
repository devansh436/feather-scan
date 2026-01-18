# model.py
import torch, io, open_clip
from PIL import Image
from transformers import AutoImageProcessor, AutoModelForImageClassification

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


# ---------- PREDICTION FUNCTIONS ----------
def classify_bird_or_plant(image: Image.Image, modelType: str):
    processor = MODELS[modelType]["processor"]
    model = MODELS[modelType]["model"]

    inputs = processor(images=image, return_tensors="pt").to(device)

    with torch.inference_mode():
        outputs = model(**inputs)
        probs = torch.softmax(outputs.logits, dim=-1)
        idx = probs.argmax(dim=-1).item()
        confidence = round(100 * probs[0, idx].item(), 2)
        label = model.config.id2label[idx].title()

    if label == 'Gauva':
        label = 'Guava'
    elif label == 'Nooni':
        label = 'Noni'
    print(label)
    return label, confidence


def classify_animal(image: Image.Image):
    image_tensor = clip_preprocess(image).unsqueeze(0).to(device)
    text_tokens = clip_tokenizer(ANIMAL_LABELS).to(device)

    with torch.no_grad():
        img_feat = clip_model.encode_image(image_tensor)
        txt_feat = clip_model.encode_text(text_tokens)

        img_feat /= img_feat.norm(dim=-1, keepdim=True)
        txt_feat /= txt_feat.norm(dim=-1, keepdim=True)

        similarity = (img_feat @ txt_feat.T).softmax(dim=-1)
        probs = similarity[0].cpu()

    idx = probs.argmax().item()
    return ANIMAL_LABELS[idx], round(100 * probs[idx].item(), 2)