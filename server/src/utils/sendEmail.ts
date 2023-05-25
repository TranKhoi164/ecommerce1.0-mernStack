import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const {
  SENDER_EMAIL_ADDRESS,
  SENDER_PASSWORD,
} = process.env

const sendEmail = (to: string, active_url: string, msg: string) => {
  return new Promise((resolve, reject) => {
    try {
      console.log('sender: ', SENDER_EMAIL_ADDRESS);
      console.log('pass: ', SENDER_PASSWORD);
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: true,
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