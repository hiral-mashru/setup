define({ "api": [
  {
    "type": "post",
    "url": "/insert",
    "title": "User Signup",
    "name": "signup",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User saved successfully</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User information</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.id",
            "description": "<p>User Unique Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>Name of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>Email of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.password",
            "description": "<p>Password of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.updatedAt",
            "description": "<p>Timestamp when user is updated</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.createdAt",
            "description": "<p>Timestamp when user is created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n \"message\":\"User saved successfully\",\n \"user\":{\n     \"id\":1,\n     \"name\": \"Hiral Mashru\",\n     \"email\": \"hiral@gmail.com\",\n     \"password\": \"$2b$10$21G.5vrMqlAGzHnSBcVVxu0UPPkfZkbqYnR1rEZq3GZPZkc9JsbLe\",\n     \"updatedAt\": \"2021-04-21T10:21:27.527Z\",\n     \"createdAt\": \"2021-04-21T10:21:27.527Z\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./apidocs.js",
    "groupTitle": "Auth"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "E:\\hiral\\Cybercom Creation\\Company work\\JS\\apis\\docs\\main.js",
    "groupTitle": "E:\\hiral\\Cybercom Creation\\Company work\\JS\\apis\\docs\\main.js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/student/:id",
    "title": "Shows the particular student details",
    "name": "showStudent",
    "group": "Student",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n Your all students are here",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./apidocs.js",
    "groupTitle": "Student"
  }
] });
