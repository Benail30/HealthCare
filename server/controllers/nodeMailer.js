const nodemailer = require("nodemailer");
// Import NodeMailer (after npm install)

async function main(to, subject, html) {
    // Async function enables allows handling of promises with await

    // First, define send settings by creating a new transporter:
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
        port: 465, // Port for SMTP (usually 465)
        secure: true, // Usually true if connecting to port 465
        auth: {
            user: "r.7xell@gmail.com", // Your email address
            pass: "hxhm cdod meth bgtv", // Password (for gmail, your app password)
            // ⚠️ For better security, use environment variables set on the server for these values when deploying
        },
    });

    // Define and send message inside transporter.sendEmail() and await info about send from promise:
    let info = await transporter.sendMail({
        from: '"HelathCare" <r.7xell@gmail.com>',
        to: to,
        subject: subject,
        html: html,
    });

    console.log(info.messageId); // Random ID generated after successful send (optional)
}



const sendMail = async (req, res) => {
    try {
        const { to, subject, html } = req.body;
        await main(to, subject, html);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Email failed to send" });
    }
};
module.exports = {
    sendMail,
};
// main()
// .catch(err => console.log(err));