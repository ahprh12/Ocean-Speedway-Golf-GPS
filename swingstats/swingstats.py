# Pandas Profiling library - credit to:
# https://github.com/pandas-profiling/pandas-profiling
# Bloddy Brillyant.

import numpy as np
import pandas as pd
from pandas_profiling import ProfileReport

# Put below code in function passing in club selection as parameter
def showClubProfile(selection):

    df = pd.read_excel('golfstats.xlsx')
    df = df[df['Club'] == selection]
    df = df.drop(columns=['Club'])

    profile = ProfileReport(df, title=selection + ' Swing Stats')
    
    return profile