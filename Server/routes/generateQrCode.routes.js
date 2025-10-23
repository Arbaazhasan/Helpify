
import express from 'express'
import { userAuthenticaiton } from '../middleware/auth.middleware.js';
import { deleteQRCode, generateQrCode, getAllQrCodes, getOwnerDetail, verifyOwnerWithKey } from '../controller/generateQrCode.controller.js';

const router = express.Router();


router.post("/generateQrCode", userAuthenticaiton, generateQrCode);
router.post("/deleteQrCode", userAuthenticaiton, deleteQRCode);
router.post("/verfiyownerwithkey/:id", verifyOwnerWithKey);
router.get("/getownerdetails/:id", userAuthenticaiton, getOwnerDetail);
router.get("/getallqrcodes", userAuthenticaiton, getAllQrCodes);

export default router;