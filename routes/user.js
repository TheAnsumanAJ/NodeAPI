import express from "express";
import { getAllUsers } from "../controllers/users.js";
import { register } from "../controllers/users.js";
import { getMyProfile, login } from "../controllers/users.js";

const router = express.Router();

router.get("/users/all", getAllUsers);

router.post("/users/new", register);

router.post("/users/login", login);

router.get("/users/me", getMyProfile);


export default router;