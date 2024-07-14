import { BrowserRouter as Router } from "react-router-dom";
import {
  Hero,
  Navbar,
  Experience,
  Tech,
  Works,
  StarsCanvas,
  Contact,
  FlowingLightsAnimation,
} from "./components";

const App = () => {
  return (
    <Router>
      <div className="relative w-full">
        <div className="fixed inset-0 z-0">
          {/* <SmokeTrailAnimation /> */}
          <FlowingLightsAnimation />
        </div>
        <div className="relative z-1 bg-transparent">
          <Navbar />
          <Hero />
          <Experience />
          <Tech />
          <Works />
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </Router>
  );
};

export default App;