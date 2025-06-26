import nodemailer from "nodemailer";

export async function POST(req) {
  const { nome, email, mensagem, token } = await req.json();

  if (!nome || !email || !mensagem || !token) {
    return new Response("Campos obrigatórios ausentes.", { status: 400 });
  }

  // Validação do reCAPTCHA
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
  const recaptchaJson = await recaptchaRes.json();

  if (!recaptchaJson.success) {
    console.error("Falha reCAPTCHA:", recaptchaJson);
    return new Response("Falha na verificação reCAPTCHA.", { status: 400 });
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

    return new Response("E-mail enviado com sucesso!", { status: 200 });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return new Response("Erro ao enviar e-mail.", { status: 500 });
  }
}