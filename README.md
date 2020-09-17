# membership-API
[![Build Status](https://travis-ci.com/tobykeegan/membership-API.svg?token=hx9Ymp7HNdgDJ4JZHKGM&branch=master)](https://travis-ci.com/tobykeegan/membership-API)

-----

This software stack enables a membership system for First Catering Ltd. 



-----
## Detailed endpoint descriptions 

All accessible endpoints of this API are secured by a back-end kiosk authentication system. This system ensures that only kiosks recognised by the database are allowed to charge user accounts. To enable this authentication, all API calls must include the following headers: 

Key | Value
:-:|:--
kioskID | KAO33FSX1WC
apiKey | 162BD502-130C-9E14-C44C-DE99ED9C74DC



You **must** include these headers in **every** request you make to the API, or you will get `Error 403 - Forbidden`.

-----


### `GET /api/`
The root URL currently authenticates the kiosk, but does nothing else. This is useful for debugging and connecting a new kiosk to the system. Any body provided with this request will be ignored. There are two results that this can return:

```json
HTTP STATUS 403
{
    "message": "Unauthorised access denied."
}
```

```json
HTTP STATUS 200
{
    "detectedUser": "<KioskID> connected."
}
```
-----


### `GET /api/user/:id`

Encoding a card ID into the URL of this endpoint has a few outcomes:
-----

#### Request
Valid ID, no PIN included
#### Response

```json
HTTP STATUS 406
{
    "action": "getPin"
}
```
-----
#### Request
Valid ID, PIN included
#### Response
```json
HTTP STATUS 200
{
    "action": "showWelcome",
    "content": "Welcome, User!"
}
```
-----
#### Request
Valid ID, invalid PIN included
#### Response

```json
HTTP STATUS 403
{
    "message": "PIN code incorrect."
}
```

-----
#### Request
A valid, but non-existing User ID
#### Response
```json
HTTP STATUS 404
{
    "action": "register",
    "message": "User not found.",
    "failedID": "abcdef1234567899"
}
```
_This will also include a header containing the URI to POST with new user details_

-----

#### Request
Invalid ID
#### Response
```json
HTTP STATUS 400
{
    "message": "The ID provided was invalid. It must be a string of 16 alphanumeric characters.",
    "failedID": "kM_56FnG0P+6F56e"
}
```
-----
#### Request
Any request with an expired session
#### Response

```json
HTTP STATUS 403
{
    message : "Session expired. Goodbye"
}
```
-----
#### Request
A second tap of the card
#### Response
```json
HTTP STATUS 403
{
    message : "Session expired. Goodbye"
}
```
