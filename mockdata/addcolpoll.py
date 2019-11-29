import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["negativeimpact"]
usercol = mydb["users"]
tripcol = mydb["trips"]

users = usercol.find()
for user in users:
    global poll
    poll = 0
    for t in user['history']:
        trip = tripcol.find({'_id':t})
        for doc in trip:
            poll = poll +doc['pollution']
    usercol.update_one({
        '_id':user['_id']
    },{
        '$set': {
            'pollution': poll
        }
    }, upsert=False)
