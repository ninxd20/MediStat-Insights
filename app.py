import os
# Disable oneDNN optimizations to prevent some TF warnings
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__, static_folder='static', static_url_path='')
CORS(app) # Allow browser connections

MODEL_PATH = "malaria-cell-cnn.h5"

# --- GLOBAL VARIABLES ---
model = None
TARGET_SIZE = (128, 128) # Default fallback

# --- LOAD MODEL AND DETECT SIZE ---
print("--------------------------------------------------")
if os.path.exists(MODEL_PATH):
    try:
        model = tf.keras.models.load_model(MODEL_PATH)
        print(f"✅ Model loaded: {MODEL_PATH}")
        
        # AUTO-DETECT INPUT SHAPE
        try:
            input_shape = model.input_shape
            # Handle different Keras versions returning different shape formats
            if input_shape and len(input_shape) >= 3:
                # Get height and width (skipping batch dimension if present)
                # Usually shape is (None, 128, 128, 3) or (128, 128, 3)
                if input_shape[0] is None:
                    h, w = input_shape[1], input_shape[2]
                else:
                    h, w = input_shape[0], input_shape[1]
                    
                if h is not None and w is not None:
                    TARGET_SIZE = (h, w)
                    print(f"📏 Model expects images of size: {TARGET_SIZE}")
        except Exception as e:
            print(f"⚠️ Could not detect input shape, using default {TARGET_SIZE}")
            
    except Exception as e:
        print(f"❌ CRITICAL ERROR: Could not load model. {e}")
else:
    print(f"❌ ERROR: File '{MODEL_PATH}' not found. Please run the notebook first.")
print("--------------------------------------------------")


@app.route("/", methods=["GET"])
def home():
    # Serve the HTML file directly
    return app.send_static_file('index.html')

@app.route("/predict", methods=["POST"])
def predict():
    print("\n--- NEW REQUEST RECEIVED ---")
    
    if not model:
        return jsonify({"error": "Model not loaded on server"}), 500

    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    
    try:
        # 1. Open Image
        image = Image.open(io.BytesIO(file.read())).convert("RGB")
        
        # 2. Resize to the AUTO-DETECTED size
        image = image.resize(TARGET_SIZE)
        
        # 3. Normalize (0-1)
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0) # Shape: (1, H, W, 3)

        # 4. Predict
        prediction = model.predict(img_array)
        probability = float(prediction[0][0])
        
        print(f"✅ Prediction Raw Value: {probability}")

        # 5. Result Logic
        # 0 = Parasitized, 1 = Uninfected (Based on the notebook logic usually)
        # However, usually, folders are read alphabetically. 
        # Parasitized (0) vs Uninfected (1).
        # If prob > 0.5 it implies class 1 (Uninfected).
        
        if probability > 0.5:
            label = "Uninfected"
            confidence = probability
        else:
            label = "Parasitized"
            confidence = 1 - probability

        return jsonify({
            "result": label,
            "confidence": confidence
        })
        
    except Exception as e:
        print(f"❌ CRASH DURING PREDICTION: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Backend Error: {str(e)}"}), 500

if __name__ == "__main__":
    # Running on port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)