#  Feather Scan

[![Backend Tests](https://github.com/devansh436/feather-scan/actions/workflows/test.yml/badge.svg)](https://github.com/devansh436/feather-scan/actions/workflows/test.yml)
![License](https://img.shields.io/github/license/devansh436/feather-scan)
![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)
![Node](https://img.shields.io/badge/Node-18+-green.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg)

A full-stack image classification web application that identifies birds, plants, and animals using pretrained HuggingFace & BioCLIP machine learning models, with additional species information retrieved from internal datasets and an external LLM API when applicable.

The project focuses on backend architecture, service separation, and reliable API design rather than training custom ML models.



## 📋 Table of Contents
- [Overview](#overview)
- [Application Snapshots](#snapshots)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [License](#license)

## Overview

**Feather Scan** is a three-service web application for classifying uploaded images as **birds, plants, or animals**.

It consists of a **React frontend**, an **Express + TypeScript backend**, and a **FastAPI-based ML inference service**. The backend handles **authentication, validation, file uploads, saving user prediction history in the database**, and mediates all communication with the ML service.

Inference uses **pretrained Hugging Face and BioCLIP models**, with **bird predictions enriched using the Gemini API**.


## Application Snapshots
### Login Page
<p align="center">
  <img src="https://github.com/user-attachments/assets/15761b43-0541-46c9-b71b-1a8015859464" alt="User Login Page" width="800"/>
</p>

### Prediction Result
<p align="center">
  <img src="https://github.com/user-attachments/assets/aff8d154-61e1-4b1b-b8ea-db0113ab1cf4" alt="Prediction result screen" width="800"/>
</p>

### User History (paginated)
<p align="center">
  <img src="https://github.com/user-attachments/assets/2ac9c335-24b9-4cf6-b1cf-d17f9ce9812b" alt="Paginated prediction history" width="800"/>
</p>


## Features
### User-Facing
- Upload an image of (up to 5 MB) and classify it as a bird, plant, or animal
- Animal & plant species information retrieval from database, and bird species enrichment using Gemini API
- Confidence score & additional info returned with each prediction

### Engineering Highlights
- Clear separation between frontend, backend, and ML services
- Centralized request validation and file handling in the backend
- Backend-to-ML communication via HTTP REST APIs
- FastAPI-based ML inference service
- Automated backend tests using Jest and Supertest on push using Github Actions


## Architecture
Feather Scan follows a service-separated architecture to keep concerns isolated and the system easy to reason about.

### Architecture Diagram
```mermaid
graph TD
    Client[Frontend<br/>React + Vite<br/>:5173]
    Backend[Backend API<br/>Express + TypeScript<br/>:3000]
    ML[ML Inference Service<br/>FastAPI<br/>:5000]
    DB[(MongoDB)]
    Auth[Firebase]
    Info[JSON DB]

    Client -->|POST /upload| Backend
    Backend -->|JSON Response| Client

    Backend -->|POST /predict| ML
    ML -->|Prediction Result| Backend
    ML -->|Fetch Species Info| Info

    Backend -->|Validate & Store History| DB
    Backend -->|Verify Token| Auth

```

### Data Flow
1. The client uploads an image along with the selected model type.
2. Backend receives request; authentication is handled via Firebase. The backend verifies ID tokens and associates predictions with user history.
3. The image is forwarded to the ML service for inference:
   - Birds and plants use pretrained Hugging Face models.
   - Animals use BioCLIP for zero-shot classification.
4. For bird predictions, additional species information is generated using Gemini API.
5. For animal & plant predictions, info is retrieved from a database based on predicted label.
6. The backend returns a structured JSON response (label, confidence, info) to the client for display.


## Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FF6F00)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325?logo=jest&logoColor=white)

### ML Service
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![HuggingFace](https://img.shields.io/badge/Hugging%20Face-FFD21E?logo=huggingface&logoColor=black)
![BioCLIP](https://img.shields.io/badge/BioCLIP-Zero--Shot-6A5ACD)

### Tooling
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI-2088FF?logo=githubactions&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?logo=vercel&logoColor=white)



### ML Models
| Category | Model | Source |    Type    |
|----------|-------|--------|------------|
| Birds | `chriamue/bird-species-classifier` | Hugging Face | Pretrained classifier |
| Plants | `dima806/medicinal_plants_image_detection` | Hugging Face | Pretrained classifier |
| Animals | `imageomics/bioclip-2` | BioCLIP | Zero Shot |

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.9 or higher) - [Download](https://www.python.org/)
- **npm** or **yarn** - Comes with Node.js
- **pip** - Python package manager
- **Git** - Version control

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/devansh436/feather-scan.git
cd feather-scan
```

### 2. Install Root Dependencies

```bash
npm install
```

### 3. Install Client Dependencies

```bash
cd client
npm install
cd ..
```

### 4. Install Server Dependencies

```bash
cd server
npm install
cd .. 
```

### 5. Install Model Dependencies

```bash
cd model
pip install -r requirements.txt
cd ..
```

## Configuration

### Environment Variables
Create `.env` files in the respective directories:

#### `client/.env`
```env
VITE_API_BASE=http://localhost:3000
VITE_FIREBASE_API_KEY=<your-key>
VITE_FIREBASE_AUTH_DOMAIN=example-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=example-project-a1b2c3
VITE_FIREBASE_APP_ID=x:123456789:web:e1x1m1p1le
```

#### `server/.env`
```env
PORT=3000
FAST_API_URL=http://localhost:5000/predict
MONGO_URI=<your-mongo-uri>
```

#### `model/.env`
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

## Running the Application

#### Run All Services Concurrently

From the root directory:

```bash
npm run dev
```

This starts all three services simultaneously:
- 🎨 Client: http://localhost:5173
- 🔌 Server: http://localhost:3000
- 🤖 Model: http://localhost:5000


### Accessing the Application

Open your browser and navigate to:
```
http://localhost:5173
```

![Application Interface](https://via.placeholder.com/800x450/1e293b/ffffff? text=Upload+Interface+Screenshot)

## API documentation

### POST /upload

Accepts an image and model type, returns the predicted label and confidence.

**Request**
- contains auth token
- `multipart/form-data`
- `file`: image (jpg/png)
- `modelType`: `bird | plant | animal`

**Response**
```json
{
  "label": "bald eagle",
  "type": "bird",
  "confidence": 0.95,
  "info": {
    "name": "Bald Eagle",
    "scientific_name": "Haliaeetus leucocephalus",
    "habitat": "Near large bodies of open water, forests",
    "origin": "North America",
    "description": "A large bird of prey known for its white head and tail."
  }
}
```

API details are intentionally kept minimal, as the backend is not intended for third-party consumption.


## Project Structure

```
feather-scan/
│
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Auth context
│   │   ├── data.js/       # Static data
│   │   ├── lib/           # firebase setup
│   │   ├── services/      # API calls & auth functions
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── public/            # Static assets
│   ├── package.json
│   └── vite.config.js     # Vite configuration
│
├── server/                # Backend Express API
│   ├── src/
│   │   ├── __tests__/     # Testing setup & files
│   │   ├── routes/        # API routes
│   │   ├── config/        # Configure database, Auth & env variables
│   │   ├── controllers/   # Implementation of routes (History, Upload, User, etc.) 
│   │   ├── middleware/    # Auth middleware
│   │   ├── models/        # User & History models
│   │   ├── validators/    # Model response validation via Zod
│   │   ├── app.ts         # Express app using created routes
│   │   └── index.ts       # Server entry point
│   ├── package.json
│   └── tsconfig.json      # TypeScript config
│
├── model/                 # ML inference service
│   ├── data/              # Static species data
│   ├── main.py            # FastAPI application
│   ├── model.py           # Model loading & inference
│   └── requirements.txt  # Python dependencies
│
├── .github/
│   └── workflows/         # CI/CD workflows
│       └── test.yml       # Automated testing
│
├── package.json           # Root package (scripts)
└── README.md
```


## Testing

Run backend tests: 

```bash
cd server
npm test
```

Tests are automatically run on push via GitHub Actions.


## Key Engineering Decisions

- Used pretrained ML models to focus on backend architecture and system integration.
- Isolated ML inference into a separate FastAPI service to keep the Node.js backend non-blocking.
- Centralized validation and file handling in the backend to avoid exposing the ML service.
- Implemented backend testing early using Jest and Supertest to ensure API stability.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


**Built with ❤️ by [devansh436](https://github.com/devansh436)**
