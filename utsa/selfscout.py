# Import Dependencies
import pandas as pd

# Create reference to CSV file
fpath = "utsa/Resources/selfscoutdata.xlsx"

# Import the CSV into a pandas DataFrame
raw = pd.read_excel(fpath)

overallrp = raw[["FORM", "R/P",]]

# throw into its own function
run = overallrp.loc[overallrp["R/P"] == "R"]
rp = run.groupby(["FORM","R/P"])["R/P"].count().reset_index(name="R")

pas = overallrp.loc[overallrp["R/P"] == "P"]
pp = pas.groupby(["FORM","R/P"])["R/P"].count().reset_index(name="P")

mer = rp.merge(pp, on='FORM')
fin = mer[['FORM','R', 'P']]
fin = fin.set_index('FORM')
tt = fin.div(fin.sum(axis=1), axis=0)
mer = fin.merge(tt, on='FORM')
mer.rename(columns={'R_x': 'R', 'P_x': 'P', 'R_y': 'R%', 'P_y': 'P%'}, inplace=True)
pd.options.display.float_format = '{:,.0%}'.format
mer = mer.reset_index()

# filter original raw df by game

# filter original raw df by down (w/ annd w/out formation) and conversion percentage

# use pass game df and do extended breakdown, may need more info
