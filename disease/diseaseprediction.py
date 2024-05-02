from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
import csv, numpy as np, pandas as pd
import os

data = pd.read_csv(os.path.join("Training.csv"))
df = pd.DataFrame(data)
cols = df.columns
cols = cols[:-1]
x = df[cols]
y = df['prognosis']
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.33, random_state=42)

print("DecisionTree")
dt = DecisionTreeClassifier()
clf_dt = dt.fit(x_train, y_train)

indices = [i for i in range(132)]
symptoms = df.columns.values[:-1]

dictionary = dict(zip(symptoms, indices))


def dosomething(symptoms):
    user_input_symptoms = symptoms.split(',')
    user_input_label = [0 for i in range(132)]
    for symptom in user_input_symptoms:
        idx = dictionary[symptom.strip()]
        user_input_label[idx] = 1

    user_input_label = np.array(user_input_label)
    user_input_label = user_input_label.reshape((-1, 1)).transpose()
    predicted_disease = dt.predict(user_input_label).tolist()

    return predicted_disease[0]


def print_doctor_for_disease(predicted_disease):
    disease_to_doctor = {
        'Fungal infection': 'Dermatologist',
        'Allergy': 'Allergist',
        'GERD': 'Gastroenterologist',
        'Chronic Cholestasis': 'Hepatologist',
        'Drug Reaction': 'General Physician',
        'Peptic ulcer disease': 'Gastroenterologist',
        'AIDS': 'Infectious Disease Specialist',
        'Diabetes': 'Endocrinologist',
        'Gastroenteritis': 'Gastroenterologist',
        'Bronchial Asthma': 'Pulmonologist',
        'Hypertension': 'Cardiologist',
        'Migraine': 'Neurologist',
        'Cervical Spondylosis': 'Orthopedic Surgeon',
        'Paralysis (brain hemorrhage)': 'Neurologist',
        'Jaundice': 'Gastroenterologist',
        'Malaria': 'Infectious Disease Specialist',
        'Chicken pox': 'Pediatrician',
        'Dengue': 'Infectious Disease Specialist',
        'Typhoid': 'Infectious Disease Specialist',
        'Hepatitis A': 'Infectious Disease Specialist',
        'Hepatitis B': 'Infectious Disease Specialist',
        'Hepatitis C': 'Infectious Disease Specialist',
        'Hepatitis D': 'Infectious Disease Specialist',
        'Hepatitis E': 'Infectious Disease Specialist',
        'Alcoholic Hepatitis': 'Gastroenterologist',
        'Tuberculosis': 'Pulmonologist',
        'Common Cold': 'General Physician',
        'Pneumonia': 'Pulmonologist',
        'Dimorphic Hemorrhoids (piles)': 'General Surgeon',
        'Heart Attack': 'Cardiologist',
        'Varicose veins': 'General Physician',
        'Hypothyroidism': 'Endocrinologist',
        'Hyperthyroidism': 'Endocrinologist',
        'Hypoglycemia': 'Endocrinologist',
        'Osteoarthritis': 'Rheumatologist',
        'Arthritis': 'Rheumatologist',
        '(Vertigo) Paroxysmal Positional Vertigo': 'ENT Specialist',
        'Acne': 'Dermatologist',
        'Urinary tract infection': 'Urologist',
        'Psoriasis': 'Dermatologist',
        'Impetigo': 'Dermatologist'
    }
    return disease_to_doctor.get(predicted_disease, 'Unknown')


# Example usage
predicted_disease = dosomething("skin_rash,itching,nodal_skin_eruptions,continuous_sneezing,shivering")
print("Predicted disease:", predicted_disease)
doctor_for_disease = print_doctor_for_disease(predicted_disease)
print("Doctor for disease:", doctor_for_disease)
