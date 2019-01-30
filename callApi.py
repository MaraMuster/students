import json
import requests

mensaMenu = requests.get("http://mensaapp.f4.htw-berlin.de/api/menu")

print(resp.json())