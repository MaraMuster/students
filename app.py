from flask import render_template, Flask, redirect, url_for, request
import json
import requests

resp = requests.get("http://mensaapp.f4.htw-berlin.de/api/menu")
mensaMenu = resp.json()

# Create the application instance
app = Flask(__name__, template_folder="templates")

# Create a URL route in our application for "/home"
@app.route('/home')
def home():
    """
    This function just responds to the browser ULR
    localhost:5000/home

    :return:        the rendered template 'home.html'
    """
    return render_template('home.html', menu=mensaMenu)


# Route for handling the login page logic on "/"
@app.route('/', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != 'admin' or request.form['password'] != 'maraisatuelinrim':
            error = 'Das Passwort und/oder der Username waren leider nicht korrekt. Bitte versuche es erneut.'
        else:
            return redirect(url_for('home'))
    return render_template('login.html', error=error)

# If we're running in stand alone mode, run the application
if __name__ == '__main__':
    app.run(debug=True)