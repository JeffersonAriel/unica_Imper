import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

const arquivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Única | Impermeabilização e Pisos Especiais",
  description: "A Única resolve problemas de infiltração e pisos com tecnologia de ponta e acabamento premium para ambientes exigentes. Especialistas em impermeabilização definitiva.",
  keywords: ["impermeabilização", "pisos especiais", "poliuretano", "piso industrial", "revitalização de pisos", "São Paulo", "construção civil"],
  authors: [{ name: "Única Impermeabilização" }],
  creator: "Única Impermeabilização",
  metadataBase: new URL("https://unicaimper.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://unicaimper.com.br",
    siteName: "Única Impermeabilização e Pisos Especiais",
    title: "Única | Impermeabilização e Pisos Especiais de Alto Padrão",
    description: "Soluções definitivas em impermeabilização e pisos industriais para residências e empresas exigentes.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Única Impermeabilização",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Única | Impermeabilização e Pisos Especiais",
    description: "Tecnologia de ponta e acabamento premium para ambientes exigentes.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${arquivo.variable} ${inter.variable} antialiased selection:bg-red selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
