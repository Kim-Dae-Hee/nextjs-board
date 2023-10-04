import "./globals.css";
import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";
import Navbar from "./components/Navbar";
import OAuthContext from "./context/OAuthContex";
import SWRConfigContext from "./context/SWRConfigContext";
import Footer from "./components/Footer";

const nanumGothic = Nanum_Gothic({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Board",
    template: "Board | %s",
  },
  description: "My Board ~",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={nanumGothic.className}>
      <body className="flex flex-col w-full border-4 bg-neutral-100 max-w-screen-2xl m-auto">
        <OAuthContext>
          <header className="border-b-4">
            <Navbar />
          </header>
          <SWRConfigContext>
            <main className="overflow-y-auto grow h-full">{children}</main>
            <footer className="border-t-4">
              <Footer />
            </footer>
          </SWRConfigContext>
          <div id="portal" />
        </OAuthContext>
      </body>
    </html>
  );
}
