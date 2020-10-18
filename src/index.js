const nodemailer = require('nodemailer')
const { generate } = require('./generate')

require('dotenv').config()

const TEST_MESSAGE = `
  <h1>TEST PURPOSE ONLY</h1>
  <p>That's only a test message, please wait to a one without this message before buying a gift!</p>
-------------- <br /><br /><br />
`

const CONFIG = {
  showTestMessage: !!process.env.TEST_MAILS,
  sendMails: !process.env.DEBUG,
}

async function main() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  })

  // generate pairs
  const generated = generate()

  if (!CONFIG.sendMails || CONFIG.showTestMessage) {
    // Log output only when sending is disabled or when send is test message
    console.log(
      generated.map(
        (el) =>
          `Gift from ${el.from.name} to ${el.to.name} [${el.category} || ${el.alternativeCategory}]`
      )
    )
  }

  // Prevent sending emails
  if (!CONFIG.sendMails) return

  generated.forEach(async ({ from, to, category, alternativeCategory }) => {
    const info = await transporter.sendMail({
      from: `"Secret Santa" <${process.env.MAIL_USERNAME}>`,
      to: `"${from.name}" <${from.mail}>`,
      subject: "You're gonna become a Secret Santa for...",
      text: `
        ${CONFIG.showTestMessage ? TEST_MESSAGE : ''}
        Hi ${from.name}!
        You have been selected to create a gift for ${to.name}!
        Category of your gift will be ${category} or ${alternativeCategory}
      `,
      html: `
        ${CONFIG.showTestMessage ? TEST_MESSAGE : ''}
        <b>Hi ${from.name}!</b>
        <p>
          You have been selected to create a gift for <b>${to.name}</b>!
        </p>
        <p>
          Category of your gift will be <b>${category}</b> or <b>${alternativeCategory}</b>
        </p><br />
        <p>
          <i>PS: That's a secret! Do not tell anyone you creating a gift for</i>
        </p>
        <b>~Santa</b>
      `,
    })

    console.log(`[${info.messageId}] Message sent to: "${from.name}" <${from.mail}>`)
  })
}

main().catch(console.error)
