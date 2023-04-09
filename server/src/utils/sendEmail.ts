import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const {
  CLIENT_CONSOLE_ID,
  CLIENT_CONSOLE_SECRET,
  CLIENT_CONSOLE_REFRESH,
  SENDER_EMAIL_ADDRESS,
  SENDER_PASSWORD,
  REDIRECT_URI
} = process.env

const sendEmail = (to: string, active_url: string, msg: string) => {
  return new Promise((resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: String(SENDER_EMAIL_ADDRESS),
          pass: String(SENDER_PASSWORD),
        }
      })
  
      const mailOption = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "SHINEE to you",
        html: `
          <div>
            <p>${msg}</p>
            <a href="${active_url}">Verify</a></br>
          </div>
        `
      }
      transporter.sendMail(mailOption, (err: any, inf: any) => {
        if (err) { 
          reject(err); 
        }
        if (inf) { resolve(inf) }
      })
    } catch(e: any) {
      reject(e)
    } 
  })
}

export default sendEmail