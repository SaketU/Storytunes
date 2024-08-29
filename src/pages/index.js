import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/Components/Header";
import Body from "@/Components/Body"; // Ensure this path matches your file structure
import greenbackground from "../images/greenbackground.jpg"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div className="main-background">
        <Header />
        <Body />
      </div>
    </main>
  );
}
