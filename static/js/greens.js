// last updated 7.29.20 - ap9

// all center green gps coordinates go in here to keep things clean
// key = course initials + hole #
// Credit Google Maps ->
// right click on point, select "What's Here?" to retrieve exact coordinates

var coordinates = {
    // LAKE PARK 18
    "lp1": {"lat": 33.068370, "lon": -97.001389},
    "lp2": {"lat": 33.068269, "lon": -97.006099},
    "lp3": {"lat": 33.069284, "lon": -97.007256},
    "lp4": {"lat": 33.068430, "lon": -97.003350},
    "lp5": {"lat": 33.067655, "lon": -97.001417},
    "lp6": {"lat": 33.066650, "lon": -96.997307},
    "lp7": {"lat": 33.066103, "lon": -96.996055},
    "lp8": {"lat": 33.067532, "lon": -97.000260},
    "lp9": {"lat": 33.071250, "lon": -96.999174},
    "lp10": {"lat": 33.069388, "lon": -97.003050},
    "lp11": {"lat": 33.069840, "lon": -97.007574},
    "lp12": {"lat": 33.070103, "lon": -97.004092},
    "lp13": {"lat": 33.070838, "lon": -97.008113},
    "lp14": {"lat": 33.071604, "lon": -97.003617},
    "lp15": {"lat": 33.072048, "lon": -97.002043},
    "lp16": {"lat": 33.069831, "lon": -97.003484},
    "lp17": {"lat": 33.068655, "lon": -97.002560},
    "lp18": {"lat": 33.071370, "lon": -97.000355},
    // WATTERS CREEK 9 (RERUN FOR 18)
    "wcp1": {"lat": 33.076272, "lon": -96.691623},
    "wcp2": {"lat": 33.077612, "lon": -96.691189},
    "wcp3": {"lat": 33.076686, "lon": -96.691752},
    "wcp4": {"lat": 33.078044, "lon": -96.692796},
    "wcp5": {"lat": 33.079373, "lon": -96.689415},
    "wcp6": {"lat": 33.077038, "lon": -96.687290},
    "wcp7": {"lat": 33.078577, "lon": -96.688765},
    "wcp8": {"lat": 33.077969, "lon": -96.690298},
    "wcp9": {"lat": 33.074578, "lon": -96.691283},
    "wcp10": {"lat": 33.076272, "lon": -96.691623},
    "wcp11": {"lat": 33.077612, "lon": -96.691189},
    "wcp12": {"lat": 33.076686, "lon": -96.691752},
    "wcp13": {"lat": 33.078044, "lon": -96.692796},
    "wcp14": {"lat": 33.079373, "lon": -96.689415},
    "wcp15": {"lat": 33.077038, "lon": -96.687290},
    "wcp16": {"lat": 33.078577, "lon": -96.688765},
    "wcp17": {"lat": 33.077969, "lon": -96.690298},
    "wcp18": {"lat": 33.074578, "lon": -96.691283},
    // WATTERS CREEK 18
    "wct1": {"lat": 33.074018, "lon": -96.697723},
    "wct2": {"lat": 33.074128, "lon": -96.703135},
    "wct3": {"lat": 33.074790, "lon": -96.704879},
    "wct4": {"lat": 33.070571, "lon": -96.706381},
    "wct5": {"lat": 33.073193, "lon": -96.705254},
    "wct6": {"lat": 33.072346, "lon": -96.702376},
    "wct7": {"lat": 33.069058, "lon": -96.700245},
    "wct8": {"lat": 33.073020, "lon": -96.700161},
    "wct9": {"lat": 33.073631, "lon": -96.702965},
    "wct10": {"lat": 33.074097, "lon": -96.699951},
    "wct11": {"lat": 33.074686, "lon": -96.697930},
    "wct12": {"lat": 33.076150, "lon": -96.694360},
    "wct13": {"lat": 33.079755, "lon": -96.696293},
    "wct14": {"lat": 33.082381, "lon": -96.701061},
    "wct15": {"lat": 33.082320, "lon": -96.697715},
    "wct16": {"lat": 33.082514, "lon": -96.699499},
    "wct17": {"lat": 33.080098, "lon": -96.694969},
    "wct18": {"lat": 33.074887, "lon": -96.692877},
    // Stewart Peninsula R Y
    "sp1": {"lat": 33.086894, "lon": -96.923218},
    "sp2": {"lat": 33.085324, "lon": -96.923935},
    "sp3": {"lat": 33.087654, "lon": -96.921753},
    "sp4": {"lat": 33.088607, "lon": -96.918616},
    "sp5": {"lat": 33.090716, "lon": -96.917561},
    "sp6": {"lat": 33.091474, "lon": -96.915135},
    "sp7": {"lat": 33.090858, "lon": -96.916941},
    "sp8": {"lat": 33.092660, "lon": -96.917041},
    "sp9": {"lat": 33.089526, "lon": -96.919243},
    "sp10": {"lat": 33.086912, "lon": -96.923469},
    "sp11": {"lat": 33.085380, "lon": -96.923693},
    "sp12": {"lat": 33.087630, "lon": -96.921992},
    "sp13": {"lat": 33.088422, "lon": -96.918655},
    "sp14": {"lat": 33.090603, "lon": -96.917383},
    "sp15": {"lat": 33.091651, "lon": -96.915066},
    "sp16": {"lat": 33.091024, "lon": -96.917075},
    "sp17": {"lat": 33.092545, "lon": -96.916908},
    "sp18": {"lat": 33.089411, "lon": -96.918975},
    // Duck Creek
    'dc1': {'lat': 32.937212, 'lon': -96.669489},
    'dc2': {'lat': 32.934875, 'lon': -96.666724},
    'dc3': {'lat': 32.936476, 'lon': -96.670651},
    'dc4': {'lat': 32.93319, 'lon': -96.667496},
    'dc5': {'lat': 32.933911, 'lon': -96.668868},
    'dc6': {'lat': 32.93648, 'lon': -96.674816},
    'dc7': {'lat': 32.937687, 'lon': -96.675481},
    'dc8': {'lat': 32.936632, 'lon': -96.671776},
    'dc9': {'lat': 32.938202, 'lon': -96.674257},
    'dc10': {'lat': 32.943534, 'lon': -96.676137},
    'dc11': {'lat': 32.941973, 'lon': -96.677117},
    'dc12': {'lat': 32.944633, 'lon': -96.679482},
    'dc13': {'lat': 32.941635, 'lon': -96.678163},
    'dc14': {'lat': 32.944601, 'lon': -96.681457},
    'dc15': {'lat': 32.942775, 'lon': -96.680595},
    'dc16': {'lat': 32.940115, 'lon': -96.677415},
    'dc17': {'lat': 32.941453, 'lon': -96.676714},
    'dc18': {'lat': 32.939348, 'lon': -96.674174},
    // Twin Creeks
    "tc1": {"lat": 33.102506, "lon": -96.715197},
    "tc2": {"lat": 33.104911, "lon": -96.717351},
    "tc3": {"lat": 33.109134, "lon": -96.720403},
    "tc4": {"lat": 33.112122, "lon": -96.724401},
    "tc5": {"lat": 33.110253, "lon": -96.726354},
    "tc6": {"lat": 33.110253, "lon": -96.726354},
    "tc7": {"lat": 33.104011, "lon": -96.720615},
    "tc8": {"lat": 33.101720, "lon": -96.716571},
    "tc9": {"lat": 33.103714, "lon": -96.712213},
    "tc10": {"lat": 33.110191, "lon": -96.714767},
    "tc11": {"lat": 33.114333, "lon": -96.714560},
    "tc12": {"lat": 33.115003, "lon": -96.712484},
    "tc13": {"lat": 33.113034, "lon": -96.713635},
    "tc14": {"lat": 33.110722, "lon": -96.715294},
    "tc15": {"lat": 33.106690, "lon": -96.717705},
    "tc16": {"lat": 33.107285, "lon": -96.716256},
    "tc17": {"lat": 33.105518, "lon": -96.716246},
    "tc18": {"lat": 33.105167, "lon": -96.713948},
    // San Pedro 9 San Antonio
    "asp1": {"lat": 29.492602, "lon": -98.497249},
    "asp2": {"lat": 29.492446, "lon": -98.496478},
    "asp3": {"lat": 29.493402, "lon": -98.496309},
    "asp4": {"lat": 29.492128, "lon": -98.494698},
    "asp5": {"lat": 29.491305, "lon": -98.493963},
    "asp6": {"lat": 29.490421, "lon": -98.494819},
    "asp7": {"lat": 29.490032, "lon": -98.495779},
    "asp8": {"lat": 29.490013, "lon": -98.496989},
    "asp9": {"lat": 29.490534, "lon": -98.498369},
    "asp10": {"lat": 29.492602, "lon": -98.497249},
    "asp11": {"lat": 29.492446, "lon": -98.496478},
    "asp12": {"lat": 29.493402, "lon": -98.496309},
    "asp13": {"lat": 29.492128, "lon": -98.494698},
    "asp14": {"lat": 29.491305, "lon": -98.493963},
    "asp15": {"lat": 29.490421, "lon": -98.494819},
    "asp16": {"lat": 29.490032, "lon": -98.495779},
    "asp17": {"lat": 29.490013, "lon": -98.496989},
    "asp18": {"lat": 29.490534, "lon": -98.498369},
    // Wind Crest San Antonio
    "wc1": {"lat": 29.517542, "lon": -98.377819},
    "wc2": {"lat": 29.518091, "lon": -98.381263},
    "wc3": {"lat": 29.518265, "lon": -98.380097},
    "wc4": {"lat": 29.517568, "lon": -98.377217},
    "wc5": {"lat": 29.518572, "lon": -98.377655},
    "wc6": {"lat": 29.518377, "lon": -98.374470},
    "wc7": {"lat": 29.517101, "lon": -98.374446},
    "wc8": {"lat": 29.517468, "lon": -98.376743},
    "wc9": {"lat": 29.517102, "lon": -98.380433},
    "wc10": {"lat": 29.517542, "lon": -98.377819},
    "wc11": {"lat": 29.518091, "lon": -98.381263},
    "wc12": {"lat": 29.518265, "lon": -98.380097},
    "wc13": {"lat": 29.517568, "lon": -98.377217},
    "wc14": {"lat": 29.518572, "lon": -98.377655},
    "wc15": {"lat": 29.518377, "lon": -98.374470},
    "wc16": {"lat": 29.517101, "lon": -98.374446},
    "wc17": {"lat": 29.517468, "lon": -98.376743},
    "wc18": {"lat": 29.517102, "lon": -98.380433},
    // Golf Club of Texas San Antonio
    "gctx1": {"lat": 29.388480, "lon": -98.759882},
    "gctx2": {"lat": 29.386827, "lon": -98.755725},
    "gctx3": {"lat": 29.385653, "lon": -98.754914},
    "gctx4": {"lat": 29.383518, "lon": -98.753273},
    "gctx5": {"lat": 29.379120, "lon": -98.750626},
    "gctx6": {"lat": 29.380993, "lon": -98.752352},
    "gctx7": {"lat": 29.384579, "lon": -98.755218},
    "gctx8": {"lat": 29.387443, "lon": -98.759704},
    "gctx9": {"lat": 29.391017, "lon": -98.762752},
    "gctx10": {"lat": 29.387147, "lon": -98.762513},
    "gctx11": {"lat": 29.384941, "lon": -98.759259},
    "gctx12": {"lat": 29.384008, "lon": -98.757952},
    "gctx13": {"lat": 29.380386, "lon": -98.753206},
    "gctx14": {"lat": 29.378331, "lon": -98.754961},
    "gctx15": {"lat": 29.379507, "lon": -98.754354},
    "gctx16": {"lat": 29.383357, "lon": -98.756832},
    "gctx17": {"lat": 29.386386, "lon": -98.759634},
    "gctx18": {"lat": 29.390485, "lon": -98.763361},
    // LAKE PARK 9
    "lpe1": {"lat": 33.070487, "lon": -97.010492},
    "lpe2": {"lat": 33.071359, "lon": -97.010190},
    "lpe3": {"lat": 33.070370, "lon": -97.008986},
    "lpe4": {"lat": 33.069219, "lon": -97.011602},
    "lpe5": {"lat": 33.067293, "lon": -97.007326},
    "lpe6": {"lat": 33.067302, "lon": -97.008080},
    "lpe7": {"lat": 33.068031, "lon": -97.009912},
    "lpe8": {"lat": 33.068692, "lon": -97.011495},
    "lpe9": {"lat": 33.070026, "lon": -97.011970},
    // Coyote Ridge Range
    "crr1": {"lat": 33.026738, "lon": -96.939400},
    "crr2": {"lat": 33.026996, "lon": -96.938720}, 
    "crr3": {"lat": 33.070370, "lon": -96.939122},
    "crr4": {"lat": 33.027835, "lon": -96.938511},
    // Coyote Ridge 18
    'cr1': {'lat': 33.028144, 'lon': -96.939199},
    'cr2': {'lat': 33.030018, 'lon': -96.933863},
    'cr3': {'lat': 33.033007, 'lon': -96.934319},
    'cr4': {'lat': 33.037985, 'lon': -96.933826},
    'cr5': {'lat': 33.03451, 'lon': -96.933687},
    'cr6': {'lat': 33.030923, 'lon': -96.933018},
    'cr7': {'lat': 33.02916, 'lon': -96.932242},
    'cr8': {'lat': 33.027956, 'lon': -96.936854},
    'cr9': {'lat': 33.024763, 'lon': -96.938421},
    'cr10': {'lat': 33.030942, 'lon': -96.943277},
    'cr11': {'lat': 33.028781, 'lon': -96.942734},
    'cr12': {'lat': 33.03243, 'lon': -96.943167},
    'cr13': {'lat': 33.033577, 'lon': -96.940723},
    'cr14': {'lat': 33.032726, 'lon': -96.942507},
    'cr15': {'lat': 33.028679, 'lon': -96.944103},
    'cr16': {'lat': 33.024272, 'lon': -96.94351},
    'cr17': {'lat': 33.026665, 'lon': -96.944339},
    'cr18': {'lat': 33.025953, 'lon': -96.941849},
    // Rebecca Creek - Spring Branch TX
    'rc1': {'lat': 29.911583, 'lon': -98.363656},
    'rc2': {'lat': 29.909622, 'lon': -98.358326},
    'rc3': {'lat': 29.910554, 'lon': -98.359021},
    'rc4': {'lat': 29.91008, 'lon': -98.355796},
    'rc5': {'lat': 29.907826, 'lon': -98.352997},
    'rc6': {'lat': 29.909552, 'lon': -98.357716},
    'rc7': {'lat': 29.909899, 'lon': -98.361139},
    'rc8': {'lat': 29.910758, 'lon': -98.363373},
    'rc9': {'lat': 29.912782, 'lon': -98.366532},
    'rc10': {'lat': 29.912554, 'lon': -98.363547},
    'rc11': {'lat': 29.911599, 'lon': -98.367145},
    'rc12': {'lat': 29.911587, 'lon': -98.372599},
    'rc13': {'lat': 29.911364, 'lon': -98.374525},
    'rc14': {'lat': 29.915251, 'lon': -98.376674},
    'rc15': {'lat': 29.912499, 'lon': -98.374894},
    'rc16': {'lat': 29.912368, 'lon': -98.371153},
    'rc17': {'lat': 29.913712, 'lon': -98.370757},
    'rc18': {'lat': 29.911747, 'lon': -98.368051},
    // Watters Creek Development Course 6-hole
    'wcd1': {'lat': 33.07374, 'lon': -96.689954},
    'wcd2': {'lat': 33.073594, 'lon': -96.690619},
    'wcd3': {'lat': 33.073432, 'lon': -96.689646},
    'wcd4': {'lat': 33.073394, 'lon': -96.68844},
    'wcd5': {'lat': 33.073632, 'lon': -96.688726},
    'wcd6': {'lat': 33.07393, 'lon': -96.689503},
    // Trails of Frisco
    'tof1': {'lat': 33.166608, 'lon': -96.870687},
    'tof2': {'lat': 33.168218, 'lon': -96.874991},
    'tof3': {'lat': 33.170064, 'lon': -96.875197},
    'tof4': {'lat': 33.172233, 'lon': -96.871789},
    'tof5': {'lat': 33.175948, 'lon': -96.869535},
    'tof6': {'lat': 33.177672, 'lon': -96.868172},
    'tof7': {'lat': 33.173531, 'lon': -96.868023},
    'tof8': {'lat': 33.170083, 'lon': -96.868005},
    'tof9': {'lat': 33.166879, 'lon': -96.864777},
    'tof10': {'lat': 33.166008, 'lon': -96.870735},
    'tof11': {'lat': 33.164933, 'lon': -96.873117},
    'tof12': {'lat': 33.167675, 'lon': -96.876127},
    'tof13': {'lat': 33.168317, 'lon': -96.879802},
    'tof14': {'lat': 33.168384, 'lon': -96.881354},
    'tof15': {'lat': 33.169025, 'lon': -96.876867},
    'tof16': {'lat': 33.168615, 'lon': -96.876066},
    'tof17': {'lat': 33.165872, 'lon': -96.872434},
    'tof18': {'lat': 33.164786, 'lon': -96.866037},
}


