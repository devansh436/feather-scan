import open_clip
import torch
from PIL import Image

# choose model
CLIP_MODEL_NAME = "hf-hub:imageomics/bioclip-2"

print("Loading CLIP model...")
clip_model, _, clip_preprocess = open_clip.create_model_and_transforms(CLIP_MODEL_NAME)
clip_tokenizer = open_clip.get_tokenizer(CLIP_MODEL_NAME)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")
clip_model.to(device)
clip_model.eval()

def clip_zero_shot_classify(image: Image.Image, label_list: list[str]):
    """
    image: PIL image
    label_list: list of strings like "lion", "tiger", etc.
    returns: (best_label:str, probs: list[float])
    """

    # preprocess & encode
    image_tensor = clip_preprocess(image).unsqueeze(0).to(device)
    text_tokens = clip_tokenizer(label_list).to(device)

    with torch.no_grad():
        img_feats = clip_model.encode_image(image_tensor)
        txt_feats = clip_model.encode_text(text_tokens)

        img_feats /= img_feats.norm(dim=-1, keepdim=True)
        txt_feats /= txt_feats.norm(dim=-1, keepdim=True)

        similarity = (img_feats @ txt_feats.T).softmax(dim=-1)
        probs = similarity[0].cpu().tolist()

    best_idx = int(torch.argmax(similarity, dim=-1)[0].item())
    return label_list[best_idx], probs


# Test CLIP with the cactus image
if __name__ == "__main__":
    # Load the cactus image
    image_path = "lion.png"
    print(f"\nLoading image: {image_path}")
    image = Image.open(image_path).convert("RGB")
    
    # Define possible plant labels for zero-shot classification
    # label_list = [
    #     ""cactus",
    #     "succulent",
    #     "rose",
    #     "fern",
    #     "palm tree",
    #     "orchid",
    #     "sunflower",
    #     "tulip",
    #     "tree",
    #     "grass""
    # ]
    label_list = [
        "lion",
        "tiger",
        "cat",
        "dog",
        "zebra"
    ]
    
    print(f"\nClassifying with labels: {label_list}")
    best_label, probs = clip_zero_shot_classify(image, label_list)
    
    # Print results
    print("\n" + "="*50)
    print("CLIP Zero-Shot Classification Results")
    print("="*50)
    print(f"\nPredicted Label: {best_label}")
    print(f"\nConfidence scores for all labels:")
    for label, prob in zip(label_list, probs):
        print(f"  {label:15s}: {prob*100:5.2f}%")