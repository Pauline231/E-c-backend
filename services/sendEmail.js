const nodemailer  = require("nodemailer");

const sendEmail = async (options) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth : {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,    
        },
    });

    const mailOptions ={
        from : 'Pauline <paulwreck01lucky@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.text
    };
    
    await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;