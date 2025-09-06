const nodemailer = require("nodemailer");
const Message = require("../model/contact");

exports.sendContactMail = async (req, res) => {
    try{
        const {name, email,message } = req.body;

        if(!name || !email || !message){
            return res.status(400).json({error:"All fields are required"});
    }

    const newMessage = await Message.create({name,email,message});

   const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,          
  secure: false,     
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});
    await transporter.sendMail({
        from:email,
        to:process.env.EMAIL_USER,
        subject:`New contact form submission from ${name}`,
        text:`
        Name: ${name}
        Email: ${email}
        Message: ${message}
        `,
    });
      res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({
      success: false,
      error: "Failed to send message",
    });
  }
}

exports.getMessages = async(req,res) => {
    try{
        const messages = await Message.find().sort({createdAt:-1});
        res.status(200).json({messages});
    }catch(err){
        console.error("Error fetching messages:", err);
        res.status(500).json({error:"Failed to fetch messages"});
    }
}
