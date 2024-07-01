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
  FlowingLightsAnimation,
  SmokeTrailAnimation
} from "./components";

const App = () => {
  return (
    <Router>
      <div className="relative w-full h-screen bg-primary">
        <div className="absolute inset-0 z-0">
          <SmokeTrailAnimation />
          <FlowingLightsAnimation />
        </div>
        <div className="relative z-10 bg-transparent">
          <Navbar />
          <Hero />
          <About />
          <Experience />
          <Tech />
          <Works />
          <Feedbacks />
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </Router>
  );
};

export default App;