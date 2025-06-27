const nodemailer = require("nodemailer");
const fetch = require("node-fetch"); // necessário para reCAPTCHA

EMAIL_USER: undefined;
EMAIL_PASS: undefined;
RECAPTCHA_SECRET_KEY: undefined;

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    const { nome, email, mensagem, recaptchaToken } = data;

    // Validação do reCAPTCHA
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secret}&response=${recaptchaToken}`,
      }
    );

    const recaptchaJson = await recaptchaRes.json();

    if (!recaptchaJson.success) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Falha na verificação do reCAPTCHA." }),
      };
    }

    // Configurar o transporte SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${nome}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: "Mensagem do Portfólio",
      text: mensagem,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email enviado com sucesso!" }),
    };
  } catch (error) {
    console.error("Erro na função sendEmail:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json", // <- ESSENCIAL
      },
      body: JSON.stringify({
        message: "Erro ao enviar email",
        error: error.message,
      }),
    };
  }
};
