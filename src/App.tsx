import { BrowserRouter as Router } from "react-router-dom";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Experience from "./components/Experience";
import Tech from "./components/Tech";
import Works from "./components/Works";


const App = () => {
  return (
    <Router>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
          <Navbar />
          <Hero />
          <About />
          <Experience />
          <Tech />
          <Works />
        </div>
      </div>
    </Router>
  )
}

export default App