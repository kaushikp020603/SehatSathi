import cv2
import os
from flask import Flask, request, jsonify
from datetime import date, datetime
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
import pandas as pd
import joblib
from flask_cors import CORS
import diseaseprediction


app = Flask(__name__)

CORS(app)


nimgs = 10

# Saving Date today in 2 different formats
datetoday = date.today().strftime("%m_%d_%y")
datetoday2 = date.today().strftime("%d-%B-%Y")

# Initializing VideoCapture object to access WebCam
face_detector = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# If these directories don't exist, create them
if not os.path.isdir('Attendance'):
    os.makedirs('Attendance')
if not os.path.isdir('static'):
    os.makedirs('static')
if not os.path.isdir('static/faces'):
    os.makedirs('static/faces')
if f'Attendance-{datetoday}.csv' not in os.listdir('Attendance'):
    with open(f'Attendance/Attendance-{datetoday}.csv', 'w') as f:
        f.write('Name,Roll,Time')

def extract_faces(img):
    try:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        face_points = face_detector.detectMultiScale(gray, 1.2, 5, minSize=(20, 20))
        return face_points
    except:
        return []

def identify_face(facearray):
    model = joblib.load('static/face_recognition_model.pkl')
    return model.predict(facearray)

def train_model():
    faces = []
    labels = []
    userlist = os.listdir('static/faces')
    for user in userlist:
        for imgname in os.listdir(f'static/faces/{user}'):
            img = cv2.imread(f'static/faces/{user}/{imgname}')
            resized_face = cv2.resize(img, (50, 50))
            faces.append(resized_face.ravel())
            labels.append(user)
    faces = np.array(faces)
    knn = KNeighborsClassifier(n_neighbors=5)
    knn.fit(faces, labels)
    joblib.dump(knn, 'static/face_recognition_model.pkl')

def extract_attendance():
    df = pd.read_csv(f'Attendance/Attendance-{datetoday}.csv')
    names = df['Name']
    rolls = df['Roll']
    times = df['Time']
    l = len(df)

    # Calculate attendance percentage for each user
    attendance_counts = df['Name'].value_counts()
    total_sessions = l  # Total number of sessions
    attendance_percentage = {}
    for name, count in attendance_counts.items():
        attendance_percentage[name] = (count /1) * 100

    return names, rolls, times, l, attendance_percentage

def add_attendance(name):
    username = name.split('_')[0]
    userid = str(name.split('_')[1])  # Ensure user ID is treated as string
    current_time = datetime.now().strftime("%H:%M:%S")

    df = pd.read_csv(f'Attendance/Attendance-{datetoday}.csv')
    if userid not in df['Roll'].values:  # Converted userid to string here
        with open(f'Attendance/Attendance-{datetoday}.csv', 'a') as f:
            f.write(f'\n{username},{userid},{current_time}')

@app.route('/api/attendance', methods=['GET'])
def get_attendance():
    names, rolls, times, l, attendance_percentage = extract_attendance()
    return jsonify({
        'names': names.tolist(),
        'rolls': rolls.tolist(),
        'times': times.tolist(),
        'totalReg': l,
        'attendancePercentage': attendance_percentage
    })

@app.route('/api/add-user', methods=['POST'])
def add_user():
    try:
        newusername = request.form.get('newusername')
        newuserid = str(request.form.get('newuserid'))  # Ensure user ID is treated as string
        if not newusername or not newuserid:
            return jsonify({'error': 'Missing username or userid'}), 400

        userimagefolder = 'static/faces/'+newusername+'_'+newuserid
        if not os.path.isdir(userimagefolder):
            os.makedirs(userimagefolder)
        i, j = 0, 0
        cap = cv2.VideoCapture(0)
        while 1:
            _, frame = cap.read()
            faces = extract_faces(frame)
            for (x, y, w, h) in faces:
                cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 20), 2)
                cv2.putText(frame, f'Images Captured: {i}/{nimgs}', (30, 30),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 20), 2, cv2.LINE_AA)
                if j % 5 == 0:
                    name = newusername + '_' + str(i) + '.jpg'
                    cv2.imwrite(userimagefolder + '/' + name, frame[y:y+h, x:x+w])
                    i += 1
                j += 1
            if j == nimgs*5:
                break
            cv2.imshow('Adding new User', frame)
            if cv2.waitKey(1) == 27:
                break
        cap.release()
        cv2.destroyAllWindows()
        print('Training Model')
        train_model()
        return jsonify({'message': 'User added successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
        
@app.route('/api/start-attendance', methods=['GET'])
def start_attendance():
    try:
        # Check if the face recognition model exists
        if 'face_recognition_model.pkl' not in os.listdir('static'):
            return jsonify({'error': 'There is no trained model in the static folder. Please add a new face to continue.'}), 400

        ret = True
        cap = cv2.VideoCapture(0)
        while ret:
            ret, frame = cap.read()
            if len(extract_faces(frame)) > 0:
                (x, y, w, h) = extract_faces(frame)[0]
                cv2.rectangle(frame, (x, y), (x+w, y+h), (86, 32, 251), 1)
                cv2.rectangle(frame, (x, y), (x+w, y-40), (86, 32, 251), -1)
                face = cv2.resize(frame[y:y+h, x:x+w], (50, 50))
                identified_person = identify_face(face.reshape(1, -1))[0]
                # Convert user ID to string
                add_attendance(str(identified_person))
                cv2.putText(frame, f'{identified_person}', (x+5, y-5),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
            cv2.imshow('Attendance', frame)
            key = cv2.waitKey(1)
            if key == 27:  # Escape key (27 in ASCII)
                break
        cap.release()
        cv2.destroyAllWindows()

        # After attendance is taken, extract and return updated attendance data
        names, rolls, times, l, attendance_percentage = extract_attendance()
        return jsonify({
            'names': names.tolist(),
            'rolls': rolls.tolist(),
            'times': times.tolist(),
            'totalReg': l,
            'attendancePercentage': attendance_percentage
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/attendance_data')
def get_attendance_data():
    names, rolls, times, l, attendance_percentage = extract_attendance()

    # Convert Pandas Series objects to lists
    names = names.tolist()
    rolls = rolls.tolist()
    times = times.tolist()

    # Convert attendance_percentage dictionary values to float
    attendance_percentage = {name: float(percentage) for name, percentage in attendance_percentage.items()}

    data = {
        'names': names,
        'rolls': rolls,
        'times': times,
        'total_sessions': l,
        'attendance_percentage': attendance_percentage
    }
    return jsonify(data)




if __name__ == "__main__":
    app.run(debug=True, port=8100)

                   
