[![Backend Tests](https://github.com/devansh436/feather-scan/actions/workflows/test.yml/badge.svg?branch=main&event=pull_request)](https://github.com/devansh436/feather-scan/actions/workflows/test.yml)
![Node](https://img.shields.io/badge/node-24.1.0-brightgreen)
![License](https://img.shields.io/github/license/devansh436/feather-scan)

# Feather Scan
## Overview

A full-stack ML application that classifies birds, plants, and animals from images and provides detailed species information using deep learning and AI.

## Architecture

Three-tier system:
- **Client** (React + Vite) - User interface on port 5173
- **Server** (Express + TypeScript) - API middleware on port 3000
- **Model** (FastAPI + Python) - ML inference on port 5000

## Data Flow

```
User (Browser)
    │
    ├─> 1. Upload image + select type (bird/plant/animal)
    │
    ▼
Client (React)
    │
    ├─> 2. POST /upload → FormData(image, modelType)
    │
    ▼
Server (Express:3000)
    │
    ├─> 3. POST /predict → Forward to ML service
    │
    ▼
Model (FastAPI:5000)
    │
    ├─> 4a. Classify Image:
    │       • Birds/Plants: HuggingFace models
    │       • Animals: BioCLIP zero-shot
    │
    ├─> 4b. Enrich Info:
    │       • Birds: Gemini AI (cached)
    │       • Others: Static JSON
    │
    ├─> 5. Return: {label, type, confidence, info}
    │
    ▼
Server → Client → User
    │
    └─> 6. Display species details
```

## Tech Stack

**Client:** React, Vite, Bootstrap, React Router  
**Server:** Express, TypeScript, Multer, Axios  
**Model:** FastAPI, PyTorch, Transformers, OpenCLIP, Gemini AI

### ML Models
- **Bird:** `chriamue/bird-species-classifier`
- **Plant:** `dima806/medicinal_plants_image_detection`
- **Animal:** `imageomics/bioclip-2` (BioCLIP)

## Environment Setup

```env
# client/.env
VITE_HOST_URL=http://localhost:3000/upload

# server/.env
PORT=3000
FAST_API_URL=http://localhost:5000/predict
GEMINI_API_KEY=your_key
GEMINI_MODEL=gemini-2.5-flash

# model/.env
GEMINI_API_KEY=your_key
GEMINI_MODEL=gemini-2.5-flash
```

## Running

Run all services concurrently:
```bash
npm run dev
```

Or individually:
```bash
npm run model   # Python ML (port 5000)
npm run server  # Express API (port 3000)
npm run client  # React UI (port 5173)
```

## API Endpoints

**Server (Express)**
- `POST /upload` - Upload image, returns classification + info
- `GET /test` - Health check

**Model (FastAPI)**
- `POST /predict` - Classify image (params: `file`, `modelType`)
- `GET /test` - Health check

## Features

- Multi-model support (bird/plant/animal)
- AI-powered species information via Gemini
- Response caching for efficiency
- File validation (max 5MB)
- CORS enabled for development
