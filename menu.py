
from flask import Flask, render_template, request, jsonify


@app.route('/', methods=['GET'])
def getmenu():
    num = float(request.form.get('number', 0))
    square = num ** 2
    data = {'square': square}
    data = jsonify(data)
    return data