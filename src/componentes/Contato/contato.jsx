"use client";

import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./Contato.module.css";

export default function Contato() {
  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [enviado, setEnviado] = useState(false);
  const [erroCaptcha, setErroCaptcha] = useState(false);
  const recaptchaRef = useRef();

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await recaptchaRef.current.executeAsync();
    console.log("Token reCAPTCHA gerado:", token);

    if (!token) {
      setErroCaptcha(true);
      return;
    }
    setErroCaptcha(false);

    try {
      const res = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formulario.nome,
          email: formulario.email,
          mensagem: formulario.mensagem,
          recaptchaToken: token,
        }),
      });

      console.log("Resposta status:", res.status);
      const textoResposta = await res.text();
      console.log("Resposta body:", textoResposta);

      if (!res.ok) {
        let errorMessage = textoResposta;
        try {
          const errorData = JSON.parse(textoResposta);
          errorMessage = errorData.message || errorMessage;
        } catch {}

        alert("Erro ao enviar mensagem: " + errorMessage);
        return;
      }

      setEnviado(true);
      setFormulario({ nome: "", email: "", mensagem: "" });
      setTimeout(() => setEnviado(false), 5000);
    } catch (err) {
      alert("Erro desconhecido ao enviar mensagem: " + err.message);
    }
  };

  console.log("🔹 sitekey:", process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

  return (
    <section id="contato" className={styles.contato}>
      <h2>Entre em contato</h2>
      <div className={styles.caixa_formulario}>
        <form className={styles.formulario} onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Seu nome"
            value={formulario.nome}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Seu email"
            value={formulario.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="mensagem"
            placeholder="Sua mensagem"
            value={formulario.mensagem}
            onChange={handleChange}
            required
          />
          <div className={styles.recaptchaWrapper}>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              size="invisible"
              ref={recaptchaRef}
            />
          </div>
          {erroCaptcha && (
            <p style={{ color: "red" }}>
              Por favor, confirme que não é um robô.
            </p>
          )}
          <button type="submit">Enviar</button>
          {enviado && (
            <p className={styles.confirmacao}>Mensagem enviada com sucesso!</p>
          )}
          <p
            style={{
              fontSize: "0.75rem",
              color: "#777",
              marginTop: "1.5rem",
              textAlign: "center",
            }}
          >
            Este site é protegido pelo reCAPTCHA e está sujeito à
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#FFD700",
                textDecoration: "none",
                margin: "0 4px",
              }}
            >
              Política de Privacidade
            </a>
            e aos
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#FFD700",
                textDecoration: "none",
                margin: "0 4px",
              }}
            >
              Termos de Serviço
            </a>
            do Google.
          </p>
        </form>
      </div>
    </section>
  );
}
