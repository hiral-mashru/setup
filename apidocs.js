/**
 * @api {get} /student/:id  Shows the particular student details
 * @apiName showStudent
 * @apiGroup Student
 * @apiParam {Number} id User's unique ID.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *  Your all students are here
 */

/**
 * @api {post} /insert User Signup
 * @apiName signup
 * @apiGroup Auth
 * 
 * @apiParam {String} name Name of the User
 * @apiParam {String} email Email of the User
 * 
 * 
 * @apiSuccess {String} message User saved successfully
 * @apiSuccess {Object} user User information
 * @apiSuccess {Number} user.id User Unique Id
 * @apiSuccess {String} user.name Name of the User
 * @apiSuccess {String} user.email Email of the User
 * @apiSuccess {String} user.password Password of the User
 * @apiSuccess {String} user.updatedAt Timestamp when user is updated
 * @apiSuccess {String} user.createdAt Timestamp when user is created
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 OK
 * {
 *  "message":"User saved successfully",
 *  "user":{
 *      "id":1,
 *      "name": "Hiral Mashru",
 *      "email": "hiral@gmail.com",
 *      "password": "$2b$10$21G.5vrMqlAGzHnSBcVVxu0UPPkfZkbqYnR1rEZq3GZPZkc9JsbLe",
 *      "updatedAt": "2021-04-21T10:21:27.527Z",
 *      "createdAt": "2021-04-21T10:21:27.527Z"
 *  }
 * }
 * 
 */