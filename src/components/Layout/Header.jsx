import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Import styles
import '../../assets/css/header.scss';

const Header = () => {

  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    ScrollTrigger.create({
      trigger: el,
      pin: el,
      start: "top top", 
      end: "bottom top",
      markers: true
    });
    
  }, []);


  return (
    <>
      <header>
        {/* <div id="mu-sticky--wrapper" ref={container}> */}
        <div id="mu-sticky--wrapper" ref={ref}>
          <div>
            <span id='Mu'>Mu</span>
            <span id='Prod'>Production</span>
            <span id='Diff'><span id='and'>&</span><br></br>Diffusion des</span>
            <span id='Art'><br></br>Arts chorégraphiques</span>
          </div>
        </div>
        <div className="menu-wrapper">
          <button>Menu</button>
        </div>
      </header>
    </>
  );
};

export default Header;