# Connect to Mongo DB Atlas (Mongo Cloud Solution)
# mongoAdmin
# MaggieNoodles


from pymongo import MongoClient

# prod
#mongo_uri = "mongodb+srv://nfls_user:kawboy@cluster0.3kay6.mongodb.net/nfls?retryWrites=true&w=majority"

# local db testing
#mongo_uri = "mongodb://nfls_user:kawboy@localhost:27017/nfls"

try:
    mongo_uri = "mongodb+srv://nfls_user:kawboy@cluster0.3kay6.mongodb.net/nfls?retryWrites=true&w=majority"
except KeyError:
    from secrets import mongoURI
    mongo_uri = mongoURI

client = MongoClient(mongo_uri)
db = client.nfls