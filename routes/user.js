import express from "express";
import { allUsers } from "../controllers/users.js";
import { register } from "../controllers/users.js";
import { getUserDetails } from "../controllers/users.js";

const router = express.Router();

router.get("/users/all", allUsers);

router.post("/users/new", register);

router.get("/userId/:id", getUserDetails);

export default router;