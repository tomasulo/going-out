import requests
import delorean
import json
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

for stop in stops(freq=delorean.DAILY, count=1):

    since = Delorean(stop.start_of_day).epoch
    until = Delorean(stop.end_of_day).epoch

    for lat, lng in munich:

        payload = {"lat": lat, "lng": lng, "distance": "2000",
                   "sort": "time", "since": since, "until": until}

        r = requests.get(url, params=payload)
        data = r.json()

        for event in data["events"]:
            print(json.dumps(event["name"], indent=2))
            // TODO
            - extract data from json
            - call api to store element in dynamodb
            - be aware of duplicates