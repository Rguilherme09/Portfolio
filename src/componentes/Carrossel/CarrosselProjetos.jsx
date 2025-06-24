// componentes/CarrosselProjetos.jsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './CarrosselProjetos.module.css';

const projetos = [
  {
    titulo: 'Barbearia Jangadeiro',
    imagem: '/screenshot-barbearia.png',
    link: 'https://rguilherme09.github.io/Barbearia-Jangadeiro/',
  },
  {
    titulo: 'Pousada Secreta',
    imagem: '/screenshot-pousada.png',
    link: 'https://rguilherme09.github.io/Pousada-Secreta/',
  },
  {
    titulo: 'Consultório CM Life',
    imagem: '/screenshot-cm-life.png',
    link: 'https://etapa-1-rguilherme09s-projects.vercel.app/',
  },
  {
    titulo: 'Projeto Netflix',
    imagem: '/screenshot-netflix.png',
    link: 'https://rguilherme09.github.io/projeto-netflix/',
  },
  {
    titulo: 'Galeteria Artesanal',
    imagem: '/screenshot-sorveteria.png',
    link: 'https://projeto-sorveteria-opal.vercel.app/',
  },
  {
    titulo: 'Cardápio Digital',
    imagem: '/screenshot-cardapio.png',
    link: 'https://projeto-cardapio-restaurante-eight.vercel.app/',
  },
  {
    titulo: 'Agência de Branding',
    imagem: '/screenshot-branding.png',
    link: 'https://projeto-site-branding.vercel.app/',
  },
  {
    titulo: 'Consultório de Odontologia',
    imagem: '/screenshot-dentista.png',
    link: 'https://projeto-dentista-xi.vercel.app/',
  },
  {
    titulo: 'LinkBio NeymarJr',
    imagem: '/screenshot-neymar.png',
    link: 'https://rguilherme09.github.io/Landing-page-Neymar/',
  },
];

export default function CarrosselProjetos() {
  return (
    <section className={styles.carrossel}>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        breakpoints={{
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  }}
>
        {projetos.map((proj, index) => (
          <SwiperSlide key={index}>
            <a href={proj.link} target="_blank" rel="noopener noreferrer">
              <img src={proj.imagem} alt={proj.titulo} className={styles.imagem} />
              <p className={styles.titulo}>{proj.titulo}</p>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
