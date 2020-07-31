# membership-API
[![Build Status](https://travis-ci.com/tobykeegan/membership-API.svg?token=hx9Ymp7HNdgDJ4JZHKGM&branch=master)](https://travis-ci.com/tobykeegan/membership-API)

-----

This is a playground to experiment with ways of completing my Firebrand synoptic project. 


-----

## Endpoint overview

Method | Endpoint | Function
--- | --- | ---
GET | / | Determines if a kiosk has auth.
GET | /user/:id | Retrieves name and balance of user
PUT | /user/:id/:value | Increase or deduct from user balance

_More to be added in time_


-----
## Detailed endpoint descriptions 

All accessible endpoints of this API are secured by a back-end kiosk authentication system. This system ensures that only kiosks recognised by the database are allowed to charge user accounts. To enable this authentication, all API calls must include the following headers: 

```json
{
    "kioskID" : "<Kiosk ID goes here>",
    "apikey" : "<Secret API key>"
}
```

You **must** include these headers in **every** request you make to the API, or you will get `Error 403 - Forbidden`.

### `GET /`
The root URL currently authenticates the kiosk, but does nothing else. This is useful for debugging and connecting a new kiosk to the system. Any body provided with this request will be ignored. There are two results that this can return:

```json
{
    "message": "Unauthorised access denied."
}
```
```json
{
    "detectedUser": "<KioskID> connected successfully."
}
```

### `GET /user/:id`

Encoding a user ID into the URL with the `/user` prefix will return the basic details of the member. This system currently uses the included ObjectID from MongoDB as a unique identifier for each user. *This will be deprecated soon and replaced with stronger, randomly generated IDs.*

For now, these are the possible outcomes:

#### Input
`GET /user/5f23fc8c1d73d90680737980`
#### Outputs
`Status : 
```json
{
    "_id": "5f23fc8c1d73d90680737980",
    "firstName": "John",
    "lastName": "Doe",
    "balance": "£91.72"
}
```
```json
{
    "message": "User not found.",
    "failedID": "5f23fc8c1d73d90680737980"
}
```

