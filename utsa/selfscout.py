# Import Dependencies
import pandas as pd


# ADD TEAM FILTER OPTION HERE IF THERE IS ONE 
#raw = raw.loc[raw["Name"] == "20 08 UTSA OFF VS FAU DEF (10/31/2020)"]
# OTHERWISE WERE SHOWING OVERALL RP

def initiateRawDF():

	# Create reference to ss file
    #fpath = "utsa/Resources/selfscoutdata.xlsx"
    fpath = "https://storage.googleapis.com/utsa/selfscoutdata.xlsx"
    return fpath


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

		# check if formation exists
		if row['FORM'] in formations:

			df.loc[index,'SPLITS'] = formations[row['FORM']]

		else:

			df.loc[index,'SPLITS'] = 'UNKNOWN'

	df = df[["FORM", "SPLITS", "R/P",]]

	return df


def getRP(fpath):

	# Import the CSV into a pandas DataFrame - needs to be done inside function or it will never refresh!
	raw = pd.read_excel(fpath)

	raw["Name"]= raw["Name"].str.split(",", n = 1, expand = True)

	raw = addFormationSplit(raw)

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
def summaryTable(fpath):

	# Import the CSV into a pandas DataFrame - needs to be done inside function or it will never refresh!
	raw = pd.read_excel(fpath)

	raw["Name"]= raw["Name"].str.split(",", n = 1, expand = True)

	df = addFormationSplit(raw)

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

	sumrp = rtot+ptot
	totalrp = [round(rtot),round(ptot),round((rtot/sumrp)*100),round((ptot/sumrp)*100)]

	return total, totalrp


def downs(fpath):
	
	# Import the CSV into a pandas DataFrame - needs to be done inside function or it will never refresh!
	raw = pd.read_excel(fpath)

	raw["Name"]= raw["Name"].str.split(",", n = 1, expand = True)
	
	orp = raw[["FORM","Down","Distance","R/P",]]

	# binning
	cut_labels_5 = ['1', '2-3', '4-6', '7-10', '11+']
	cut_bins = [0, 1, 3, 6, 10, 49]

	orp['YD'] = pd.cut(orp['Distance'], bins=cut_bins, labels=cut_labels_5)
	orp = orp[["FORM","Down","R/P","YD"]]

	# grouping
	run = orp.loc[orp["R/P"] == "R"]

	run = run.groupby(["Down","YD"])["R/P"].count().reset_index(name="R")
	pas = orp.loc[orp["R/P"] == "P"]

	pas = pas.groupby(["Down","YD"])["R/P"].count().reset_index(name="P")

	# initial merge
	mer = run.merge(pas, on=["Down","YD"])

	# compile overall downs table
	fin = mer.set_index(["Down","YD"])
	tt = (fin.div(fin.sum(axis=1), axis=0)*100).round(0).astype(str) + '%'
	mer1 = fin.merge(tt, on=["Down","YD"])
	mer1.rename(columns={'R_x': 'R', 'P_x': 'P', 'R_y': 'R%', 'P_y': 'P%'}, inplace=True)
	mer1 = mer1.reset_index()

	tdh = mer1.set_index(["Down","YD"])[['R','P','R%','P%']].T.apply(tuple).to_dict('dict')
	downFormDict = downFormation(orp)

	return tdh, downFormDict


def downFormation(orp):

	te = orp.loc[orp["R/P"] == "R"]

	te = te.groupby(["Down","YD","FORM"])["R/P"].count().reset_index(name="R")
	te = te[te['R'] > 0]

	tp = orp.loc[orp["R/P"] == "P"]

	tp = tp.groupby(["Down","YD","FORM"])["R/P"].count().reset_index(name="P")
	tp = tp[tp['P'] > 0]

	mr = te.merge(tp, on=["Down","YD","FORM"], how='outer')
	mr["R"].fillna(0,inplace=True)
	mr["P"].fillna(0,inplace=True)

	fn = mr.set_index(["Down","YD","FORM"])
	tt1 = (fn.div(fn.sum(axis=1), axis=0)*100).round(0).astype(str) + '%'
	merf = fn.merge(tt1, on=["Down","YD","FORM"])
	merf.rename(columns={'R_x': 'R', 'P_x': 'P', 'R_y': 'R%', 'P_y': 'P%'}, inplace=True)
	merf = merf.reset_index()

	mydict = merf.set_index(["Down","YD","FORM"])[['R','P','R%','P%']].T.apply(tuple).to_dict('dict')
	newd = formatDict(mydict)

	return newd

def formatDict(d):

	cats = ['1', '2-3', '4-6', '7-10', '11+']
	newd = {}

	for a in range(1,5):
	    for cat in cats:
	        newd[str(a)+"_"+cat] = list(partial_match((a, cat, None), d))

	return newd


def partial_match(key, d):

    for k, v in d.items():
        if all(k1 == k2 or k2 is None for k1, k2 in zip(k, key)):
            yield k[2],v
