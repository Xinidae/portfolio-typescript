// views
import { About, Contact, Hero, Projects, Timeline } from "./views";

// components
import { Menu } from "./components";

function App() {
  return (
    <>
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Contact />
      <Menu />
    </>
  );
}

export default App;
