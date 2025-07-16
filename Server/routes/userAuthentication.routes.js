import express from "express"
import { userLogin, userLogout, userRegistration } from "../controller/userAuthentication.controller.js";

const router = express.Router();

router.post("/userRegistration", userRegistration);
router.post("/userLogin", userLogin);
router.get("/userLogout", userLogout);


export default router;