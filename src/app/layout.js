// src/app/layout.js
"use client";
import { useState, useEffect } from "react";
import Topo from "@/componentes/Topo";
import Rodape from "@/componentes/Rodape";
import LightFollowTrailPath from "@/funcoes/mouse";
import "./globals.css";


export default function RootLayout({ children }) {
  const [tema, setTema] = useState("dark");

  useEffect(() => {
    document.body.classList.toggle("light", tema === "light");
  }, [tema]);

  function alternarTema() {
    setTema((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <html lang="pt-br">
      <body>
        <LightFollowTrailPath tema={tema} />
        <Topo alternarTema={alternarTema} tema={tema} />
        {children}
        <Rodape />
      </body>
    </html>
  );
}
