import os
import re
import glob

"""
NFL Scaws code adapated by https://github.com/SuperRonJon
"""

from flask import Flask, jsonify, request, render_template, redirect
from forms import HoleForm
import NFLScores as nfl

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


@app.route('/')
def home():

    return render_template('home.html')

@app.route('/gps')
def gps():

    form = HoleForm()
    return render_template('gps.html', form=form, last_updated=last_updated)



@app.route('/nfl')
def index():
    return render_template('nfl_index.html')


@app.route('/week')
def week_matches():

    try:
        year = request.args['year']
        week = request.args['week']
    except:
        return render_template('notfound.html', title='Whoops...')

    games = nfl.getnflweek(week, year)

    return render_template('week.html', games=games, year=year, week=week)


@app.route('/update_week/<year>/<week>', methods=['POST'])
def update_week(year, week):
    query = {'year': year, 'week': week}
    db.weekdata.delete_many(query)

    info = nfl.get_week_info(year, week)
    db.weekdata.insert_one(info)
    return redirect("/week?year={}&week={}".format(year, week))


@app.route('/match/<gameid>')
def game_scores(gameid):

    game, title = nfl.getmatch(gameid)

    return render_template('match.html', game=game, title=title)


@app.route('/update_match/<gameid>', methods=['POST'])
def update_match(gameid):
    if request.method == 'POST':

        nfl.updatematch(gameid)
        
        return redirect('/match/' + str(gameid))


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_python37_app]
