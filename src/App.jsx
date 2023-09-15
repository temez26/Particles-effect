import "./App.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particlesConfig } from "./particles-config";

export default function Background() {
  const particlesInit = async (main) => {
    console.log(main);

   
    await loadFull(main);
  };

  return (
    <div className="App">
      

      <Particles id="tsparticles" init={particlesInit} options={particlesConfig} />
    
    
    </div>
  );
}