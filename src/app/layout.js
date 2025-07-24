// src/app/layout.js
import "./globals.css";
import ClientLayout from "@/componentes/ClientLayout";

export const metadata = {
  title: "Portfólio | Rodrigo Guilherme",
  description: "Desenvolvedor Front-End com foco em React e Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}