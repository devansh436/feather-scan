from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch
import os

# os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# Load model and processor
processor = AutoImageProcessor.from_pretrained("chriamue/bird-species-classifier", use_fast=True)
model = AutoModelForImageClassification.from_pretrained("chriamue/bird-species-classifier")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

def predict(image_path):
    try:
        # Load and preprocess image from path
        image = Image.open(image_path).convert("RGB")
        inputs = processor(images=image, return_tensors="pt").to(device)

        # Perform prediction
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            predicted_label = torch.argmax(logits, dim=-1)

        # Get class label
        label = model.config.id2label[predicted_label.item()]
        print(label)
        return label
    except Exception as e:
        print(f"Error during prediction: {e}")
        return None