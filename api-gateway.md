## Integration Request

{
  "TableName": "events",
  "Item": {
    "id": {
      "S": "$input.path('$.id')"
    },
    "description": {
      "S": "$input.path('$.description')"
    },
    "name": {
      "S": "$input.path('$.name')"
    },
    "since": {
      "S": "$input.path('$.since')"
    },
    "until": {
      "S": "$input.path('$.until')"
    },
    "city": {
      "S": "$input.path('$.city')"
    },
    "imageUrl": {
      "S": "$input.path('$.imageUrl')"
    },
    "venue": {
      "M": {
        "name": {
          "S": "$input.path('$.venue.name')"
        },
        "street": {
          "S": "$input.path('$.venue.street')"
        },
        "postalcode": {
          "S": "$input.path('$.venue.postalcode')"
        }
      }
    }
  }
}

## Sample Put request

{
  "id": "random-id-123",
  "description": "description",
  "name": "name",
  "since": "since",
  "until": "Until",
  "city": "Munich",
  "imageUrl": "url",
  "venue": {
    "name": "venue name",
    "street": "street 13",
    "postalcode": "123"
  }
}