const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3000;

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});


// Handle form submission
app.post('/', (req, res) => {
  console.log(req.body);

  // Create a transporter using your email provider's SMTP settings
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    Port: 465 ,
    auth: {
      user: 'moallahydihalimaxxx13@gmail.com',
      pass: 'tmuvklfmcyqoxafy'
    }
  });

  // Configure email options
  const mailOptions = {
    from: req.body.email,
    to: 'moallahydihalimaxxx13@gmail.com',
    subject: 'New Contact Form Submission',
    text: `
      Name: ${req.body.name}
      Phone: ${req.body.phone}
      Email: ${req.body.email}

      Message:
      ${req.body.message}
    `
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while sending the email.' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully.' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
