const Forms = require("../models/Form.model");
const User = require("../models/User.model");
const nodemailer = require('nodemailer');
/****Send a Form to email ****/
const sendForm = async (req, res) => {
    const formData = req.body;

    // Use nodemailer to send an email with the form data
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      },
    });
  
    const mailOptions = {
      from: 'outbysporto@gmail.com',
      to: 'outbysporto@gmail.com',
      subject: 'New Form Submission',
      text: `
        Name: ${formData.name}
        Email: ${formData.email}
        Message: ${formData.message}
        Product: ${formData.product}
        Tours: ${formData.tours ? 'Yes' : 'No'}
      Activities: ${formData.activities ? 'Yes' : 'No'}
      Food: ${formData.food ? 'Yes' : 'No'}
      Other: ${formData.other ? 'Yes' : 'No'}
      `,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Form submitted successfully' });
      }
    });
  };
  
/****Create a form in database ****/
const createForm = async (req, res) => {
    /* try {
        // Check if the user is an admin
       if (req.user.role !== "admin") {
         return res.status(403).json({ error: "Permission denied." });
       } */
       try {
         const { name, email, message } = req.body;
         
         // Create a new post document
         const form = new Forms({
            name,
            email,
            message,
            tours,
            activities,
            food,
            other,
         });
     
         // Save the post to the database
         await form.save();
     
         res.status(201).json(form);
       } catch (error) {
         res.status(500).json({ error: 'An error occurred while creating a form' });
       }
     };


module.exports = {
    sendForm,
createForm,
};