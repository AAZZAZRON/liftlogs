import requests

BASE = 'http://127.0.0.1:5000/'

headers = {
    'Content-Type': 'application/json'
}
# exercises = [0, 1, "Pull-Ups", "Hack Squats", "Tricep Extensions", "T-Bar Rows", "Deadlift", "Calf Raises"]
# for i in range(3, 9):
    # response = requests.put(BASE + "exercise/create", json={"name": exercises[i]}, headers=headers)
    # print(response.json())

# response = requests.post(BASE + f"exercise/1/entries/create", headers=headers, json={"set": {"reps": 10, "weight": 60}})
# print(response.json())

# response = requests.post(BASE + f"exercise/1/entries/create", headers=headers, json={"set": {"reps": 12, "weight": 69}})
# print(response.json())

# response = requests.get(BASE + "exercise/all", headers=headers)
# print(response.json())

# response = requests.get(BASE + "exercise/1", headers=headers)
# print(response.json())

