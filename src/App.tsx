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
} from "./components";

const App = () => {
  return (
    <Router>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
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
      </div>
    </Router>
  );
};

export default App;