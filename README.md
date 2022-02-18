BLOG API
=========
BLOG API is a basic rest api that can works as a backend of a blog  application. Is built on express and uses mongodDB as adatabase. It handles most of the basic CRUD opperations and it uses tokens to handle authentication of the authors of your blog.
The app works only with 3 kind of models:

-USER (authors in your blog app)
-POST (article)
-COMMENT (comments of the articles).

If you feel more confortable using other type of dtabases like sql or other types of nosql it's recomended to use other kind of app cause all of the crud operations in the routes, and a couple of middlewares too, have in mind mongoDB.

Instalation
-----------}
//todo:
1- clone this folder.
2- npm i
3- -...

In a development envyroment the cariable configs can be managed easily in an .env file. in production this must be settled on your development evyronment cause a .env file is simply not secure enough in this cases.


Features
--------
- Authentication protection to some routes using JWT.
- Scalable models structure to connect the api to the mongodb dependency you want to.
- Handles creation, edition and eraseof articles.
- Publish function on the posts. The author can decide willingly when to publish the article and can save and not publish the ones it's working on.
- Basic author profile, without a user picture, that display it's name and a short bio.
- Comments do not require authentication or an email but this functionalities can be easily implemented.
- Comments cannot be enterily deleted, so it gives to the app a cense of no censorship. This can be easily changed making the adjustments on the corresponding route that only change the displayed message content.
- Do not required been registered to a session authentication to posta comment on an article (does not even require an email or username too).

How to use
----------
Please, have in mind that all  the routes of the app are places on the "/apiv1" router. Because of this, the root of your api will consist on "/root/apiv1" instead of just "root/". Where "/root" consist on urlwhere ur app it's stored.
Whe can divide quickly all the possible routes in the api as those that require authentication (a JWT) and those that do not.The ones that require it are planned to be used in a front-end used by the author that want to publish on your blog, the other ones to both the public front-end (the function topublish comments do not require any kind of authentication).
the authors one.
Before we start let's talk about the 3 basic routes that handle the authentication of the app.

1.Authentication
=================
    -POST "/sign-in" { username, password, repeat_password, firstName, secondName}
It receives an object with the basic user info and returns a confirmation response if all instances of the object have a valid value and both password objects are the same. Notice that the calldoes not requiregiving a bio value and it's default value consist in a blank space.

    -POST "/log-in" { username, password}
Checks if the user is stored in the database and if the password sent it's the same as the stored one. The password is, naturally, hashed. But more importantly the proccess of storage and comparation are linked into the model itself, so you do not have to waste space in the logic of the middleware to handle this tasks. If you want to make changes to this methodology do them where the User model is defined.
It returns a JWT token that gives access to protected routes and feed those with the user information to handle the corresponding tasks of those. You can storage this token on localstorage or wherever you prefer.

    -GET "/whoami" {config:{ header: { auth-token: token}}}
It receives a token and send the "_id" and the "username" of the user stored in the JWT. If you want to use other method to decrypt this info stored on the token feel free to do it and ignore this route.


2.Unprotected routes
===================
This functions do not require any kind of authentication so willbe the building blocks of the front-end that will interact with the readers of the blog.

    -GET "/users"
Send a list with the username and ids of the stored authors in the database. Their posts are included too,but only it title and id values.

    -GET "/user/:id"
Sends the profile info of a user with the id value of the params. Regarding the post (articles), it send only the ones that have a published value of true.

    -GET "/post/list"
Sends a list of all published posts (articles) with its id, title,text and author. It has too it's publish date value.

    -GET "/post/:id"
sends a post stored in the database with it's corresponding values.

    -GET "/post/:id/comment/list"
Send an array of all the comments that posses are reference to the post with the id of params.

    -POST "/post/:id/comment", { message }
It stores in the database a comment of apost whose id is the value of params. It requires only the message and does not handle any kind of way to connect the message to an email or a username of any kind.


3.Protected routes
==================
All the following routes require a token to be accesed. this token is stored in a header called "auth-token". In the following examples we will refer to this headers asthe following constant:

    config = {
        header:{
            auth-token: valid_token
        }
    }

If the token send is invalid all the following routes will send an object with a message saying that the route its protected.

    -PUT "/user/:id", { userinfo... }, config
It updates a user. The values that cannot be modified are the username and the passwords. The route it'sprotected in a way that the call can only be successfull if the user _id value its the same one of the one we are making the call.

    -GET "/user/:id/posts", config

It returns all the post of a user with and id equal to the params id value. It returns even unpublished ones and cannot return post lists differents to the user that is making the call.

    -POST "/post", { title, text }, config
It stores a post. The default value of published is false, so it's required a second call to beign able to be send in the public routes method.

    -PUT "/post/:id", { title, text}, config 
It changes the values of a stored post with the id value of the params id for the send object. It has protection of other users to make the call.

    -DELETE "/post/:id", config
Delete a post with the id of params, nothing more than that. The controller of the route does not delete comments attached to the post, so have that in mind if it can be an issue in the form you structure your front-end.

    -PUT "/post/:id/publish", {}, config
the route takes a post whose id is the value on the params and set its published status to true if it is false, or false if it is true. It is requried to send a blank object making the call to evade a bugg making a put calll without sending a object attached to it.

    -PUT "/post/:id/comment/:commentID", {}, config
Pseudo function method of delete comments of the api. It changes the value of a comment message saying that the message has been delete for beign considered innapropiate.

Possible features to implement in the future
--------------------------------------------
- An additional layer of session authentication to pretected routes instead of just JWT.
- A route that only send an array of all the published articles that only contains its title, the author, its id and the number of comments it has. Instead of just sending the whole posts information stored on the database. This makes the call quicker.
- The get post route should send too it's comments information.
- When a post is deleted all its comments linked to it are deleted too.
- A real delete function to erase comments.