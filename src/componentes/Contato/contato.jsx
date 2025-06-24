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

    const token = recaptchaRef.current.getValue();
    if (!token) {
      setErroCaptcha(true);
      return;
    }
    setErroCaptcha(false);

    const res = await fetch("/api/contato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formulario, token }),
    });

    if (res.ok) {
      setEnviado(true);
      setFormulario({ nome: "", email: "", mensagem: "" });
      recaptchaRef.current.reset();
      setTimeout(() => setEnviado(false), 5000);
    } else {
      alert("Erro ao enviar mensagem.");
    }
  };

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
            <ReCAPTCHA
              sitekey="6LcKHGwrAAAAAK-anuRVv82AkQhatkcITfqxuPrf"
              ref={recaptchaRef}
            />
            {erroCaptcha && (
              <p style={{ color: "red" }}>Por favor, confirme que não é um robô.</p>
            )}
            <button type="submit">Enviar</button>
            {enviado && (
              <p className={styles.confirmacao}>Mensagem enviada com sucesso!</p>
            )}
          </form>
      </div>
    </section>
  );
}