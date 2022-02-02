/* eslint-disable no-undef */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/*  process.env.SALT_FACTOR
    process.env.DEFAULT_PIC
*/
if (process.env.NODE_ENV !== 'production') require("dotenv").config({ path: '../.env' });

const userSchema = mongoose.Schema({
    username: { type: String, required:true, unique: true, minLength: 3, maxLength: 100 },
    password: { type: String, required: true, minLength: 5 },
    firstName: { type: String, default: "", maxLength: 100 },
    secondName: { type: String, default: "", maxLength: 100},
    bio: { type: String }
});

// handle password schemas.
userSchema.pre("save", function(done) {
    const user = this;

    // handle editing user and not changing the password parameter
    if (!user.isModified("password")){
        return done()
    }
    const saltFactor = parseInt(process.env.SALT_FACTOR);
    bcrypt.genSalt(saltFactor, (err, salt) => {
        if (err) { return done(err) }
        bcrypt.hash(user.password, salt, (err, hashedPassword) => {
            if (err) { return done(err); }
            user.password = hashedPassword;
            done();
        });
    });
});
userSchema.methods.checkPassword = function(guess) {
    return bcrypt.compare(guess, this.password)
};

// user usual methods.
userSchema.methods.displayName = function() {
    if(this.firstName === "" && this.SecondName === ""){
        // if the first and second values are blank, return username.
        return this.username;
    } else if (this.firstName !== "" && this.SecondName === ""){
        // if the only value is the first name return it.
        return this.firstName;
    } else {
        // return formatted second and first names.
        return this.secondName + ", " + this.firstName
    }
};

userSchema.methods.url = function(){
    return "/apiv1/user/" + this._id;
}

const User = mongoose.model("User", userSchema);
module.exports = User;