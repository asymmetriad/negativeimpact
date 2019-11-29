import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["negativeimpact"]
usercol = mydb["users"]
tripcol = mydb["trips"]

users = usercol.find()
for user in users:
    global dist
    dist = 0
    for t in user['history']:
        trip = tripcol.find({'_id':t})
        for doc in trip:
            dist = dist +doc['distance']
    usercol.update_one({
        '_id':user['_id']
    },{
        '$set': {
            'distance': dist
        }
    }, upsert=False)
