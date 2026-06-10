export const operatorInviteTemplate = (inviteLink: string) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background:#ffffff;
              border:1px solid #e5e7eb;
              border-radius:12px;
              overflow:hidden;
            "
          >
            <tr>
              <td
                style="
                  padding:32px;
                  text-align:center;
                  border-bottom:1px solid #f1f5f9;
                "
              >
                <h1
                  style="
                    margin:0;
                    color:#111827;
                    font-size:28px;
                    font-weight:700;
                  "
                >
                  AgentSupport
                </h1>

                <p
                  style="
                    margin-top:8px;
                    color:#6b7280;
                    font-size:14px;
                  "
                >
                  Customer Support Management Platform
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:40px 32px;">
                <h2
                  style="
                    margin:0 0 16px;
                    color:#111827;
                    font-size:24px;
                  "
                >
                  You're Invited
                </h2>

                <p
                  style="
                    margin:0 0 24px;
                    color:#4b5563;
                    font-size:16px;
                    line-height:1.6;
                  "
                >
                  You have been invited to join AgentSupport as an operator.
                  Click the button below to accept your invitation and create
                  your account.
                </p>

                <div style="text-align:center;margin:32px 0;">
                  <a
                    href="${inviteLink}"
                    style="
                      display:inline-block;
                      background:#111827;
                      color:#ffffff;
                      text-decoration:none;
                      padding:14px 28px;
                      border-radius:8px;
                      font-size:16px;
                      font-weight:600;
                    "
                  >
                    Accept Invitation
                  </a>
                </div>

                <p
                  style="
                    margin:24px 0 0;
                    color:#6b7280;
                    font-size:14px;
                    line-height:1.6;
                  "
                >
                  If the button doesn't work, copy and paste the following link
                  into your browser:
                </p>

                <p
                  style="
                    margin-top:12px;
                    word-break:break-all;
                    color:#2563eb;
                    font-size:14px;
                  "
                >
                  ${inviteLink}
                </p>
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding:24px 32px;
                  background:#f9fafb;
                  border-top:1px solid #e5e7eb;
                  text-align:center;
                "
              >
                <p
                  style="
                    margin:0;
                    color:#6b7280;
                    font-size:13px;
                  "
                >
                  This invitation link may expire for security reasons.
                </p>

                <p
                  style="
                    margin-top:8px;
                    color:#9ca3af;
                    font-size:12px;
                  "
                >
                  © ${new Date().getFullYear()} AgentSupport. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
