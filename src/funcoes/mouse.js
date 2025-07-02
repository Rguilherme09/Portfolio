"use client";
import { useEffect, useState, useRef, useState as useIsMountedState } from "react";
import "./mouse.css";

export default function LightFollowTrailPath({ tema }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false); // 👈 controle por dispositivo
  const maxTrail = 2;
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Detecta se é desktop (ponteiro fino)
    const desktop = window.matchMedia("(pointer: fine)").matches;
    setIsDesktop(desktop);

    if (!desktop) return; // 👈 se não for desktop, não ativa o efeito

    const handleMove = (e) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setPos(newPos);

      clearTimeout(timeoutRef.current);

      setTrail((prev) => {
        const updated = [...prev, newPos];
        return updated.length > maxTrail ? updated.slice(-maxTrail) : updated;
      });

      timeoutRef.current = setTimeout(() => {
        setTrail([]);
      }, 100);
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isDesktop) return null; // 👈 não renderiza nada no mobile

  const pathD = trail.length
    ? trail.reduce(
        (acc, point, i) =>
          i === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`,
        ""
      )
    : "";

  return (
    <>
      <svg className="line-svg">
        {trail.length > 1 && (
          <path
            d={pathD}
            stroke={tema === "light" ? "#000" : "#FFD700"}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ mixBlendMode: "screen" }}
          />
        )}
      </svg>

      <div
        className="light-follower"
        style={{
          left: pos.x,
          top: pos.y,
          background: tema === "light" ? "#000" : "#FFD700",
          borderColor: tema === "light" ? "#000" : "#FFD700",
          boxShadow:
            tema === "light"
              ? "0 0 8px 2px rgba(0, 0, 0, 0.5)"
              : "0 0 8px 2px #FFD700",
          mixBlendMode: tema === "light" ? "normal" : "screen",
        }}
      />
    </>
  );
}