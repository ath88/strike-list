strike-list
===========

This is my implementation of a strike list system, for my good friends to use.

# Client

The client resides on `/`.

The client is not even close to resembling anything that might probably or
possibly at some point later in time have some minor functionality. Disregard
it.

# API

The API is currently in version 0 (alpha), and resides on `/apiv0`. All
resources are mounted onto this path.

When you post data to the API, it will either be through a specific URL that
contains id's, or with a JSON object in the request body.

There are 3 types of resources;
- Items - mounted onto `/items`
  - These are items that can be purchased
- Lists - mounted onto `/lists`
  - These are collections of purchases
- Users - mounted onto `/users`
  - These are users that can make purchases

Resources are created by `POST`ing to the resource path. E.g.
`POST /apiv0/users`.

Reading, updating and deleting is done by sending the appropriate HTTP method to
the resource path with a resource id. E.g. `GET /apiv0/users/1`.

Actions on resources can be performed by `POST`ing to the resource path with a
resource id and the action. E.g. `POST /apiv0/users/1/deactivate`.

Some actions requires id's from other resources, in which case they are also
supplied. E.g. `POST /apiv0/users/1/buy/1/in/1`.

Searching can be done by `GET`ing the resource path with a filter. If no filter
is supplied, the search will return all resources of that type. An example
filter could be:

``` javascript
GET /apiv0/lists
{
    "open": true
}
```

.. which will return all open lists.


## Items
Items are whatever you are selling to your good friends. They can be anything,
really; apples, beers, kisses, etc. Items can only be updated and deleted, if
they have not previously been bought. Once you are out of stock, the item can be
deactivated, and it can no longer be bought. If you gain more stock, the item
can be reactivated for more purchases.

### Schema
``` javascript
{
    "itemId":     1,                         //INTEGER
    "name":      "Apple",                    //STRING
    "price":     "5.5",                      //FLOAT
    "active":     true,                      //BOOLEAN
    "createdAt": "2016-03-10T21:15:06.123Z", //STRING
    "updatedAt": "2016-03-10T21:15:06.123Z"  //STRING
}
```
When creating an item, a `name` and `price` must be supplied.

### Actions

#### Deactivate
- `/items/:itemId/deactivate`

This will set `active` to `false`, and the item can no longer be bought.

#### Activate
- `/items/:itemId/activate`

This will set `active` to `true`, and the item can again be bought.


## Lists
A list is collections of purchases, typically limited to a specific time
interval. The intention is to allow many small purchases to show up as a single
debit item, for simplicity. A list can never be deleted, it can only be closed,
in which case it can be regarded as *archived*.

### Schema
``` javascript
{
    "listId":     1,                         //INTEGER
    "open":       true,                      //BOOLEAN
    "createdAt": "2016-03-10T21:15:06.123Z", //STRING
    "updatedAt": "2016-03-10T21:15:06.123Z"  //STRING
}
```
When creating a list, no information can be supplied.

### Actions

#### Close
- `/lists/:listId/close`

This will set `open` to `false`, and no more purchases can be made to the list.


## Users
Users are people you know. They like to buy your stuff, which is why you'd like
to keep track of their credit balance. Users can be deleted at any time, in
which case knowledge of their (potentially negative) balance is lost.

### Schema

``` javascript
{
    "userId":   1,                           //INTEGER
    "name":    "Apple Jack",                 //STRING
    "balance": "50",                         //FLOAT
    "active":   true                         //BOOLEAN
    "createdAt": "2016-03-10T21:15:06.123Z", //STRING
    "updatedAt": "2016-03-10T21:15:06.123Z"  //STRING
}
```

On creation you must supply a `name`.

### Actions

#### Deactivate
- `/users/:userId/deactivate`

This will set `active` to `false`, and the item can no longer be bought.

#### Activate
- `/users/:userId/activate`

This will set `active` to `true`, and the item can again be bought.

#### Add balance
- `/users/:userId/addBalance`

An `amount` must be supplied. This will determine how much is added to the users
`balance`.

#### Buy item in list
- `/users/:userId/buy/:itemId/in/:listId`

An `amount` must be supplied. This will determine how many of the specified item
will be bought. Jack might want to buy many apples at a time. The balance sum
will be subtracted from the users balance.


End of documentation. /qed
====================

# Notes for me

#### TODO
- Combining purchases on two lists
  - This contains (some date logic too)
- Changing the price of an item, even though it has been used
- Some good way to see total user debit from a list
- Minimum balance based on domain
- Authentication based on domain and user? How much trust is necessary?
- Authentication on `user.addBalance` and maybe more?
- Some kind of ledger overview, maybe?


#### Setup environment

Starting the required PostgreSQL database in Docker can be done like this;
```
docker run -d \
    --name postgres-strike-list \
    -e POSTGRES_PASSWORD=password \
    -v /persistent/storage:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres:9.5.1
```
