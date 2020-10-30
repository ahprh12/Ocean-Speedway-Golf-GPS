import os
import re
import glob

from flask import Flask, jsonify, request, render_template, redirect
from forms import HoleForm
from pymongo import MongoClient
import NFLScores as nfl

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__, static_url_path='/static')

try:
    mongo_uri = "mongodb://127.0.0.1:27017"
except KeyError:
    from secrets import mongoURI
    mongo_uri = mongoURI

client = MongoClient(mongo_uri)
db = client.nfls

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
    return render_template('index.html', form=form, last_updated=last_updated)

"""
RON JOHN NFL CODE HERE
"""

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
    title = '{} Week {}'.format(year, week)

    query = {'week': week, 'year': year}
    if db.weekdata.count_documents(query) == 0:
        info = nfl.get_week_info(year, week)
        db.weekdata.insert_one(info)
        games = info['games']
    else:
        week_data = db.weekdata.find(query, {'games': True})
        games = week_data[0]['games']

    return render_template('week.html', games=games, year=year, week=week, title=title)


@app.route('/update_week/<year>/<week>', methods=['POST'])
def update_week(year, week):
    query = {'year': year, 'week': week}
    db.weekdata.delete_many(query)

    info = nfl.get_week_info(year, week)
    db.weekdata.insert_one(info)
    return redirect("/week?year={}&week={}".format(year, week))


@app.route('/match/<gameid>')
def game_scores(gameid):
    query = {'game_id': gameid}
    if db.gamedata.count_documents(query) == 0:
        game = dict()
        game['game_id'] = gameid
        game['scores'] = nfl.get_match_scores(gameid)
        try:
            game['info'] = nfl.get_match_info(gameid)
        except ValueError:
            return render_template('notfound.html', title='Whoops...')
        db.gamedata.insert_one(game)
    else:
        game_data = db.gamedata.find(query)[0]
        game = {'game_id': game_data['game_id'], 'scores': game_data['scores'], 'info': game_data['info']}

    plays = list()
    for play in game['scores']:
        plays.append(make_string(play))
    game['scores'] = plays
    title = '{} vs {}'.format(game['info']['team1'], game['info']['team2'])

    return render_template('match.html', game=game, title=title)


@app.route('/update_match/<gameid>', methods=['POST'])
def update_match(gameid):
    if request.method == 'POST':
        query = {'game_id': str(gameid)}
        db.gamedata.delete_many(query)

        game = dict()
        game['game_id'] = gameid
        game['scores'] = nfl.get_match_scores(gameid)
        try:
            game['info'] = nfl.get_match_info(gameid)
        except ValueError:
            pass
        db.gamedata.insert_one(game)

        return redirect('/match/' + str(gameid))


@app.route('/full_week/<year>/<week>')
def week_scores(year, week):
    query = {'week': week, 'year': year}
    if db.fullweek.count_documents(query) == 0:
        week_data = nfl.get_full_week_data(year, week)
        response = week_data
        db.fullweek.insert_one(week_data)
    else:
        week_data = db.fullweek.find(query)[0]
        response = {'games': week_data['games'], 'year': week_data['year'], 'week': week_data['week']}
    
    for game in response['games']:
        for play in game['plays']:
            play['play_string'] = make_string(play)
            
    return render_template('full_week.html', data=response)


@app.route('/update_full_week/<year>/<week>', methods=['POST'])
def update_full_week(year, week):
    if request.method == 'POST':
        query = {'week': week, 'year': year}
        db.fullweek.delete_many(query)

        week_data = nfl.get_full_week_data(year, week)
        db.fullweek.insert_one(week_data)

        return redirect('/full_week/{}/{}'.format(year, week))


def make_string(play):
    result = ''
    score = re.search(r'\d+\-\d+', play['score']).group(0)
    result += '({}) '.format(play['team'].upper())
    if play['type'] == 'TD':
        if play['play_type'] == 'pass':
            result += 'Pass from {} to {} for {} yards'.format(play['passer'], play['player'], play['yards'])
        elif play['play_type'] == 'run':
            result += 'Run by {} for {} yards'.format(play['player'], play['yards'])
        else:
            result += '{} by {} for {} yards'.format(play['play_type'], play['player'], play['yards'])
    elif play['type'] == 'PAT':
        result += 'Point after good by {}'.format(play['player'])
    elif play['type'] == 'FG':
        result += 'Field goal good by {} for {} yards'.format(play['player'], play['yards'])
    elif play['type'] == '2PtConv':
        if play['play_type'] == 'pass':
            result += 'Two point conversion pass from {} to {}'.format(play['passer'], play['player'])
        elif play['play_type'] == 'run':
            result += 'Two point conversion run by {}'.format(play['player'])
    elif play['type'] == 'SF':
        result += 'Safety by {}'.format(play['player'])
    return result + " " + score

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_python37_app]
