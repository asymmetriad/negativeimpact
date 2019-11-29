import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["negativeimpact"]
usercol = mydb["users"]
tripcol = mydb["trips"]

tripquery = { "user":None }
userquery = { "history":[] }

myusers = usercol.find(userquery)

for y in myusers:
    mytrips = tripcol.find(tripquery)
    count=0
    for x in mytrips:
        if count<10:
            tripcol.update_one({"_id":x["_id"]},{'$set':{'user':y["_id"]}})
            usercol.update_one({"_id":y["_id"]},{'$push':{'history':x["_id"]}})
            count+=1
        else:
            break
