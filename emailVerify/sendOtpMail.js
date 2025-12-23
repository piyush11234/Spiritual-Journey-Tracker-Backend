import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOtpMail = async (email, otp) => {
    try {
        await sgMail.send({
            to: email,
            from: process.env.EMAIL_FROM,
            subject: "Password Reset OTP",
            html: `
                <p>Your OTP for password reset is:</p>
                <h2>${otp}</h2>
                <p>This OTP is valid for <b>10 minutes</b>.</p>
            `,
        });

        console.log("✅ OTP email sent successfully");
    } catch (error) {
        console.error("❌ OTP email failed:", error.response?.body || error);
        throw new Error("Failed to send OTP email");
    }
};
