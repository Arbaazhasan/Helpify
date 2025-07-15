import express from "express"
import { userLogout, userRegistration } from "../controller/userAuthentication.controller.js";

const router = express.Router();

router.post("/userRegistration", userRegistration);
router.get("/userLogout", userLogout);


export default router;