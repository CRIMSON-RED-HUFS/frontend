import localFont from "next/font/local";
import { AudioProvider } from "../components/audio/AudioProvider";
import "./globals.css";
import "./subpage.css";

const docallismeOnStreet = localFont({
  src: "./fonts/DOCALLISME ON STREET.ttf",
  variable: "--font-docallisme",
  display: "swap",
});

export const metadata = {
  title: "CRIMSON RED",
  description: "HUFS rock band club introduction page.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "CRIMSON RED",
    description: "HUFS rock band club introduction page.",
    type: "website",
    siteName: "CRIMSON RED",
  },
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
      <body>
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
