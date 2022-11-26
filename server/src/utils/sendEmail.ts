import nodemailer from 'nodemailer'
import {google} from 'googleapis'
import dotenv from 'dotenv'

dotenv.config()

const {
  CLIENT_CONSOLE_ID,
  CLIENT_CONSOLE_SECRET,
  CLIENT_CONSOLE_REFRESH,
  SENDER_EMAIL_ADDRESS,
  REDIRECT_URI
} = process.env

const oauth2Client = new google.auth.OAuth2(
  CLIENT_CONSOLE_ID,
  CLIENT_CONSOLE_SECRET,
  REDIRECT_URI
)

const sendEmail = (to: string, active_url: string, msg: string) => {
  oauth2Client.setCredentials({
    refresh_token: CLIENT_CONSOLE_REFRESH
  })

  const authAccessToken = oauth2Client.getAccessToken()
  const stmpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: String(SENDER_EMAIL_ADDRESS),
      clientId: String(CLIENT_CONSOLE_ID),
      clientSecret: String(CLIENT_CONSOLE_SECRET),
      refreshToken: String(CLIENT_CONSOLE_REFRESH),
      accessToken: String(authAccessToken),
    }
  })

  const mailOption = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: "KHOITT to you",
    html: `
      <div>
        <p>${msg}</p>
        <a href="${active_url}">Verify</a></br>
      </div>
    `
  }
  stmpTransport.sendMail(mailOption, (err, infor) => {
    if (err)  console.log(err)
    else console.log(infor)
  })
}

export default sendEmail