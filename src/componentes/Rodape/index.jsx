import styles from './Rodape.module.css';
import { FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Rodape() {
  return (
    <footer id="contato" className={styles.rodape}>
      <div className={styles.conteudo}>
        <p className={styles.credito}>Desenvolvido por Rodrigo Guilherme - 2025</p>
        <div className={styles.icones}>
          <a href="https://wa.me/5585992740093?text=Ol%C3%A1%20Rodrigo%2C%20vi%20seu%20portfólio%20e%20gostaria%20de%20saber%20mais!" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </a>
          <a href="https://www.linkedin.com/in/rodrigoguilherme96/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/rguilherme09" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}