const express = require('express');
const router = express.Router();
const {sendContactMail,getMessages} = require("../controllers/contactcontroller");

router.post("/", sendContactMail);
router.get("/", getMessages);

module.exports = router;