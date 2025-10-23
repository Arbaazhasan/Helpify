
import express from 'express'
import { userAuthenticaiton } from '../middleware/auth.middleware.js';
import { deleteQRCode, generateQrCode, getOwnerDetail, verifyOwnerWithKey } from '../controller/generateQrCode.controller.js';

const router = express.Router();


router.post("/generateQrCode", userAuthenticaiton, generateQrCode);
router.post("/deleteQrCode", userAuthenticaiton, deleteQRCode);
router.post("/verfiyownerwithkey/:id", userAuthenticaiton, verifyOwnerWithKey);
router.get("/getownerdetails/:id", userAuthenticaiton, getOwnerDetail);

export default router;