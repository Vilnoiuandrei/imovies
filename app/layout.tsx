import Navigation from "./_components/Navigation";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], display: "swap" });
import "@/app/_styles/globals.css";

export const metadata = {
  title: "IMovies",
  description: "Explore movies and TV shows that you love or you might like",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}  min-h-screen `}>
        <Navigation />
        <main> {children}</main>
      </body>
    </html>
  );
}
