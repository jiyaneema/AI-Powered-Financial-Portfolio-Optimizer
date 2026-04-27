import requests
import json

url = "http://localhost:8000/optimize"
payload = {
    "amount": 10000,
    "time_horizon": 5,
    "risk_tolerance": "medium",
    "goal": "retirement"
}
headers = {'Content-Type': 'application/json'}

try:
    response = requests.post(url, json=payload)
    print(f"Status: {response.status_code}")
    print("Full Response:")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")
