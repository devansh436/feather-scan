from model import predict
import sys

# os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

def main():
    if len(sys.argv) != 2:
        print("Error: Invalid arguments. Usage: python model.py <image_path>")
        sys.exit(1)
        
    image_path = sys.argv[1]
    try:
        result = predict(image_path)
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()
