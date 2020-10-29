import os
import glob
from flask import Flask, render_template
from forms import HoleForm

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__, static_url_path='/static')

SECRET_KEY = os.urandom(32)
app.config['SECRET_KEY'] = SECRET_KEY


# Use this code snipped because flask caches static files
# returns the last update timestamp for js folder (can specify dir or file in this method)
# credit @marredcheese response
# https://stackoverflow.com/questions/41144565/flask-does-not-see-change-in-js-file/41150548
# and also here
# https://www.kite.com/python/answers/how-to-get-the-last-modified-time-of-a-file-in-python#:~:text=Use os.,get the last modified time&text=getmtime(path) to find the,point at which time starts).
# and finally here
# https://stackoverflow.com/questions/39327032/how-to-get-the-latest-file-in-a-folder-using-python
my_path = os.path.abspath(os.path.dirname(__file__))
folder = os.path.join(my_path, 'static/js/*')
list_of_files = glob.glob(folder)
latest_file = max(list_of_files, key=os.path.getmtime)
last_updated = os.path.getmtime(latest_file)


@app.route('/gps')
def home():

    form = HoleForm()
    return render_template('index.html', form=form, last_updated=last_updated)


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_python37_app]
