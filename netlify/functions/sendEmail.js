require('dotenv').config();

const nodemailer = require("nodemailer");
const fetch = require("node-fetch");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);
    const { nome, email, mensagem, recaptchaToken } = data;

    // Verifica se os dados obrigatórios existem
    if (!nome || !email || !mensagem || !recaptchaToken) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Dados incompletos enviados." }),
      };
    }

    // Validação do reCAPTCHA
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) throw new Error("RECAPTCHA_SECRET_KEY não está definida!");

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

    // Configuração do transporter nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Opções do email, incluindo nome e email no corpo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Mensagem do Portfólio - ${nome}`,
      text: `
Nome: ${nome}
Email: ${email}

Mensagem:
${mensagem}
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email enviado com sucesso!" }),
    };
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Erro ao enviar email",
        error: error.message || error.toString(),
      }),
    };
  }
};