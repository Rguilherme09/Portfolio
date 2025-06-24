'use client';

import styles from './Habilidades.module.css';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiNextdotjs } from 'react-icons/si';

export default function Habilidades() {
  const habilidades = [
    { nome: 'HTML5', icon: <FaHtml5 />, link: 'https://www.devmedia.com.br/certificado/tecnologia/html/rodrigo-guilherme-barreto' },
    { nome: 'CSS3', icon: <FaCss3Alt />, link: 'https://www.devmedia.com.br/certificado/tecnologia/css/rodrigo-guilherme-barreto' },
    { nome: 'JavaScript', icon: <FaJsSquare />, link: 'https://www.devmedia.com.br/certificado/tecnologia/javascript/rodrigo-guilherme-barreto' },
    { nome: 'React', icon: <FaReact />, link: 'https://www.devmedia.com.br/certificado/tecnologia/react/rodrigo-guilherme-barreto' },
    { nome: 'Next.js', icon: <SiNextdotjs />, link: 'https://exemplo.com/certificados/next' },
    { nome: 'Node.js', icon: <FaNodeJs />, link: 'https://www.devmedia.com.br/certificado/tecnologia/node-js/rodrigo-guilherme-barreto' },
    { nome: 'Git', icon: <FaGitAlt />, link: 'https://www.devmedia.com.br/certificado/tecnologia/git/rodrigo-guilherme-barreto' },
    { nome: 'GitHub', icon: <FaGithub />, link: 'https://exemplo.com/certificados/github' },
  ];

  return (
    <section className={styles.habilidades} id="habilidades">
      <h2>Habilidades</h2>
      <div className={styles.grid}>
        {habilidades.map((hab, index) => (
          <a
            key={index}
            href={hab.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.icon}>{hab.icon}</div>
            <p>{hab.nome}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
