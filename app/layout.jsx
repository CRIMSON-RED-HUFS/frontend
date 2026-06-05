import localFont from "next/font/local";
import "./globals.css";

const docallismeOnStreet = localFont({
  src: "./fonts/DOCALLISME ON STREET.ttf",
  variable: "--font-docallisme",
  display: "swap",
});

export const metadata = {
  title: "CRIMSON RED",
  description: "HUFS rock band club introduction page.",
  manifest: "/manifest.json",
  appleWebApp: {
    title: "CRIMSON RED",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c0b0b",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={docallismeOnStreet.variable}>
      <body>{children}</body>
    </html>
  );
}
