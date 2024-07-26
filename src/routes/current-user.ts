import express   from "express";
import Jwt from "jsonwebtoken";
import { currentUser } from "../middlewares/current-user";
const router = express.Router();

router.get("/api/users/currentuser",currentUser, (req, res) => {
    res.send({currentUser: req.currentUser || null});
});

export { router as currentUserRouter };