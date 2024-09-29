import requests

BASE = 'http://127.0.0.1:5000/'

response = requests.put(BASE + "exercise/1", json={"name": "Max"})
# print(response.json())
input()
response = requests.get(BASE + "video/2")
print(response.json())

