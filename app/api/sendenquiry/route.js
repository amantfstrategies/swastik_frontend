import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,  
        pass: process.env.EMAIL_PASSWORD,
    },
});

// mail to my self
async function main(name, email, message, phone, city) {
    const info = await transporter.sendMail({
        from: `Swastik Tiles <amanshaikh8624@gmail.com>`, 
        to: `${email}`, 
        subject: `Thank you for contacting me, ${name}`, 
        html: `<p style="font-family:Arial, sans-serif;font-size:16px;">Thank you for reaching out to me. Mr ${name} <br><br> I have received your message and will get back to you soon.<br><br>Have a great day!<br><br>Best Regards,<br>Pramod</p>, 
    `});

    const info2 = await transporter.sendMail({
        from: `${name} <${email}>`,
        to:`amanshaikh8624@gmail`, 
        subject:` You have received a message from your website`, 
        html: `<p style="font-family:Arial, sans-serif;font-size:16px;">You have received a message from <b>${name}, from <b>${city}</b> with email <a style="color:#337ab7;" href="mailto:${email}">${email}</a> and phone number <b>${phone}</b> 
         and the message:<br><i style="font-style:italic;color:#337ab7;">${message}</i></p>, 
`
    });

}



export const POST = async (req) => {
    const { name, email, message, mobile, city } = await req.json()
    // console.log("backend",name, email, message, mobile);
    try {
        // console.log("env",process.env.EMAIL_ADDRESS, process.env.EMAIL_PASSWORD);
        await main(name, email, message, mobile, city);
        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), { status: 500 })
    }
}