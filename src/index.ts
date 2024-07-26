import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { currentUserRouter  } from "./routes/current-user";
import { userSignInRouter } from "./routes/signin";
import { userSignUpRouter } from "./routes/signup";
import { userSignOutRouter } from "./routes/signout";

import { errorHandler } from "./middlewares/error-handlers";
import { NotFoundError } from "./errors/not-found";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);


// routes
app.use(currentUserRouter);
app.use(userSignInRouter);
app.use(userSignUpRouter);
app.use(userSignOutRouter);


// route not found
app.all("*", async (req, res, next) => {
    next( new NotFoundError());
});

// middleware to handle errors
app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
}

start();

app.listen(3000, () => {
    console.log("Server is running on port 3000!!!!!");
});
