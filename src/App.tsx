import { BrowserRouter as Router } from "react-router-dom";
import {
  Hero,
  Navbar,
  About,
  Experience,
  Tech,
  Works,
  Feedbacks,
  StarsCanvas,
  Contact,
  MoleculeCanvas,
} from "./components";

const App = () => {
  return (
    <Router>
      <div className="relative z-0 bg-primary">
        <div className="bg-cover bg-center bg-no-repeat">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
        <div className="fixed top-0 left-0 w-full h-full z-[-1]">
          <MoleculeCanvas />
        </div>
      </div>
    </Router>
  );
};

export default App;