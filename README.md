README.md
# 🩺 MedistatInsights – AI Malaria Detection System

MedistatInsights is an AI-powered healthcare application that detects malaria-infected blood cells from microscopic images using a Convolutional Neural Network (CNN). The system combines a TensorFlow deep learning model with a Flask backend and an interactive web dashboard for real-time diagnosis.

---

## 🚀 Features

- 🧠 Deep Learning based Malaria Detection
- 🔬 Blood Cell Image Analysis
- ⚡ Real-time Prediction using TensorFlow
- 🌐 REST API built with Flask
- 🎨 Modern Medical Dashboard UI
- 📊 Confidence Score for Predictions
- 📱 Responsive Design
- 🔄 Drag & Drop Image Upload

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Font Awesome

### Backend
- Flask
- Flask-CORS

### AI / Machine Learning
- TensorFlow
- Keras
- CNN (Convolutional Neural Network)
- NumPy
- Pillow

---

## 📂 Project Structure


Medistat_Project/
│
├── app.py # Flask Backend
├── malaria-cell-cnn.h5 # Trained CNN Model
├── requirements.txt
│
├── static/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
└── README.md


---

## ⚙️ Installation

### 1. Clone Repository
git clone https://github.com/your-username/MedistatInsights-AI-Malaria-Detection.git
cd MedistatInsights-AI-Malaria-Detection

2. Create Virtual Environment
python -m venv venv
Activate Environment
Windows
venv\Scripts\activate
Linux/Mac
source venv/bin/activate

3. Install Dependencies
pip install -r requirements.txt

4. Run Application
python app.py

5. Open Browser
http://localhost:5000

🧪 How It Works
User uploads a microscopic blood cell image.
Flask receives the image.
Image is resized according to model input size.
CNN model processes the image.
Prediction is generated:
Parasitized
Uninfected
Confidence score is displayed on the dashboard.
📊 Prediction Output

Example Response:

{
  "result": "Uninfected",
  "confidence": 0.97
}
🖼️ Dashboard Features
AI Diagnostic Tool
Scan History Panel
Upload & Analyze Interface
Real-Time Results
Confidence Visualization
🔬 Model Information

The project uses a trained CNN model (malaria-cell-cnn.h5) for binary classification:

Class	Description
Parasitized	Malaria Infected Cell
Uninfected	Healthy Cell
📈 Future Improvements
Patient Record Management
PDF Report Generation
Doctor Authentication
Cloud Deployment
Multi-Disease Detection
Explainable AI Visualizations
🤝 Contributing

Contributions are welcome.

