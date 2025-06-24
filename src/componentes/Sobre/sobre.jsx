'use client';

import { motion } from 'framer-motion';
import styles from './Sobre.module.css';

export default function Sobre() {
  return (
    <section id="sobre" className={styles.sobre}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className={styles.imagem}>
          <img src="/Rodrigo.jpg" alt="Rodrigo Guilherme" />
        </div>
        <div className={styles.texto}>
          <h2>Sobre Mim</h2>
          <p>
            Sou Rodrigo Guilherme, formado em análise e desenvolvimento de sistemas e desenvolvedor front-end, apaixonado por criar interfaces modernas, responsivas e bem cuidadas — tanto no visual quanto na experiência do usuário.
          </p>
          <p>
            Minha trajetória começou com projetos pessoais e muita prática, e desde então venho evoluindo com foco em HTML, CSS, JavaScript, React, Node.js e Next.js. Também utilizo Git e GitHub para versionamento e colaboração, garantindo organização e eficiência no desenvolvimento.
          </p>
          <p>
            Tenho um olhar atento aos detalhes, busco sempre aprender novas tecnologias e gosto de resolver problemas com código limpo e bem estruturado.
          </p>
        </div>
      </motion.div>
    </section>
  );
}