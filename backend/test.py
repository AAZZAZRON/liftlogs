import requests
import os
from dotenv import load_dotenv

load_dotenv()

BASE = 'http://127.0.0.1:5000/'
API_KEY = os.environ.get("API_KEY")

headers = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
}

def post(url, json={}):
    response = requests.post(BASE + url, json=json, headers=headers)
    print(response.status_code)
    print(response.json())
    return response.json()

def get(url, json={}):
    response = requests.get(BASE + url, json=json, headers=headers)
    print(response.json())
    return response.json()

def CreateExercise(name):
    post("exercise/create", {"name": name})

def GetExercise(id='all'):
    get(f"exercise/{id}")

def StartWorkout():
    post("workouts/start")

def EndWorkout(id, notes=""):
    post("workouts/end", {"id": id, "notes": notes})

def GetWorkouts(id='all'):
    get(f"workouts/{id}")

def GetEntries(json):
    get("/entries", json)

def AddSet(exercise_id, workout_id, reps, weight, units, notes=""):
    post("/addset", json={"exercise_id": exercise_id, 
                          "workout_id": workout_id,
                          "reps": reps, 
                          "weight": weight,
                          "units": units,
                          "notes": notes})

def GetSets(id):
    get("/sets", {"entry_id": id})

def GetStats(id='all'):
    get(f"stats/{id}")


# CreateExercise("Push Ups")
# CreateExercise("Pull Ups")
# CreateExercise("Hack Squats")
# CreateExercise("Leg Press")
# CreateExercise("Lat Pulldown")
# CreateExercise("Tricep Extension")
# GetExercise()
# GetExercise(1)
# StartWorkout()
# EndWorkout(2)
# GetWorkouts()
# GetWorkouts(2)
# GetEntries({"exercise_id": 1, "workout_id": 1})
# AddSet(5, 1, 10, 85, "lbs")
# AddSet(5, 1, 10, 95, "lbs")
# AddSet(5, 1, 10, 100, "lbs", "to failure")
# AddSet(3, 1, 10, 25, "kg")
# AddSet(4, 1, 10, 35, "kg")
# AddSet(5, 1, 10, 40, "lbs")
# GetSets(1)
# EndWorkout(1)
# GetExercise()
# GetEntries({"exercise_id": 1, "workout_id": 1})
# GetWorkouts(1)
# GetStats(5)
# GetStats()