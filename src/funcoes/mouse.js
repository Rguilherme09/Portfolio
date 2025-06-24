"use client";
import { useEffect, useState, useRef } from "react";
import "./mouse.css";

export default function LightFollowTrailPath({ tema }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const maxTrail = 2;
  const timeoutRef = useRef(null);

  useEffect(() => {
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
