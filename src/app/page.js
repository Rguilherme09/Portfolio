import styles from "./page.module.css";
import CarrosselProjetos from "@/componentes/Carrossel/CarrosselProjetos.jsx";
import Sobre from "@/componentes/Sobre/sobre.jsx";
import Habilidades from '@/componentes/Habilidades/habilidades.jsx';
import Contato from '@/componentes/Contato/contato.jsx';


export const metadata = {
  title: "RodrigoDev",
  description: "Portfólio de RodrigoDev - Desenvolvedor Web",
};

export default function Home() {
  return (

    
      <main className={styles.main}>
          <section className={styles.primeira_secao}>
            <h1>Rodrigo<br/>Guilherme</h1>
            <p className={styles.slogan}>Desenvolvedor Front-End | Next.js | React.js | Node.js</p>
          </section>
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
          <section id ="contato" className={styles.quinta_secao}>
            <Contato />
          </section>
      </main>
  );
}