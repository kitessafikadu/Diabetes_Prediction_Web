from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

model = joblib.load("diabetes_prediction_model.pkl")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionInput(BaseModel):
    gender: int
    age: int
    hypertension: int
    heart_disease: int
    smoking_history: int
    bmi: float
    HbA1c_level: float
    blood_glucose_level: int

@app.post("/predict")
def predict(data: PredictionInput):
    try:
        input_features = np.array([[data.gender, data.age, data.hypertension, data.heart_disease, data.smoking_history, data.bmi, data.HbA1c_level, data.blood_glucose_level]])
        
        prediction = model.predict(input_features)
        
        return {"prediction": int(prediction[0])}
    except Exception as e:
        return {"error": str(e)}
