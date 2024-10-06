import requests

BASE = 'http://127.0.0.1:5000/'

headers = {
    'Content-Type': 'application/json'
}

# response = requests.put(BASE + "exercise/create", json={"name": "Max"}, headers=headers)
# print(response.json())

# response = requests.get(BASE + "exercise/1", headers=headers)
# print(response.json())

# response = requests.get(BASE + "exercise/10", headers=headers)
# print(response.json())

response = requests.put(BASE + "exercise/1/entries/create", headers=headers)
print(response.json())

response = requests.put(BASE + "exercise/1/entries/create", headers=headers, json={"text": "asdf"})
print(response.json())

response = requests.put(BASE + "exercise/1/entries/create", headers=headers, json={"sets": [{"reps": 6, "weight": 34}, {"reps": 2, "weight": 12}]})
print(response.json())

# response = requests.get(BASE + "exercise/1/entries/5", headers=headers)
# print(response.json())

# response = requests.get(BASE + "exercise/1/entries/all", headers=headers)
# print(response.json())

