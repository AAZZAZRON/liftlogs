import requests

BASE = 'http://127.0.0.1:5000/'

headers = {
    'Content-Type': 'application/json'
}

def post(url, json={}):
    response = requests.post(BASE + url, json=json, headers=headers)
    print(response.json())
    return response.json()

def get(url):
    response = requests.get(BASE + url, headers=headers)
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


# CreateExercise("Push Ups")
# CreateExercise("Pull Ups")
# GetExercise()
# StartWorkout()
# EndWorkout(2)
# GetWorkouts()
# GetWorkouts(2)