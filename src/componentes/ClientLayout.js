// src/componentes/ClientLayout.js
"use client";

import { useState, useEffect } from "react";
import Topo from "@/componentes/Topo";
import Rodape from "@/componentes/Rodape";
import LightFollowTrailPath from "@/funcoes/mouse";

export default function ClientLayout({ children }) {
  const [tema, setTema] = useState("dark");

  useEffect(() => {
    document.body.classList.toggle("light", tema === "light");
  }, [tema]);

  function alternarTema() {
    setTema((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <>
      <LightFollowTrailPath tema={tema} />
      <Topo alternarTema={alternarTema} tema={tema} />
      {children}
      <Rodape />
    </>
  );
}