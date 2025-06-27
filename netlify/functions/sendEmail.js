require("dotenv").config();

console.log("🟡 EMAIL_USER:", process.env.EMAIL_USER);
console.log("🟡 EMAIL_PASS:", process.env.EMAIL_PASS);
console.log("🟡 RECAPTCHA_SECRET_KEY:", process.env.RECAPTCHA_SECRET_KEY);

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

    console.log("🔹 Dados recebidos:", data);

    // Verificação de variáveis de ambiente
    console.log("🔹 Variáveis:");
    console.log("  EMAIL_USER:", process.env.EMAIL_USER);
    console.log("  EMAIL_PASS:", process.env.EMAIL_PASS);
    console.log("  RECAPTCHA_SECRET_KEY:", process.env.RECAPTCHA_SECRET_KEY);

    // Validação do reCAPTCHA
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) throw new Error("RECAPTCHA_SECRET_KEY não está definida!");

    console.log("🔹 Fazendo verificação reCAPTCHA...");
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secret}&response=${recaptchaToken}`,
      }
    );

    const recaptchaJson = await recaptchaRes.json();
    console.log("🔹 Resultado reCAPTCHA:", recaptchaJson);

    if (!recaptchaJson.success) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Falha na verificação do reCAPTCHA." }),
      };
    }

    console.log("🔹 Preparando envio de email...");

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

    console.log("🔹 Enviando email...");

    await transporter.sendMail(mailOptions);

    console.log("✅ Email enviado com sucesso!");

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
        stack: error.stack, // 👈 adiciona a stack trace
      }),
    };
  }
};
