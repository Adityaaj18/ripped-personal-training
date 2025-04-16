import nodemailer from "nodemailer";
import User from "../model/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpire: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7ba4979e98eb77",
        pass: "863f13f6281f06",
      },
    });

    const mailOptions = {
      from: "jadhavaditya033@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?${hashedToken}">Here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy paste link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken} </p>`,
    };
    
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message || "An unknown error occurred");
  }
};
