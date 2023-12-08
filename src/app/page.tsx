import Menu from "@/components/menu";
import Footer from "@/components/footer";
import AboutPage from "./about"


export default function Home() : JSX.Element {
  return (
    <>
      <Menu />
      <AboutPage />
      <Footer />
    </>
  );
}
