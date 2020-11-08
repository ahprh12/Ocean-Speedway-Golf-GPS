# Import Dependencies
import pandas as pd

# Create reference to CSV file
fpath = "utsa/Resources/selfscoutdata.xlsx"

# Import the CSV into a pandas DataFrame
raw = pd.read_excel(fpath)

def getOverallRP():

	overallrp = raw[["FORM", "R/P",]]
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

	mer.insert(loc=0, column='Name', value="COMBINED")

	return mer

# filter original raw df by game
def getGameRP():

	raw["Name"]= raw["Name"].str.split(",", n = 1, expand = True)
	overallrp1 = raw[["Name", "FORM", "R/P",]]

	run = overallrp1[["Name", "FORM", "R/P",]]
	run = run.loc[run["R/P"] == "R"]
	run = run.groupby(["Name", "FORM","R/P"])["R/P"].count().reset_index(name="R")

	pas1 = overallrp1.loc[overallrp1["R/P"] == "P"]
	pas1 = pas1.groupby(["Name", "FORM","R/P"])["R/P"].count().reset_index(name="P")

	mer1 = run.merge(pas1, on=['Name','FORM'])
	fin1 = mer1[['Name','FORM','R', 'P']]
	fin1 = fin1.set_index(['Name','FORM'])
	tt1 = fin1.div(fin1.sum(axis=1), axis=0)
	mer1 = fin1.merge(tt1, on=['Name', 'FORM'])
	mer1.rename(columns={'R_x': 'R', 'P_x': 'P', 'R_y': 'R%', 'P_y': 'P%'}, inplace=True)
	pd.options.display.float_format = '{:,.0%}'.format
	mer1 = mer1.reset_index()

	return mer1


def combineDF():

	mer = getOverallRP()
	mer1 = getGameRP()

	result = pd.concat([mer, mer1])

	return result


# filter original raw df by down (w/ annd w/out formation) and conversion percentage

# use pass game df and do extended breakdown, may need more info
