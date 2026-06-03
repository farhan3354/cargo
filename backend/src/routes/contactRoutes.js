import express from "express";
import { sendContact } from "../controllers/ContactController.js";

const router = express.Router();

router.post("/", sendContact);
router.post("/form", sendContact);
router.get("/get",(req,res)=>{
    res.send("Hello contact form");
})

export default router;
