/* eslint-disable no-unused-vars */
const express = require("express");
const verifyToken = require("../dependencies/validate-token");

const router = express.Router();

const authController = require("../controllers/auth");
const usersController = require("../controllers/userController");
const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");

// 1. AUTH ROUTES
router.post("/log-in", authController.login_post);
router.post("/sign-in", authController.signin_post);

// 2. USERS ROUTES

    // list of all users
router.get("/users", usersController.get_userList);
    // get user info. / except no unpublished posts ids.
router.get("/user/:id", usersController.get_user);
    // edit user info
router.put("/user/:id", verifyToken, usersController.put_user);
    // all posts of user. condition: if header token contains user == :id, show posts.
router.get("/user/:id/posts", verifyToken, usersController.get_posts);

// 3. POST ROUTES
    // create mew post(article)
router.post("/post", verifyToken, postsController.create_article);

    // return list of post or a particular one
router.get("/post/list", postsController.get_postList);
router.get("/post/:id", postsController.get_post);

router.put("/post/:id", verifyToken, postsController.update_post);
router.delete("post/:id", verifyToken, postsController.delete_post);
router.put("/post/:id/publish", verifyToken, postsController.publish_post);

// 4. COMMENTS ROUTES.
router.get("/post/:id/list")
router.post("/post/:id/comment")

/* testing token
router.use("/check", verifyToken, (req, res) => {
    res.json({
        error: null,
        message: "is working"
    })
})
*/

module.exports = router;