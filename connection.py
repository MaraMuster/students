import json
import requests

resp = requests.get("http://mensaapp.f4.htw-berlin.de/api/menu")
print(resp.content)

# Content in der Konsole mit 'python connection.py' ausgeben lassen
