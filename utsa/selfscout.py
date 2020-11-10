# Import Dependencies
import pandas as pd

# Create reference to CSV file
fpath = "utsa/Resources/selfscoutdata.xlsx"

#pd.reset_option("all")
#pd.set_option('precision', 0)

# Import the CSV into a pandas DataFrame
raw = pd.read_excel(fpath)

raw["Name"]= raw["Name"].str.split(",", n = 1, expand = True)

def addFormationSplit(df):

	formations = {

		'0 TRIPS':'EMPTY',
		'9 LOUIE NASTY':'EMPTY',
		'ACE':'2x2',
		'ALL':'UNBALANCED',
		'ALL KING':'UNBALANCED',
		'ALPHA':'3x1',
		'DEUCE':'2x2',
		'DOUBLES':'2x2',
		'DUO':'2x2',
		'EMPTY':'EMPTY',
		'EXIT':'EMPTY',
		'FLIP TRIPS':'3x1',
		'JOKER':'2x2',
		'JOKER SQUEEZE':'2x2',
		'KING':'3x1',
		'LOUIE':'3x1',
		'LOUIE FAR':'2x2',
		'LOUIE KING':'2x2',
		'LOUIE KING NASTY':'UNBALANCED',
		'LOUIE QUEEN':'3x1',
		'MINUTEMAN':'UNKNOWN',
		'QUADS':'EMPTY',
		'QUAKER':'UNKNOWN',
		'QUEEN':'2x2',
		'ROGER':'3x1',
		'ROGER FAR':'2x2',
		'ROGER KING':'3x1',
		'ROGER KING NASTY':'UNKNOWN',
		'ROGER QUEEN':'3x1',
		'SAINTS':'UNKNOWN',
		'SPLIT':'3x1',
		'TREY':'3x1',
		'TRIBE':'3x1',
		'TRIO':'3x1',
		'TRIPS':'3x1',
		'TROOP':'3x1',
		'TROY':'3x1',
		'TURBO':'UNKNOWN',
	}

	df.insert(2, "SPLITS", "na")

	for index, row in df.iterrows():

	    df.loc[index,'SPLITS'] = formations[row['FORM']]

	df = df[["FORM", "SPLITS", "R/P",]]

	return df


# Only do this once otherwise errors
# call after function is declared above
# otherwise function doesnt exist
# i.e sequence matters
df = addFormationSplit(raw)

def getRP():

	overallrp = raw[["FORM", "R/P",]]
	run = overallrp.loc[overallrp["R/P"] == "R"]
	rp = run.groupby(["FORM","R/P"])["R/P"].count().reset_index(name="R")


	# %%
	pas = overallrp.loc[overallrp["R/P"] == "P"]
	pp = pas.groupby(["FORM","R/P"])["R/P"].count().reset_index(name="P")


	# %%
	mer = rp.merge(pp, on='FORM')
	fin = mer[['FORM','R', 'P']]
	fin = fin.set_index('FORM')
	tt = fin.div(fin.sum(axis=1), axis=0)
	mer = fin.merge(tt, on='FORM')
	mer.rename(columns={'R_x': 'R', 'P_x': 'P', 'R_y': 'R%', 'P_y': 'P%'}, inplace=True)
	mer = mer.reset_index()


	# %%
	#################### NEXT STEP #####################
	overallrp1 = raw[["FORM", "R/P",]]

	run = overallrp1[["FORM", "R/P",]]
	run = run.loc[run["R/P"] == "R"]
	run = run.groupby(["FORM","R/P"])["R/P"].count().reset_index(name="R")


	# %%
	pas1 = overallrp1.loc[overallrp1["R/P"] == "P"]
	pas1 = pas1.groupby(["FORM","R/P"])["R/P"].count().reset_index(name="P")


	# %%
	mer1 = run.merge(pas1, on=['FORM'], how='outer')
	mer1.fillna(0,inplace=True)
	fin1 = mer1[['FORM','R', 'P']]
	fin1 = fin1.set_index(['FORM'])
	tt1 = (fin1.div(fin1.sum(axis=1), axis=0)*100).round(0).astype(str) + '%'
	mer1 = fin1.merge(tt1, on=['FORM'])
	mer1.rename(columns={'R_x': 'R', 'P_x': 'P', 'R_y': 'R%', 'P_y': 'P%'}, inplace=True)
	#pd.options.display.float_format = '{:,.0%}'.format
	mer1 = mer1.reset_index()

	return mer1


# summary table
def summaryTable():

	pers = raw
	run = raw.loc[raw["R/P"] == "R"]
	rp = run.groupby(["FORM", "SPLITS"])["R/P"].count().reset_index(name="R")

	pas = raw.loc[raw["R/P"] == "P"]
	pp = pas.groupby(["FORM", "SPLITS"])["R/P"].count().reset_index(name="P")

	mer = rp.merge(pp, how='outer',on=["FORM","SPLITS"])

	mer.fillna(0,inplace=True)

	fin = mer[["FORM", "SPLITS", "R", "P"]]
	fin = fin.set_index(["FORM", "SPLITS"])

	tt = (fin.div(fin.sum(axis=1,skipna = True), axis=0)*100).round(0).astype(str) + '%'
	mer = fin.merge(tt, on=["FORM", "SPLITS"])

	mer.rename(columns={'R_x': 'R', 'P_x': 'P', 'R_y': 'R%', 'P_y': 'P%'}, inplace=True)
	mer = mer.reset_index()
	mer.fillna(0,inplace=True)

	sm = mer.groupby('SPLITS')['R','P'].sum()
	rtot = sm['R'].sum()
	ptot = sm['P'].sum()
	sm = sm.reset_index()

	df = pd.DataFrame({"SPLITS":['OVERALL'], "R":[rtot], "P":[ptot]}) 
	df = df.reset_index()
	mm = pd.concat([sm,df])
	mm = mm[["SPLITS", "R", "P"]]

	###### PERSONNEL BREAKDOWN ***********************************

	run = pers[["OFF PERS","R/P",]]
	run = run.loc[run["R/P"] == "R"]
	run = run.groupby('OFF PERS')["R/P"].count().reset_index(name="R")

	pas = pers[["OFF PERS","R/P",]]
	pas = pas.loc[pas["R/P"] == "P"]
	pas = pas.groupby('OFF PERS')["R/P"].count().reset_index(name="P")

	pers = run.merge(pas,on="OFF PERS",how="outer")
	pers.rename(columns={'OFF PERS': 'SPLITS'}, inplace=True)
	pers.fillna(0,inplace=True)

	total = pd.concat([pers,mm])

	total = total.set_index(['SPLITS'])
	cent = (total.div(total.sum(axis=1), axis=0)*100).round(0).astype(str) + '%'
	total = total.merge(cent, on=['SPLITS'])
	total.rename(columns={'R_x': 'R', 'P_x': 'P', 'R_y': 'R%', 'P_y': 'P%'}, inplace=True)
	total = total.reset_index()

	return total