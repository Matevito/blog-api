BLOG API
=========
BLOG API is a basic rest API that can work as a backend of a blog  app. Is built on express and uses mongodDB as database. It handles most of the basic CRUD operations and it uses JWT (json web tokens) to handle authentication of the authors of your blog.
The app is built in a kind of MVC structure, where the role of the view is taken by json responses. The app uses the following models to structure a database:

- USER (authors in your blog app)
- POST (article)
- COMMENT (comments of the articles).

If you feel more comfortable using other type of databases like SQL is recommended to use other kind of app cause all of the CRUD operations in the routes, and a couple of middlewares too, have in mind mongoDB.

Installation
--------
Is recommended to have installed on the pc the last version of Nodejs. Have in hand the credentials of your mongodb cloud service to correctly connect the API to a database. In your terminal do the following:

1. Clone the repo

        git clone https://github.com/Matevito/blog-api

2. Enter the app folder

        cd blog-api/

3. Install the npm packages of the app

        npm install

4. Set up the app config variables
In a development environment the variable configs can be managed easily in an .env file. In production this must be settled on your deployment environment. The app variables are the following:
        
            NOVE_ENV="development"
            DB_URL=<mongodb cloud access link>

            SALT_FACTOR=<integer value of your choice>
            TOKEN_SECRET=<a secret string>

5. Lastly, run the app

        npm start


Features
--------
- Authentication protection to some routes using JWT.
- Handles creation, edition and delete of articles.
- Publish function on the posts. The author can decide willingly when to publish an article and can save and not publish the ones it's working on until they are ready.
- Basic author profile, without a user picture, that display its name and a short bio.
- Comments do not require authentication or an email but these functionalities can be easily implemented.
- Do not required been registered to a session authentication to post a comment on an article (does not even require an email or username).
- Comments cannot be entirely deleted, so it gives the app a sense of no censorship cause if a comment is "deleted" is noticeable. This can be easily changed, making the adjustments to the corresponding route that only change the displayed message content to actually erase it.

How to use
----------
Please, have in mind that all the routes of the app are placed on the "/apiv1" router. Because of this, the root of your api will always consist of "<root>/apiv1" instead of just "<root>/". Where "/root" consist on the URL where your app is running.
We can divide quickly all the possible routes in the api as those that require authentication (a JWT) and those that do not. The ones that require it are planned to be used by the front-end of the authors, the others by both the authors and the public (the function to publish comments do not require any kind of authentication as was already explained).
Before we start let's talk about the 3 basic routes that handle the authentication of the app.

1.Authentication
=================
    -POST "/sign-in" { username, password, repeat_password, firstName, secondName}
It receives an object with the basic user info and returns a confirmation response if all instances of the object have a valid value and both password objects are the same. Notice that the call does not require giving a bio value and its default value consist in a blank space.

    -POST "/log-in" { username, password}
Checks if the user is stored in the database and if the password sent is the same as the stored one. The password is, naturally, hashed. But more importantly the process of storage and comparation are linked into the model itself, so you do not have to waste space in the logic of the middleware to handle this tasks. If you want to make changes to this methodology do them where the User model is defined.
It returns a JWT token that gives access to protected routes and feed those with the user information to handle the corresponding tasks of those. You can storage this token on localstorage or wherever you prefer in your front-end.

    -GET "/whoami" {config:{ header: { auth-token: token}}}
    
It receives a token and send the "_id" and the "username" of the user stored in the JWT. If you want to use other method to decrypt this info stored on the token feel free to do it and ignore this route.


2.Unprotected routes
===================
This functions do not require any kind of authentication so will be the building blocks of the front-end that interacts with the readers of the blog.

    -GET "/users"
Send a list with the username and id's of the stored authors in the database. Their posts are included too, but only its title and id values.

    -GET "/user/:id"
Sends the profile info of a user with the id value of the params. Regarding the post (articles), it sends only the ones that have a published value of true.

    -GET "/post/list"
Sends a response with a list of all published posts (articles) with its corresponding id's, titles, blog text and author values. It has too it's publish date value.

    -GET "/post/:id"
Sends a post stored in the database with its corresponding values.

    -GET "/post/:id/comment/list"
Send an array of all the comments that are linked to the requested post whose id is the parsed params value.

    -POST "/post/:id/comment", { message }
It stores in the database a comment of a post whose id is the value of params. It requires only the message and does not handle any kind of way to connect the message to an email or a username of any kind.


3.Protected routes
==================
All the following routes require a token to be accessed. this token is stored in a header called "auth-token". In the following examples we will refer to these headers as the following constant:

    config = {
        header:{ auth-token: valid_token }
    }

If the token send is invalid all the following routes will send an Error response with a message saying that the route its protected.

    -PUT "/user/:id", { userinfo... }, config
It updates a user. The values that cannot be modified are the username and the passwords. The route is protected in a way that the call can only be successful if the user "_id" value is the same one of the one we are making the call, this means, the user making the request to edit a user is itself.

    -GET "/user/:id/posts", config

It returns all the post of a user with and id equal to the params id value. It returns even unpublished (publish value of false).

    -POST "/post", { title, text }, config
It stores a post. The default value of published is false, so it's required a second call to being able to be sent by the public routes methods.

    -PUT "/post/:id", { title, text}, config 
It changes the values of a stored post for the sent object. It has protection of other users different of the author, so one user cannot modify blogs of another one.

    -DELETE "/post/:id", config
Delete a post with the id of params, nothing more than that. The controller of the route does not delete comments attached to the post, so have that in mind if it can be an issue in the form you structure your front-end or are you giving access to your db.

    -PUT "/post/:id/publish", {}, config
the route takes a post whose id is the value on the params and set its published status to true if it is false, or false if it is true. It is required to send a blank object making the call to evade a bug making a put call without sending an object attached to it.

    -PUT "/post/:id/comment/:commentID", {}, config
Pseudo function method of delete comments of the api. It changes the value of a comment message saying that the message has been deleted for being considered inappropriate.

Possible features to implement in the future
--------------------------------------------
- An additional layer of session authentication to protected routes instead of just JWT.
- A route that only sends an array of all the published articles that only contains its title, the author, its id and the number of comments it has. Instead of just sending the whole posts information stored on the database. This makes the call quicker if the db becomes too big.
- The GET /post/:id route should send too it's comments information instead of making a different call just to take this information.
- When a post is deleted all its comments linked to it are deleted too.
- A functional delete function to erase comments instead of just editing them.