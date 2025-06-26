import nodemailer from "nodemailer";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Método não permitido",
    };
  }

  const { nome, email, mensagem, token } = JSON.parse(event.body);

  if (!nome || !email || !mensagem || !token) {
    return {
      statusCode: 400,
      body: "Campos obrigatórios ausentes.",
    };
  }

  // Verificar token reCAPTCHA
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
  const recaptchaJson = await recaptchaRes.json();

  if (!recaptchaJson.success) {
    return {
      statusCode: 400,
      body: "Falha na verificação reCAPTCHA.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${nome}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: "Mensagem do seu portfólio",
      text: mensagem,
    });

    return {
      statusCode: 200,
      body: "E-mail enviado com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return {
      statusCode: 500,
      body: "Erro ao enviar e-mail.",
    };
  }
}