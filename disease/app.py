from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import diseaseprediction

app = Flask(__name__)
CORS(app)

with open('Testing.csv', newline='') as f:
    reader = csv.reader(f)
    symptoms = next(reader)
    symptoms = symptoms[:len(symptoms)-1]

@app.route('/', methods=['GET'])
@app.route('/disease_predict', methods=['POST'])
def disease_predict():
    try:
        symptoms_data = request.json.get('symptoms', [])
        print("Received symptoms:", symptoms_data)  # Log received symptoms
        predicted_disease = diseaseprediction.dosomething(symptoms_data)
        print("Predicted disease:", predicted_disease)  # Log predicted disease
        
        # Get the predicted doctor
        predicted_doctor = diseaseprediction.print_doctor_for_disease(predicted_disease)
        print("Predicted doctor:", predicted_doctor)  # Log predicted doctor
        
        return jsonify({"doctor": predicted_doctor}), 200
    except Exception as e:
        print("Error predicting disease:", e)  # Log any errors
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=8100)
