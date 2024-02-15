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

      <div className="cover-wrapper">
        {abouts.map(({ id, attributes }, index) => (
          <div className="cover" key={id}>
            <img src={'http://localhost:1337' + attributes.Cover.data.attributes.url} alt="Cover" onLoad={handleImageLoad}/>
          </div>
        ))}
        {imageLoaded && <Header />}
      </div>

      <h2 className='big-title'>Menu</h2>
      <MaxiMenu />
    </>
  )
}

export default App
