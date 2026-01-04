# Feather Scan - API

Express & TypeScript backend API for bird species recognition.

## Features
- Classify bird species using pretrained ResNet model from Hugging Face
- Accept image uploads and return prediction results
- Provide bird species info integrated via Gemini
- RESTful API endpoints for integration with frontend

## Tech Stack
- Node.js with Express
- TypeScript
- Hugging Face Transformers (ResNet pretrained model)
- Multer for image upload handling

## Setup
1. Clone repo  
2. Run `npm install`  
3. Configure environment variables if needed  
4. Run `npm run dev` to start the server

## API Endpoints
- `POST /classify` — upload image and get classification result
- Additional endpoints for bird info retrieval

## Notes
- Model is loaded on server startup
- Designed to integrate seamlessly with the Feather Scan UI

## License
MIT
