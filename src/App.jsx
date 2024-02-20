import React, { useEffect, useState } from 'react'
import axios from "axios";

import Header from './components/Layout/Header';
import MaxiMenu from './components/Menus/MaxiMenu';




// Import styles
import './App.css'

const App = () => {

  // *** GET COVER ******************************************************************
  // ********************************************************************************
  const [abouts, setAbouts] = useState([]);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasScrolled, sethasScrolled] = useState(false);

  window.addEventListener("scroll", function(){
    if(window.scrollY==0){
      // Scroll is top 
      sethasScrolled(false);
    } else {
      // Had Scroll
      sethasScrolled(true);
    }
  });

  // ** Datas about
  useEffect(() => {
    // Fetch des about
    axios
      .get("http://localhost:1337/api/abouts?populate=*")
      .then(({ data }) => {
        setAbouts(data.data);
      })
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  // ********************************************************************************

  // Check if imageLoad
  const handleImageLoad = () => {
    setImageLoaded(true);
  };




  return (
    <>

      {abouts.map(({ id, attributes }, index) => (
        <div className="cover" key={id}>
          <img src={'http://localhost:1337' + attributes.Cover.data.attributes.url} alt="Cover" onLoad={handleImageLoad} />
        </div>
      ))}

      {imageLoaded && <Header />}

      <main className={hasScrolled ? 'scrolled' : ''}>
        <MaxiMenu />
      </main>

      <footer>
        <p>MU production •2023</p>
        <p>Web design and development: Alice CADILLON</p>
      </footer>

    </>
  )
}

export default App
