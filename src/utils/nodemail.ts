import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendNewsletter = (email: any, subject: any, content: any) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: content,
    };

    transporter.sendMail(mailOptions, (error: any, info: { response: string; }) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Newsletter sent: ' + info.response);
        }
    });
};

export default sendNewsletter;