import requests

BASE = 'http://127.0.0.1:5000/'

headers = {
    'Content-Type': 'application/json'
}

# response = requests.put(BASE + "exercise/create", json={"name": "Push Ups"}, headers=headers)
# print(response.json())

# response = requests.post(BASE + "exercise/1/entries/create", headers=headers, json={"set": {"reps": 6, "weight": 34}})
# print(response.json())

# response = requests.post(BASE + "exercise/1/entries/create", headers=headers, json={"set": {"reps": 7, "weight": 50}})
# print(response.json())

# response = requests.get(BASE + "exercise/1/entries/5", headers=headers)
# print(response.json())

response = requests.get(BASE + "exercise/1", headers=headers)
print(response.json())

