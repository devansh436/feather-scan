from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch

# Load model and processor
processor = AutoImageProcessor.from_pretrained("chriamue/bird-species-classifier", use_fast=True)
model = AutoModelForImageClassification.from_pretrained("chriamue/bird-species-classifier")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

def predict(image_path):
    try:
        # Load and preprocess image
        image = Image.open(image_path).convert("RGB")
        inputs = processor(images=image, return_tensors="pt").to(device)

        # Perform prediction
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            probabilities = torch.nn.functional.softmax(logits, dim=-1)
            predicted_label = torch.argmax(probabilities, dim=-1)
            confidence = probabilities[0, predicted_label].item()

        # Get class label
        label = model.config.id2label[predicted_label.item()].title()
        print(f"Label: {label}")
        print(f"Confidence: {confidence * 100:.2f}%")
        return label, confidence
    except Exception as e:
        print(f"Error during prediction: {e}")
        return None, None
