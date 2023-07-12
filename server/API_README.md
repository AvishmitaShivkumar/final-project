# Grounded 
A website for aiding in a meditation and gratitude practice. A MERN project. 

## Endpoints
| Endpoint                | Method   | Description                                               | Handler          |
| ----------------------- | -------- | --------------------------------------------------------- |----------------- |
| `/api/signin`           | `POST`   | Securely handles signins - validates info & signs them in | handleSignIn     |
| `/api/signup`           | `POST`   | Adds a new user to the users collection                   | handleSignUp     |
| `/api/gratitude`        | `POST`   | Adds a gratitude entry to the gratitude collection        | addGratitude     |
|`/api/gratitude/:_id`    | `GET`    | Fetches the all gratitude entries of a single user        | getUserGratitude |
| `/api/gratitude/edit`   | `PATCH`  | Updates a single gratitude entry.                         | editGratitude    |
| `/api/gratitude/delete` | `DELETE` | Deletes a single gratitude entry                          |  deleteGratitude |
| `/api/meditation`       | `POST`   | Adds a meditation entry to the meditation collection      | addMeditation    |
| `api/quote`             | `GET`    | Fetches a random quote from Zen Quotes API                | getQuotes        |


#### Body expected

For sign in requests (POST, handleSignIn):

```json
{
    "email": "<Email>",
    "password": "<Password>"
}
```

For sign up requests (POST, handleSignUp):

```json
{
    "_id": "<Email>",
    "name": "<Full Name>",
    "email": "<Email>",
}
```

For add gratitude requests (POST, addGratitude):

```json
{
    "accountId": "<User Id>",
    "email": "<Email>",
    "log": "<Object with User Entered Gratitude>",
}
```

For edit gratitude requests (POST, editGratitude):

```json
{
    "accountId": "<User Id>",
    "log": "<Object with User Entered Replacement Text>",
}
```
For add meditation requests (POST, addMeditation):

```json
{
    "accountId": "<User Id>",
    "log": "<Meditation duration>",
}
```