// tee box coords to calc drive distance
var teeboxes = {
    // LAKE PARK 18
    "lp1": {"lat": 33.071152, "lon": -96.999889},
    "lp2": {"lat": 33.067122, "lon": -97.001600},
    "lp3": {"lat": 33.069284, "lon": -97.007256},
    "lp4": {"lat": 33.069117, "lon": -97.006458},
    "lp5": {"lat": 33.067655, "lon": -97.001417},
    "lp6": {"lat": 33.067089, "lon": -97.000902},
    "lp7": {"lat": 33.066103, "lon": -96.996055},
    "lp8": {"lat": 33.067555, "lon": -96.997179},
    "lp9": {"lat": 33.067653, "lon": -97.000776},
    "lp10": {"lat": 33.071507, "lon": -97.001129},
    "lp11": {"lat": 33.069522, "lon": -97.004187},
    "lp12": {"lat": 33.070344, "lon": -97.007831},
    "lp13": {"lat": 33.070662, "lon": -97.004335},
    "lp14": {"lat": 33.071330, "lon": -97.008365},
    "lp15": {"lat": 33.072048, "lon": -97.002043},
    "lp16": {"lat": 33.071715, "lon": -97.001492},
    "lp17": {"lat": 33.068655, "lon": -97.002560},
    "lp18": {"lat": 33.068607, "lon": -97.002047},
    // WATTERS CREEK 9 (RERUN FOR 18)
    "wcp1": {"lat": 33.076272, "lon": -96.691623},
    "wcp2": {"lat": 33.077612, "lon": -96.691189},
    "wcp3": {"lat": 33.076686, "lon": -96.691752},
    "wcp4": {"lat": 33.078044, "lon": -96.692796},
    "wcp5": {"lat": 33.079373, "lon": -96.689415},
    "wcp6": {"lat": 33.077038, "lon": -96.687290},
    "wcp7": {"lat": 33.078577, "lon": -96.688765},
    "wcp8": {"lat": 33.077969, "lon": -96.690298},
    "wcp9": {"lat": 33.074578, "lon": -96.691283},
    "wcp10": {"lat": 33.076272, "lon": -96.691623},
    "wcp11": {"lat": 33.077612, "lon": -96.691189},
    "wcp12": {"lat": 33.076686, "lon": -96.691752},
    "wcp13": {"lat": 33.078044, "lon": -96.692796},
    "wcp14": {"lat": 33.079373, "lon": -96.689415},
    "wcp15": {"lat": 33.077038, "lon": -96.687290},
    "wcp16": {"lat": 33.078577, "lon": -96.688765},
    "wcp17": {"lat": 33.077969, "lon": -96.690298},
    "wcp18": {"lat": 33.074578, "lon": -96.691283},
    // WATTERS CREEK 18
    "wct1": {"lat": 33.074018, "lon": -96.697723},
    "wct2": {"lat": 33.074128, "lon": -96.703135},
    "wct3": {"lat": 33.074790, "lon": -96.704879},
    "wct4": {"lat": 33.070571, "lon": -96.706381},
    "wct5": {"lat": 33.073193, "lon": -96.705254},
    "wct6": {"lat": 33.072346, "lon": -96.702376},
    "wct7": {"lat": 33.069058, "lon": -96.700245},
    "wct8": {"lat": 33.073020, "lon": -96.700161},
    "wct9": {"lat": 33.073631, "lon": -96.702965},
    "wct10": {"lat": 33.074097, "lon": -96.699951},
    "wct11": {"lat": 33.074686, "lon": -96.697930},
    "wct12": {"lat": 33.076150, "lon": -96.694360},
    "wct13": {"lat": 33.079755, "lon": -96.696293},
    "wct14": {"lat": 33.082381, "lon": -96.701061},
    "wct15": {"lat": 33.082320, "lon": -96.697715},
    "wct16": {"lat": 33.082514, "lon": -96.699499},
    "wct17": {"lat": 33.080098, "lon": -96.694969},
    "wct18": {"lat": 33.074887, "lon": -96.692877},
    // Stewart Peninsula R Y
    "sp1": {"lat": 33.089103, "lon": -96.921460},
    "sp2": {"lat": 33.085324, "lon": -96.923935},
    "sp3": {"lat": 33.085027, "lon": -96.923507},
    "sp4": {"lat": 33.086801, "lon": -96.921588},
    "sp5": {"lat": 33.090716, "lon": -96.917561},
    "sp6": {"lat": 33.091474, "lon": -96.915135},
    "sp7": {"lat": 33.091301, "lon": -96.913434},
    "sp8": {"lat": 33.092660, "lon": -96.917041},
    "sp9": {"lat": 33.092940, "lon": -96.917459},
    "sp10": {"lat": 33.089103, "lon": -96.921460},
    "sp11": {"lat": 33.085324, "lon": -96.923935},
    "sp12": {"lat": 33.085027, "lon": -96.923507},
    "sp13": {"lat": 33.086801, "lon": -96.921588},
    "sp14": {"lat": 33.090716, "lon": -96.917561},
    "sp15": {"lat": 33.091474, "lon": -96.915135},
    "sp16": {"lat": 33.091301, "lon": -96.913434},
    "sp17": {"lat": 33.092660, "lon": -96.917041},
    "sp18": {"lat": 33.092940, "lon": -96.917459},
    // Duck Creek
    'dc1': {'lat': 32.937212, 'lon': -96.669489},
    'dc2': {'lat': 32.934875, 'lon': -96.666724},
    'dc3': {'lat': 32.936476, 'lon': -96.670651},
    'dc4': {'lat': 32.93319, 'lon': -96.667496},
    'dc5': {'lat': 32.933911, 'lon': -96.668868},
    'dc6': {'lat': 32.93648, 'lon': -96.674816},
    'dc7': {'lat': 32.937687, 'lon': -96.675481},
    'dc8': {'lat': 32.936632, 'lon': -96.671776},
    'dc9': {'lat': 32.938202, 'lon': -96.674257},
    'dc10': {'lat': 32.943534, 'lon': -96.676137},
    'dc11': {'lat': 32.941973, 'lon': -96.677117},
    'dc12': {'lat': 32.944633, 'lon': -96.679482},
    'dc13': {'lat': 32.941635, 'lon': -96.678163},
    'dc14': {'lat': 32.944601, 'lon': -96.681457},
    'dc15': {'lat': 32.942775, 'lon': -96.680595},
    'dc16': {'lat': 32.940115, 'lon': -96.677415},
    'dc17': {'lat': 32.941453, 'lon': -96.676714},
    'dc18': {'lat': 32.939348, 'lon': -96.674174},
    // Twin Creeks
    "tc1": {"lat": 33.102506, "lon": -96.715197},
    "tc2": {"lat": 33.104911, "lon": -96.717351},
    "tc3": {"lat": 33.109134, "lon": -96.720403},
    "tc4": {"lat": 33.112122, "lon": -96.724401},
    "tc5": {"lat": 33.110253, "lon": -96.726354},
    "tc6": {"lat": 33.110253, "lon": -96.726354},
    "tc7": {"lat": 33.104011, "lon": -96.720615},
    "tc8": {"lat": 33.101720, "lon": -96.716571},
    "tc9": {"lat": 33.103714, "lon": -96.712213},
    "tc10": {"lat": 33.110191, "lon": -96.714767},
    "tc11": {"lat": 33.114333, "lon": -96.714560},
    "tc12": {"lat": 33.115003, "lon": -96.712484},
    "tc13": {"lat": 33.113034, "lon": -96.713635},
    "tc14": {"lat": 33.110722, "lon": -96.715294},
    "tc15": {"lat": 33.106690, "lon": -96.717705},
    "tc16": {"lat": 33.107285, "lon": -96.716256},
    "tc17": {"lat": 33.105518, "lon": -96.716246},
    "tc18": {"lat": 33.105167, "lon": -96.713948},
    // San Pedro 9 San Antonio
    "asp1": {"lat": 29.492602, "lon": -98.497249},
    "asp2": {"lat": 29.492446, "lon": -98.496478},
    "asp3": {"lat": 29.493402, "lon": -98.496309},
    "asp4": {"lat": 29.492128, "lon": -98.494698},
    "asp5": {"lat": 29.491305, "lon": -98.493963},
    "asp6": {"lat": 29.490421, "lon": -98.494819},
    "asp7": {"lat": 29.490032, "lon": -98.495779},
    "asp8": {"lat": 29.490013, "lon": -98.496989},
    "asp9": {"lat": 29.490534, "lon": -98.498369},
    "asp10": {"lat": 29.492602, "lon": -98.497249},
    "asp11": {"lat": 29.492446, "lon": -98.496478},
    "asp12": {"lat": 29.493402, "lon": -98.496309},
    "asp13": {"lat": 29.492128, "lon": -98.494698},
    "asp14": {"lat": 29.491305, "lon": -98.493963},
    "asp15": {"lat": 29.490421, "lon": -98.494819},
    "asp16": {"lat": 29.490032, "lon": -98.495779},
    "asp17": {"lat": 29.490013, "lon": -98.496989},
    "asp18": {"lat": 29.490534, "lon": -98.498369},
    // Wind Crest San Antonio
    "wc1": {"lat": 29.517542, "lon": -98.377819},
    "wc2": {"lat": 29.518091, "lon": -98.381263},
    "wc3": {"lat": 29.518265, "lon": -98.380097},
    "wc4": {"lat": 29.517568, "lon": -98.377217},
    "wc5": {"lat": 29.518572, "lon": -98.377655},
    "wc6": {"lat": 29.518377, "lon": -98.374470},
    "wc7": {"lat": 29.517101, "lon": -98.374446},
    "wc8": {"lat": 29.517468, "lon": -98.376743},
    "wc9": {"lat": 29.517102, "lon": -98.380433},
    "wc10": {"lat": 29.517542, "lon": -98.377819},
    "wc11": {"lat": 29.518091, "lon": -98.381263},
    "wc12": {"lat": 29.518265, "lon": -98.380097},
    "wc13": {"lat": 29.517568, "lon": -98.377217},
    "wc14": {"lat": 29.518572, "lon": -98.377655},
    "wc15": {"lat": 29.518377, "lon": -98.374470},
    "wc16": {"lat": 29.517101, "lon": -98.374446},
    "wc17": {"lat": 29.517468, "lon": -98.376743},
    "wc18": {"lat": 29.517102, "lon": -98.380433},
    // Golf Club of Texas San Antonio
    "gctx1": {"lat": 29.388480, "lon": -98.759882},
    "gctx2": {"lat": 29.386827, "lon": -98.755725},
    "gctx3": {"lat": 29.385653, "lon": -98.754914},
    "gctx4": {"lat": 29.383518, "lon": -98.753273},
    "gctx5": {"lat": 29.379120, "lon": -98.750626},
    "gctx6": {"lat": 29.380993, "lon": -98.752352},
    "gctx7": {"lat": 29.384579, "lon": -98.755218},
    "gctx8": {"lat": 29.387443, "lon": -98.759704},
    "gctx9": {"lat": 29.391017, "lon": -98.762752},
    "gctx10": {"lat": 29.387147, "lon": -98.762513},
    "gctx11": {"lat": 29.384941, "lon": -98.759259},
    "gctx12": {"lat": 29.384008, "lon": -98.757952},
    "gctx13": {"lat": 29.380386, "lon": -98.753206},
    "gctx14": {"lat": 29.378331, "lon": -98.754961},
    "gctx15": {"lat": 29.379507, "lon": -98.754354},
    "gctx16": {"lat": 29.383357, "lon": -98.756832},
    "gctx17": {"lat": 29.386386, "lon": -98.759634},
    "gctx18": {"lat": 29.390485, "lon": -98.763361},
    // LAKE PARK 9
    "lpe1": {"lat": 33.070487, "lon": -97.010492},
    "lpe2": {"lat": 33.071359, "lon": -97.010190},
    "lpe3": {"lat": 33.070370, "lon": -97.008986},
    "lpe4": {"lat": 33.069219, "lon": -97.011602},
    "lpe5": {"lat": 33.067293, "lon": -97.007326},
    "lpe6": {"lat": 33.067302, "lon": -97.008080},
    "lpe7": {"lat": 33.068031, "lon": -97.009912},
    "lpe8": {"lat": 33.068692, "lon": -97.011495},
    "lpe9": {"lat": 33.070026, "lon": -97.011970},
    // Coyote Ridge Range
    "crr1": {"lat": 33.026738, "lon": -96.939400},
    "crr2": {"lat": 33.026996, "lon": -96.938720}, 
    "crr3": {"lat": 33.070370, "lon": -96.939122},
    "crr4": {"lat": 33.027835, "lon": -96.938511},
    // Coyote Ridge 18
    'cr1': {'lat': 33.025998, 'lon': -96.940602},
    'cr2': {'lat': 33.028534, 'lon': -96.938182},
    'cr3': {'lat': 33.033007, 'lon': -96.934319},
    'cr4': {'lat': 33.034582, 'lon': -96.9343},
    'cr5': {'lat': 33.03776, 'lon': -96.933149},
    'cr6': {'lat': 33.033096, 'lon': -96.93402},
    'cr7': {'lat': 33.02916, 'lon': -96.932242},
    'cr8': {'lat': 33.029316, 'lon': -96.933736},
    'cr9': {'lat': 33.027808, 'lon': -96.937742},
    'cr10': {'lat': 33.027044, 'lon': -96.941692},
    'cr11': {'lat': 33.028781, 'lon': -96.942734},
    'cr12': {'lat': 33.029682, 'lon': -96.942251},
    'cr13': {'lat': 33.033025, 'lon': -96.943918},
    'cr14': {'lat': 33.032726, 'lon': -96.942507},
    'cr15': {'lat': 33.032399, 'lon': -96.943916},
    'cr16': {'lat': 33.027224, 'lon': -96.944053},
    'cr17': {'lat': 33.02417, 'lon': -96.944015},
    'cr18': {'lat': 33.028424, 'lon': -96.944374},
    // Rebecca Creek - Spring Branch TX
    'rc1': {'lat': 29.912295, 'lon': -98.367051},
    'rc2': {'lat': 29.911328, 'lon': -98.362656},
    'rc3': {'lat': 29.910554, 'lon': -98.359021},
    'rc4': {'lat': 29.910798, 'lon': -98.358638},
    'rc5': {'lat': 29.909684, 'lon': -98.355148},
    'rc6': {'lat': 29.908009, 'lon': -98.353851},
    'rc7': {'lat': 29.909072, 'lon': -98.357598},
    'rc8': {'lat': 29.910758, 'lon': -98.363373},
    'rc9': {'lat': 29.91195, 'lon': -98.363561},
    'rc10': {'lat': 29.913375, 'lon': -98.366743},
    'rc11': {'lat': 29.911128, 'lon': -98.364098},
    'rc12': {'lat': 29.911379, 'lon': -98.368283},
    'rc13': {'lat': 29.911364, 'lon': -98.374525},
    'rc14': {'lat': 29.911606, 'lon': -98.375489},
    'rc15': {'lat': 29.914878, 'lon': -98.375858},
    'rc16': {'lat': 29.911815, 'lon': -98.374507},
    'rc17': {'lat': 29.913712, 'lon': -98.370757},
    'rc18': {'lat': 29.913931, 'lon': -98.370488},
    // Watters Creek Development Course 6-hole
    'wcd1': {'lat': 33.07374, 'lon': -96.689954},
    'wcd2': {'lat': 33.073594, 'lon': -96.690619},
    'wcd3': {'lat': 33.073432, 'lon': -96.689646},
    'wcd4': {'lat': 33.073394, 'lon': -96.68844},
    'wcd5': {'lat': 33.073632, 'lon': -96.688726},
    'wcd6': {'lat': 33.07393, 'lon': -96.689503},
    // Trails of Frisco
    'tof1': {'lat': 33.166608, 'lon': -96.870687},
    'tof2': {'lat': 33.168218, 'lon': -96.874991},
    'tof3': {'lat': 33.170064, 'lon': -96.875197},
    'tof4': {'lat': 33.172233, 'lon': -96.871789},
    'tof5': {'lat': 33.175948, 'lon': -96.869535},
    'tof6': {'lat': 33.177672, 'lon': -96.868172},
    'tof7': {'lat': 33.173531, 'lon': -96.868023},
    'tof8': {'lat': 33.170083, 'lon': -96.868005},
    'tof9': {'lat': 33.166879, 'lon': -96.864777},
    'tof10': {'lat': 33.166008, 'lon': -96.870735},
    'tof11': {'lat': 33.164933, 'lon': -96.873117},
    'tof12': {'lat': 33.167675, 'lon': -96.876127},
    'tof13': {'lat': 33.168317, 'lon': -96.879802},
    'tof14': {'lat': 33.168384, 'lon': -96.881354},
    'tof15': {'lat': 33.169025, 'lon': -96.876867},
    'tof16': {'lat': 33.168615, 'lon': -96.876066},
    'tof17': {'lat': 33.165872, 'lon': -96.872434},
    'tof18': {'lat': 33.164786, 'lon': -96.866037},
}