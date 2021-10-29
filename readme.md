#usage

POST /api/url/shorten
    body
    {
        "longUrl": String,
        (optinal) "urlCode": String
    }

GET /:code

POST /login