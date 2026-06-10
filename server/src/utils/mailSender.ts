import { resend } from "../config/resend.js";
import ApiError from "./apiError.js";

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const response = await resend.emails.send({
      from: "AgentSupport <no-reply@agentsupport.me>",
      to,
      subject,
      html,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response;
  } catch (error) {
    console.error("Email sending failed:", error);

    throw new ApiError(500, "Failed to send email. Please try again later.");
  }
};
