import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import  Jwt  from "jsonwebtoken";
import { RequestValidationError } from "../errors/request-validatior-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import {BadRequestError} from "../errors/bad-request-error";
import { User } from "../models/user";
import {validateRequest} from "../middlewares/validate-request";

const router = express.Router();

router.post(
    "/api/users/signup",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20 characters")
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        
        let { email, password } = req.body;
        // check if user exists

        const user = await User.findOne({ email });
        if (user) {
            throw new BadRequestError("User already exists");
        }
        const newUser = User.build({ email, password });

        await newUser.save();
        // generate jwt
        // store it on session object

        const userJwt = Jwt.sign({
            id: newUser.id,
            email: newUser.email
        }, process.env.JWT_KEY!);

        req.session = {
            jwt: userJwt
        };

        // newUser.password = "****Not shown****";
        res.status(201).send(newUser);
    }
);

export { router as userSignUpRouter };
