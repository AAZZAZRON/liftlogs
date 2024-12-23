import requests

BASE = 'http://127.0.0.1:5000/'

headers = {
    'Content-Type': 'application/json'
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


# CreateExercise("Push Ups")
# CreateExercise("Pull Ups")
# GetExercise()
# StartWorkout()
# EndWorkout(2)
# GetWorkouts()
# GetWorkouts(2)
# GetEntries({"exercise_id": 1, "workout_id": 1})
# AddSet(1, 1, 10, 45, "lbs")
# GetSets(1)

