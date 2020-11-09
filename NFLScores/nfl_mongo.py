# Logic for mongo db NFL score lookups
# Keep flask main.py clean and readable

# import beautiful soup stuff
from .match_parsing import get_week_info, get_match_info, get_match_scores

import os

from .nflsDBconnect import db

def getnflweek(week, year):
  
    query = {'week': week, 'year': year}

    if db.weekdata.count_documents(query) == 0:
        info = get_week_info(year, week)
        db.weekdata.insert_one(info)
        games = info['games']

    else:

        week_data = db.weekdata.find(query, {'games': True})
        games = week_data[0]['games']

    return games


def getmatch(gameid):

    query = {'game_id': gameid}

    if db.gamedata.count_documents(query) == 0:
        game = dict()
        game['game_id'] = gameid
        game['scores'] = get_match_scores(gameid)

        try:
            game['info'] = get_match_info(gameid)
        except ValueError:
            return render_template('notfound.html', title='Whoops...')

        db.gamedata.insert_one(game)

    else:

        game_data = db.gamedata.find(query)[0]
        game = {'game_id': game_data['game_id'], 'scores': game_data['scores'], 'info': game_data['info']}

    plays = list()

    for play in game['scores']:
        plays.append(play)

    game['scores'] = plays
    title = '{} vs {}'.format(game['info']['team1'], game['info']['team2'])

    return game, title


def updatematch(gameid):
	query = {'game_id': str(gameid)}
	db.gamedata.delete_many(query)

	game = dict()
	game['game_id'] = gameid
	game['scores'] = get_match_scores(gameid)
	try:
		game['info'] = get_match_info(gameid)
	except ValueError:
		pass
	db.gamedata.insert_one(game)