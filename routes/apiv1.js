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

    // get user info. / except no unpublished posts ids.
router.get("/user/:id", usersController.get_user);
    // list of all users
router.get("/user/list", usersController.get_usersList);

    // edit user info
router.put("/user/:id", verifyToken, usersController.put_user);
    // all posts of user. condition: if header token contains user == :id, show posts.
router.get("/user/:id/posts", verifyToken, usersController.get_posts);

// 3. POST ROUTES

// 4. COMMENTS ROUTES.
/* testing token
router.use("/check", verifyToken, (req, res) => {
    res.json({
        error: null,
        message: "is working"
    })
})
*/

module.exports = router;