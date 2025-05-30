

import { useState, useEffect, useRef } from "react";
import { Stars } from "./components/Stars";
import { Rocket } from "./components/Rocket";
import { AnimatedSection } from "./components/AnimatedSection";
import { BottomNav } from "./components/BottomNav";
import { Modal } from "./components/Modal";
import { Planet } from "./components/Planet";
import { Hero } from "./components/Hero";
import { SatellitePlayground } from "./components/SatellitePlayground";
import "./index.css";
import { Careers } from "./components/Carrers";

type View = "main" | "satellite";

function App() {
  const [view, setView] = useState<View>("main");

  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDir, setScrollDir] = useState<"down" | "up">("down");
  const lastY = useRef(0);
  useEffect(() => {
    const setVh = () => {
     
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const docH = document.body.scrollHeight - window.innerHeight;
      const prog = docH > 0 ? Math.min(y / docH, 1) : 0;
      setScrollProgress(prog);
      setScrollDir(y > lastY.current ? "down" : "up");
      lastY.current = y;
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const starsOpacity = Math.max(0, (scrollProgress - 0.6) / 0.4);

  const [modal, setModal] = useState<"careers" | "contact" | null>(null);

  return (
    <div className="App">
      {view === "main" && (
        <>
          <BottomNav onOpenModal={setModal} onViewChange={setView} />

          <Modal
            isOpen={modal === "careers"}
            onClose={() => setModal(null)}
            title="Careers"
          >
            <Careers />
          </Modal>
          <Modal
            isOpen={modal === "contact"}
            onClose={() => setModal(null)}
            title="Contact Us"
          >
            <p>Email: info@vinterstellar.se</p>
          </Modal>
        </>
      )}

      {view === "main" ? (
        <>
          <Hero />
          <Stars opacity={starsOpacity} />
          <Planet />
          <Rocket progress={scrollProgress} direction={scrollDir} />

          <AnimatedSection id="about">
            <h2>Space Systems Support</h2>

            <p>
              Vinterstellar is a limited liability company established in 2018
              that supports space actors with advice, teaching and engineering.
            </p>
            <p>
              At Vinterstellar, we develop space technology, establish
              space-based infrastructure, and contribute to scientific research
              — all with the goal of expanding humanity’s understanding and use
              of space. In the long run, we want our work to help make human
              life in space a reality.
            </p>

            <div style={{ height: "2vh" }} />
          </AnimatedSection>

          <AnimatedSection id="services">
            <h2>Services</h2>
            <h3>Areas of Support</h3>
            <p>
              Vinterstellar supports space systems development and business
              development efforts with consultancy or as work packet assignments
              in the areas of:
            </p>

            <ul className="spaced-list">
              <li>
                Misson Definition – Mission Objectives, Mission Architecture,
                Level 1 System Requirements Definition,
              </li>
              <li>
                Space Systems Enginering – System definition and coordination
                including systems definition, requirements allocation, reviews,
              </li>
              <li>
                Mission Analysis – Trajectory defintion and evaluation. Guidance
                definition and high fidelity orbit simulation simulation,
              </li>
              <li>
                Project management – Holding the strings in a space development
                project
              </li>
              <li>
                Business Development – Advisory positions, market insights,
                proposal writing.
              </li>
            </ul>
            <h3>Experience Assets</h3>
            <ul className="spaced-list">
              <li>
                Leadership experience at department of 20 senior engineers.
              </li>
              <li>Technology management in leading new space actor.</li>
              <li>
                Extensive business development experience and an established and
                large network in industry and academia.
              </li>
              <li>
                Business Management experience from coporate day to day
                managment, mergers and acquisitions, IPO and more.
              </li>
              <li>Teaching at leading Universites in Sweden</li>
            </ul>
            <div style={{ height: "100vh" }} />
          </AnimatedSection>
        </>
      ) : (
        <SatellitePlayground onBack={() => setView("main")} />
      )}
    </div>
  );
}

export default App;
