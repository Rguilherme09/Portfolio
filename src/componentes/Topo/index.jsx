'use client';

import { useEffect, useRef, useState } from 'react';
import estilos from './Topo.module.css';
import Link from 'next/link';
import { IoMenuOutline } from 'react-icons/io5';
import { MdOutlineClose } from "react-icons/md";

export default function Topo({ alternarTema, tema }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef();

  const alternarMenu = () => setMenuAberto(!menuAberto);

  // Fecha menu ao clicar fora
  useEffect(() => {
    const handleClickFora = (e) => {
      if (menuAberto && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAberto(false);
      }
    };
    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, [menuAberto]);

  return (
    <header className={estilos.topo}>
      <div className={estilos.container}>
        <button className={estilos.menu_hamburguer} onClick={alternarMenu} aria-label="Abrir menu">
          {menuAberto ? <MdOutlineClose /> : <IoMenuOutline />}
        </button>

        <div className={estilos.logo_container}>
          <Link href="/" className={estilos.logo_container}>
            <img className={estilos.img_logo} src="/logo-dourada.png" alt="Logo RodrigoDev" />
          </Link>
        </div>

        <nav className={estilos.menu}>
          <ul>
            <li><Link href="#sobre">Sobre</Link></li>
            <li><Link href="#projetos">Projetos</Link></li>
            <li><Link href="#habilidades">Tecnologias</Link></li>
            <li><Link href="#contato">Contato</Link></li>
          </ul>
        </nav>

        <button
          onClick={alternarTema}
          className={estilos.botao_tema}
          aria-label="Alternar tema"
        >
          {tema === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Menu lateral sempre no DOM, com classe para animar */}
      <nav
        ref={menuRef}
        className={`${estilos.menu_mobile} ${menuAberto ? estilos.aberto : ''}`}
      >
        <ul>
          <li><Link href="#sobre" onClick={alternarMenu}>Sobre</Link></li>
          <li><Link href="#projetos" onClick={alternarMenu}>Projetos</Link></li>
          <li><Link href="#habilidades" onClick={alternarMenu}>Tecnologias</Link></li>
          <li><Link href="#contato" onClick={alternarMenu}>Contato</Link></li>
        </ul>
      </nav>
    </header>
  );
}
