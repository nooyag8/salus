from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import joblib
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "models")

model_health = joblib.load(os.path.join(MODEL_PATH, "model_health.pkl"))
model_sleep = joblib.load(os.path.join(MODEL_PATH, "model_sleep.pkl"))
model_ex_type = joblib.load(os.path.join(MODEL_PATH, "model_ex_type.pkl"))
model_ex_time = joblib.load(os.path.join(MODEL_PATH, "model_ex_time.pkl"))
model_supps = joblib.load(os.path.join(MODEL_PATH, "model_supps.pkl"))

le_gender = joblib.load(os.path.join(MODEL_PATH, "le_gender.pkl"))
le_condition = joblib.load(os.path.join(MODEL_PATH, "le_condition.pkl"))
le_ex_type = joblib.load(os.path.join(MODEL_PATH, "le_ex_type.pkl"))
mlb = joblib.load(os.path.join(MODEL_PATH, "supplement_encoder.pkl"))


app = FastAPI(title="AI Health Recommendation API")


class PredictRequest(BaseModel):
    userId: int
    date: str
    gender: str
    age: int
    height: float
    weight: float
    goal_weight: float
    step_number: int
    sleep_time: int
    exercised: str
    condition: str

def preprocess_input(data: PredictRequest):
    if data.exercised.lower() == "none":
        ex_type = "none"
        ex_minutes = 0
    else:
        try:
            parts = data.exercised.split("_")
            ex_type = parts[0]
            ex_minutes = int(parts[1])
        except:
            ex_type = "none"
            ex_minutes = 0

    try:
        gender_enc = le_gender.transform([data.gender])[0]
        cond_enc = le_condition.transform([data.condition])[0]
        ex_type_enc = le_ex_type.transform([ex_type])[0]
    except ValueError as e:
        print(f"Encoding Error: {e}")
        gender_enc, cond_enc, ex_type_enc = 0, 0, 0

    bmi = data.weight / ((data.height / 100) ** 2)
    weight_diff = data.weight - data.goal_weight

    features_list = [
        gender_enc, data.age, data.height, data.weight, bmi, weight_diff,
        data.step_number, data.sleep_time, cond_enc, ex_type_enc, ex_minutes
    ]
    
    features = np.array(features_list, dtype=float).reshape(1, -1)
    return features, ex_type, ex_minutes

@app.post("/predict")
def predict(data: PredictRequest):
    features, ex_type, ex_minutes = preprocess_input(data)

    health_score = float(model_health.predict(features)[0])
    cond_str = data.condition.lower()
    
    if cond_str in ["good", "great", "excellent", "soso", "well"]:
        health_score += 20 
    elif cond_str in ["bad", "tired", "exhausted", "indigestion","cold", "flu"]:
        health_score -= 20  
    
    health_score = max(0, min(100, health_score))
    
    rec_sleep = int(model_sleep.predict(features)[0])
    rec_ex_type = model_ex_type.predict(features)[0]
    rec_ex_time = int(model_ex_time.predict(features)[0])

    if data.sleep_time < 4:
        rec_ex_type = "stretching"
        rec_ex_time = 20
        health_score = max(0, health_score - 10)

    negative_conditions = ['bad', 'severe', 'pain', 'tired']
    if data.step_number >= 20000 and data.condition.lower() in negative_conditions:
        rec_ex_type = "rest"
        rec_ex_time = 0
    
    if health_score < 40 and rec_ex_type != "rest":
        if rec_ex_type in ['cardio', 'strength', 'crossfit']:
            rec_ex_type = "yoga"
            rec_ex_time = min(rec_ex_time, 15)

    supp_probs = model_supps.predict_proba(features)
    top_supps = []
    for i, clf in enumerate(model_supps.estimators_):
        prob = supp_probs[i][0][1] if len(supp_probs[i][0]) > 1 else 0
        top_supps.append((mlb.classes_[i], prob))

    top_supps = sorted(top_supps, key=lambda x: x[1], reverse=True)
    ranked_supps = [s[0] for s in top_supps]

    conflict_rules = [
        ("iron", "calcium"),
        ("omega3", "vitamin_e"),
        ("magnesium", "calcium"),
        ("vitamin_c", "iron"),
    ]
    def has_conflict(a, b):
        return (a, b) in conflict_rules or (b, a) in conflict_rules


    chosen = []
    for s in ranked_supps:
        if len(chosen) >= 3:
            break
        
        conflict = any(has_conflict(s, cs) for cs in chosen)
        
        if not conflict:
            chosen.append(s)
            
    rec_supplements = chosen

    recommendations = [
        {"category": "health_score", "content": round(health_score, 2)},
        {"category": "sleep_time", "content": f"{rec_sleep}"},
        {"category": "exercise", "content": f"{rec_ex_type}_{rec_ex_time}"},
        {"category": "supplements", "content": rec_supplements},
    ]

    return {
        "userId": data.userId,
        "date": data.date,
        "finalConditionScore": round(health_score, 2),
        "recommendations": recommendations
    }