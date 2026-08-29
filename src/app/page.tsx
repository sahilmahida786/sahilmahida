import Hero from "@/components/sections/Hero";
import EngineeringSignal from "@/components/sections/EngineeringSignal";
import Projects from "@/components/sections/Projects";
import TechCore from "@/components/sections/TechCore";
import EngineeringLab from "@/components/sections/EngineeringLab";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import Divider from "@/components/ui/Divider";

/**
 * Homepage — assembles all sections in the approved UX flow:
 * Hero → Signal → Projects → Tech Core → Engineering Lab → Services → Contact
 */
export default function Home() {
  return (
    <>
      <Hero />
      <EngineeringSignal />
      <Divider variant="glow" />
      <Projects />
      <Divider variant="glow" />
      <TechCore />
      <Divider variant="glow" />
      <EngineeringLab />
      <Divider variant="glow" />
      <Services />
      <Divider variant="glow" />
      <Contact />
    </>
  );
}
