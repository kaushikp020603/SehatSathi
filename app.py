import pyttsx3
import subprocess
import speech_recognition as sr
import os

# Initialize the speech engine
engine = pyttsx3.init()

# Function to make the assistant speak
def speak(audio):
    engine.say(audio)
    engine.runAndWait()

# Function to take voice commands from the user
def takeCommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Bata Bhai kya karu")
        r.pause_threshold = 1
        audio = r.listen(source)

    try:
        print("Recognizing...")
        query = r.recognize_google(audio, language='en-in')
        print(f"User said: {query}")
    except Exception as e:
        print(e)
        speak("Could you say that again, please?")
        return "None"
    return query

# Function to start the project by opening terminals and running commands
def start_project():
    try:
        # Start npm project in a new terminal
        speak("Starting npm project")
        subprocess.Popen(['start', 'cmd', '/k', 'npm start'], shell=True, cwd=r"D:\SehatSathi\client")

        # Start nodemon in a new terminal
        speak("Starting nodemon")
        subprocess.Popen(['start', 'cmd', '/k', 'nodemon server'], shell=True, cwd=r"D:\SehatSathi")

        # Start Flask servers in new terminals
        speak("Starting Flask servers")
        subprocess.Popen(['start', 'cmd', '/k', 'flask run --port=8000'], shell=True, cwd=r"D:\SehatSathi\disease")
        subprocess.Popen(['start', 'cmd', '/k', 'flask run --port=8100'], shell=True, cwd=r"D:\SehatSathi\flask-server")
        subprocess.Popen(['start', 'cmd', '/k', 'flask run --port=8200'], shell=True, cwd=r"D:\SehatSathi\Alerts")

        speak("All services have been started successfully.")
    except Exception as e:
        speak("Sorry, I encountered an issue while starting the project.")
        print(e)

# Main loop that listens for the command to start the project
if __name__ == "__main__":
    speak("I'm ready, please tell me what you want to do.")
    while True:
        query = takeCommand().lower()

        if 'project chalu karna' in query:
            start_project()

        elif 'exit' in query or 'ruk ja' in query:
            speak("Going offline. Goodbye!")
            break
