[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14450106&assignment_repo_type=AssignmentRepo)
# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

# Branded Things API Documentation

## Endpoint :
List of available endpoint :

`GET /posts`
`POST /posts`
`GET /posts/:id`
`PUT /posts/:id`
`DELETE posts/:id`

`POST /users/add-user`
`POST /users/login`

`GET /category`
`POST /category`
`PUT /category/:id`

`GET /pub/posts`
`GET /pub/posts/:id`


## 1. POST /add-user

Request:

- headers:

```json
{
  "access_token": "string"
}
```

```json
{
    "email" : "string",
    "content": "string",
    "role" : "string",
    "phoneNumber": "string",
    "address": "string"
}
```

_Response (201 - created)_

```json
{
    "email" : "string",
    "content": "string",
    "role" : "string",
    "phoneNumber": "string",
    "address": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email already exist"
}
OR
{
  "message": "email is required"
}
OR
{
  "message": "email invalid format"
}
OR
{
  "message": "password is required"
}
OR
{
  "message": "password must be at least 5 characters long"
}
OR
{
  "message": "phoneNumber is required"
}
OR
{
  "message": "address is required"
}
```
## 2. POST /login

Request:

- body:

```json
{
  "credential": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "message": "Login Success",
    "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email / password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email / password"
}
```
## 3. POST /posts

- Post into database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
    "title": "string",
    "content": "text",
    "imgUrl": "string",
    "CategoryId": "integer",
    "AuthorId": "integer"
}
```

_Response (201 - Created)_

```json
[
  {
    "title": "string",
    "content": "text",
    "imgUrl": "string",
    "CategoryId": "integer",
    "AuthorId": "integer"
  }
]
```
## 4. GET /posts
_Response (200 - OK)_
Description:

- GET all posts from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

```json
[
    {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "CategoryId": "integer",
        "AuthorId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "email": "string",
            "password": "string"
        },
        "Category": {
            "name": "string"
        }
    },
    {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "CategoryId": "integer",
        "AuthorId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "email": "string",
            "password": "string"
        },
        "Category": {
            "name": "string"
        }
    },
    {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "CategoryId": "integer",
        "AuthorId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "email": "string",
            "password": "string"
        },
        "Category": {
            "name": "string"
        }
    },
     {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "CategoryId": "integer",
        "AuthorId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "email": "string",
            "password": "string"
        },
        "Category": {
            "name": "string"
        }
    },
    {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "CategoryId": "integer",
        "AuthorId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "email": "string",
            "password": "string"
        },
        "Category": {
            "name": "string"
        }
    },
    {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "CategoryId": "integer",
        "AuthorId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "email": "string",
            "password": "string"
        },
        "Category": {
            "name": "string"
        }
    },
]

```

## 5. GET /posts/:id
Description:

- GET posts by id from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```
_Response (200 - OK)_

```json
 {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "CategoryId": "integer",
        "AuthorId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "email": "string",
            "password": "string"
        },
        "Category": {
            "name": "string"
        }
    },
```
## 6. PUT /posts/:id

Description:

- PUT posts by id into database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
    "title": "string",
    "content": "text",
    "imgUrl": "string",
    "CategoryId": "integer"
}
```

_Response (200 - OK)_

```json
[
   {
    "title": "string",
    "content": "text",
    "imgUrl": "string",
    "CategoryId": "integer"

  }
]
```

## 7. DELETE /posts/:id

Description:

- Delete posts by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Post has been deleted successfully"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```
## 8 GET /categories

Description:

- GET all category from database

request:
- headers:
  
``` json
{
    "access_token":"string"
}
```
_Response (200 - OK)_

Description:
- GET all categories from database
  
Request :
- headers:

```json
{
    "access_token": "string"
}
```
_Response (200 - OK)_

```json
[
    {
        "name":"string"
    },
    {
        "name":"string"
    },
    {
        "name":"string"
    }
]
```

## 9. GET /posts/:id
Description:

- GET categories by id from database

Request:
- headers:

```json
{
    "access_token":"string"
}
```

- params;
```json
{
    "id": "integer(required)"
}
```

_Response (200 - OK)_

```json
[
    {
        "name":"string"
    }
]
```
## 10. GET /pub/posts

Description:

- GET all posts from database
  
Request :

- headers
  
_Response (200 - OK)_

```json
[
    {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "CategoryId": "integer",
        "AuthorId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "email": "string",
            "password": "string"
        },
        "Category": {
            "name": "string"
        }
    },
    {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "CategoryId": "integer",
        "AuthorId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "email": "string",
            "password": "string"
        },
        "Category": {
            "name": "string"
        }
    },
    {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "CategoryId": "integer",
        "AuthorId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "email": "string",
            "password": "string"
        },
        "Category": {
            "name": "string"
        }
    },
     {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "CategoryId": "integer",
        "AuthorId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "email": "string",
            "password": "string"
        },
        "Category": {
            "name": "string"
        }
    },
    {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "CategoryId": "integer",
        "AuthorId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "email": "string",
            "password": "string"
        },
        "Category": {
            "name": "string"
        }
    },
    {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "CategoryId": "integer",
        "AuthorId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "email": "string",
            "password": "string"
        },
        "Category": {
            "name": "string"
        }
    },
]
```

## 11. GET /pub/posts/:id

Description:

- GET posts by id from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```
_Response (200 - OK)_

```json
 {
        "id": "integer",
        "title": "string",
        "content": "text",
        "imgUrl": "string",
        "CategoryId": "integer",
        "AuthorId": "integer",
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "email": "string",
            "password": "string"
        },
        "Category": {
            "name": "string"
        }
    },
```

## Globar Error

_Response (401 - Unauthorized)_
```json
{
    "message":"Unauthorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
## 12. PATCH /posts/:id/image-Url

Description:

- PATCH Post image url by id into database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- cloudnary (3rd Party API):

```json
{
  "imgUrl": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "imgUrl": "string"
  }
]
```