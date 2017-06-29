import requests
import delorean
import json
import boto3

from delorean import stops
from delorean import Delorean

munich = (["48.131726", "11.549377"],
          ["48.106973", "11.558304"],
          ["48.135621", "11.576328"],
          ["48.160818", "11.549549"],
          ["48.170665", "11.625423"],
          ["48.139745", "11.623192"],
          ["48.112016", "11.598473"])

url = "http://localhost:3050/events"

dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('events')

for stop in stops(freq=delorean.DAILY, count=7):

    since = Delorean(stop.start_of_day).epoch
    until = Delorean(stop.end_of_day).epoch

    for lat, lng in munich:

        payload = {"lat": lat, "lng": lng, "distance": "2000",
                   "sort": "time", "since": since, "until": until}

        print(str(payload))

        r = requests.get(url, params=payload)
        data = r.json()

        if "events" in data:
          events = data["events"]

          print("Found " + str(len(events)) + " events")

          for event in events:

            id = event["id"]
            name = event["name"]
            startTime = event["startTime"]
            city = event["venue"]["location"]["city"]
            description = event["description"]
            imageUrl = event["profilePicture"]
            endTime = event["endTime"]
            venue = event["venue"]   

            zip = 0
            street = "undefined"

            if "street" in event["venue"]["location"]:
              street = event["venue"]["location"]["street"]

            if "zip" in event["venue"]["location"]:
              zip = event["venue"]["location"]["zip"]     

            venue = {
              'name': event["venue"]["name"],
              'postalcode': zip,
              'street': street
            }

            table.put_item(
              Item={
                'id': id,
                'city': city,
                'description': description,
                'imageUrl': imageUrl,
                'name': name,
                'until': endTime,
                'since': startTime,
                'venue': venue
            })

# first aggregate all events for a day
# log how many -> already filter for duplicates
# then save to dynamo

# todo rename since to startTime and until to endTime
        