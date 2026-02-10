import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SplashCursor from "@/components/SplashCursor"; // Pastikan alias @ mengarah ke folder yang benar

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SplashCursor /> 
        <Navbar />
        {children}
      </body>
    </html>
  );
}
