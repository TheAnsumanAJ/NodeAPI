import express from "express";
import { getAllUsers } from "../controllers/users.js";
import { register } from "../controllers/users.js";
import { getMyProfile, login, logout } from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);


export default router;
