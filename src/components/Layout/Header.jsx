import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// Import styles
import '../../assets/css/header.scss';

const Header = () => {

  const ref = useRef();
  // useEffect(() => {
  //   const el = ref.current;
  //   ScrollTrigger.create({
  //     trigger: el,
  //     pin: el,
  //     start: "top top", // Ajoutez un décalage pour épingler le header légèrement en dessous du haut du viewport
  //     end: "bottom top",
  //     markers: true
  //   });

  // }, []);


  return (
    <>


      <div className="sticky-object" id="Mu" ref={ref}>
        Mu
      </div>
      <div className="sticky-object" id="Prodiff">
        <div>
          Production
          <div id="Diff">
            <span id="and">&</span>
            <br></br>Diffusion des
          </div>
        </div>
      </div>
      <div className="sticky-object" id="Art">Arts chorégraphiques</div>


      <header>

        <div className="menu-wrapper">
          <button>Menu</button>
        </div>
      </header>
    </>
  );
};

export default Header;