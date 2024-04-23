import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "otatime42@gmail.com",
        pass: "pdediroopmxxztsd"
    }
})

const mailOptions = {
    from: 'otatime42@gmail.com', // Sender
    to: 'xavierpuentestar97@gmail.com', // Recipient
    subject: 'Email Subject', // Email subject
    html: 
    `<h1>Hello world?</h1>`,
  };

  // Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending failed:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });