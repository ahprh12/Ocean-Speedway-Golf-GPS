import re
from urllib.request import urlopen as ureq

import requests
from bs4 import BeautifulSoup as Soup


# get all the containers on the page that include information on each score
def get_match_containers(game_id):
    page_soup = game_soup(game_id)
    containers = page_soup.findAll('td', {'class': 'game-details'})
    return containers


# retrieves all the scoring plays from a single match
# returns a list of objects containing the html plays data
def retrieve_data(containers):
    scoring_plays = []
    for container in containers:
        new_scores = parse_play(container)
        scoring_plays.extend(new_scores)
    return scoring_plays


# parses the data from one scoring play
# returns a list of plays obtained from a single score (e.g. a Touchdown + an Extra Point)
def parse_play(container):

    scores = []
    new_score = {}

    new_score['type'] = container.findAll('div', {'class': 'score-type'})[0].text
    new_score['score'] = get_game_score(container)
    new_score['team'], new_score['logo'] = get_team_name(container)
    new_score['headline'] = container.findAll('div', {'class': 'headline'})[0].text
    
    scores.append(new_score)
    return scores


# parses the game score after the current scoring play from the container
# returns a string containing the score format "{Home Team}-{Away Team}"
def get_game_score(container):
    score1_container = container.next_sibling
    score1 = score1_container.text
    score2_container = score1_container.next_sibling
    score2 = score2_container.text
    return score1 + '-' + score2


# parses the abbreviation for the scoring team's name from the container
# returns a string containing the scoring team's abbreviation, ex 'jax'
def get_team_name(container):
    logo = container.previous_sibling.img['src']
    abbreviation = re.search('\/500\/(\D+).png', logo).group(1)
    return abbreviation, logo


# returns a list of all the scoring plays in one match specified by the ESPN gameid
def get_match_scores(gameId):
    scoring_plays = retrieve_data(get_match_containers(gameId))
    return scoring_plays


# returns the teams and scores for a given game
def get_match_info(gameId):
    page_soup = game_soup(gameId)
    return_data = dict()

    team1_city, team2_city = [city.text for city in page_soup.findAll('span', {'class': 'long-name'})]
    team1_name, team2_name = [team.text for team in page_soup.findAll('span', {'class': 'short-name'})]
    team1 = '{} {}'.format(team1_city, team1_name)
    team2 = '{} {}'.format(team2_city, team2_name)

    return_data['team1'] = team1
    return_data['team2'] = team2

    team1_score, team2_score = [score.text for score in page_soup.findAll('div', {'class': 'score'})]
    return_data['team1_score'] = team1_score
    return_data['team2_score'] = team2_score

    status = page_soup.findAll('span', {'class': 'game-time'})[0].text
    return_data['status'] =  status
    return_data['boxscore'] = ''

    if status.lower() != '':

        boxscore = page_soup.find(lambda tag: tag.name=='table' and tag.has_attr('id') and tag['id']=='linescore')
        boxscoreHeader = boxscore.findAll(lambda tag: tag.name=='th')
        rows = boxscore.findAll(lambda tag: tag.name=='tr')
        return_data['boxscore'] = str(boxscore)

    return return_data


def game_soup(gameId):
    match_url = 'http://www.espn.com/nfl/game?gameId=' + str(gameId)
    u_client = ureq(match_url)
    page_html = u_client.read()
    u_client.close()
    return Soup(page_html, 'html.parser')


def get_week_info(year, week):

    playoffs = {

        "Wildcard": 1,
        "Divisional": 2,
        "Conf Champ": 3,
        "Super Bowl": 5
    }

    if week.isnumeric():
        
        url = 'http://site.api.espn.com/apis/site/v2/sports/football/nfl' \
        '/scoreboard?lang=en&region=us&calendartype=blacklist&limit=100&dates=' + \
        str(year) + '&seasontype=2&week=' + str(week)

    else:

        url = 'http://site.api.espn.com/apis/site/v2/sports/football/nfl' \
        '/scoreboard?lang=en&region=us&calendartype=blacklist&limit=100&dates=' + \
        str(year) + '&seasontype=3&week=' + str(playoffs[week])

    data = requests.get(url).json()
    events_data = dict()
    events_data['year'] = year
    events_data['week'] = week
    events_data['games'] = list()

    for event in data['events']:
        
        event_data = dict()
        event_data['id'] = event['id']
        event_data['name'] = event['name']
        event_data['short'] = event['shortName']
        events_data['games'].append(event_data)

    return events_data
