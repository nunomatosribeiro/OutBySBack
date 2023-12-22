const router = require("express").Router();
const nodemailer = require('nodemailer');
const {
    sendForm,
  createForm,
} = require("../controllers/formController");


/* router.use(isAuthenticated);
router.use(extractUserId); */

router.post("/submit-form", createForm)
router.post("/send-email", sendForm);

module.exports = router;