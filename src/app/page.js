"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import CarrosselProjetos from "@/componentes/Carrossel/CarrosselProjetos.jsx";
import Sobre from "@/componentes/Sobre/sobre.jsx";
import Habilidades from "@/componentes/Habilidades/habilidades.jsx";
import Contato from "@/componentes/Contato/contato.jsx";

export default function Home() {
  const [mostrarSecoes, setMostrarSecoes] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setMostrarSecoes(false);

      const timeout = setTimeout(() => setMostrarSecoes(true), 6000);

      const onScroll = () => setMostrarSecoes(true);

      window.addEventListener("scroll", onScroll);

      return () => {
        clearTimeout(timeout);
        window.removeEventListener("scroll", onScroll);
      };
    }
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.primeira_secao}>
        <h1>
          Rodrigo
          <br />
          Guilherme
        </h1>
        <p className={styles.slogan}>
          Desenvolvedor Front-End | Next.js | React.js | Node.js
        </p>
      </section>

      {mostrarSecoes && (
        <>
          <section id="sobre" className={styles.segunda_secao}>
            <Sobre />
          </section>
          <section id="projetos" className={styles.terceira_secao}>
            <h1>Projetos</h1>
            <CarrosselProjetos />
          </section>
          <section id="habilidades" className={styles.quarta_secao}>
            <Habilidades />
          </section>
          <section id="contato" className={styles.quinta_secao}>
            <Contato />
          </section>
        </>
      )}
    </main>
  );
}