# 🩺 MedistatInsights – AI Malaria Detection System

MedistatInsights is an AI-powered healthcare application that detects malaria-infected blood cells from microscopic images using a Convolutional Neural Network (CNN). The system combines a TensorFlow deep learning model with a Flask backend and an interactive web dashboard for real-time diagnosis.

## 🚀 Features

- AI-powered malaria detection
- Blood cell image analysis
- TensorFlow CNN model integration
- Real-time prediction system
- Flask REST API backend
- Interactive healthcare dashboard
- Confidence score visualization
- Responsive user interface

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Flask
- Flask-CORS

### AI / ML
- TensorFlow
- Keras
- CNN (Convolutional Neural Network)
- NumPy
- Pillow

## 📂 Project Structure

```bash
Medistat_Project/
│
├── app.py
├── malaria-cell-cnn.h5
├── requirements.txt
│
├── static/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/MedistatInsights-AI-Malaria-Detection.git

cd MedistatInsights-AI-Malaria-Detection
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Windows

```bash
venv\Scripts\activate
```

Linux/Mac

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Project

```bash
python app.py
```

### Open Browser

```txt
http://localhost:5000
```

## 🔬 How It Works

1. Upload a microscopic blood cell image.
2. The image is preprocessed and resized.
3. TensorFlow CNN analyzes the image.
4. The model predicts whether the cell is infected or healthy.
5. Results are displayed with confidence scores.

## 📊 Prediction Classes

| Class | Description |
|---------|------------|
| Parasitized | Malaria Infected Cell |
| Uninfected | Healthy Cell |

## 📈 Future Enhancements

- Patient record management
- PDF report generation
- Cloud deployment
- Multi-disease detection
- Explainable AI visualizations
- Doctor authentication system

## 🤝 Contributing

Contributions are welcome. Feel free to fork the repository and submit pull requests.

## 👨‍💻 Author

Ninad Tarwate
