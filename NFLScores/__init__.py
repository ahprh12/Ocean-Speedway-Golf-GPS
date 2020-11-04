# import NFLScores as nfl from main.py would call this init file to import stuff, kewl.
from .match_parsing import get_week_info, get_match_info, get_match_scores
from .nfl_mongo import getnflweek, getmatch, updatematch