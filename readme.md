# About
Web API to shorten URL

# API Documentation
[Postman Document](https://documenter.getpostman.com/view/11722123/UV5f8uG4)

## Creating an Account
**POST /Register**
body:
```
{
    "firstName": <Your Name>,
    "lastName": <Your last Name>,
    "email": <Your email>,
    "password": <Your Password>
}
```
It should return an token

## Generating an API `token`
Note: Each [JWT](https://jwt.io/) is valid only for 2h. 
**POST /Login**
body:
```
{
    "email": <Your email>,
    "password": <Your Password>
}
```

## Using the API key in header
The key is `x-access-token`
The value is the `token`
