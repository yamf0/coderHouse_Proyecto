import { createTransport } from "nodemailer"

const testEmail = "marjorie.rowe84@ethereal.email"

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'marjorie.rowe84@ethereal.email',
        pass: 'ybCVj8KAqR7HtDsmSH'
    }
});

export {transporter, testEmail}