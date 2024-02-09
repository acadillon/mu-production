import React, { useEffect, useState } from 'react'
import axios from "axios";
import Header from './components/Layout/Header';
import MaxiMenu from './components/Menus/MaxiMenu';



// Import styles
import './App.css'

const App = () => {

  // *** GET COVER ******************************************************************
  // ********************************************************************************
  const [abouts, setAbout] = useState([]);
  const [error, setError] = useState(null);

  // ** Datas about
  useEffect(() => {
    // Fetch des about
    axios
      .get("http://localhost:1337/api/abouts?populate=*")
      .then(({ data }) => {
        setAbout(data.data);
      })
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  // ********************************************************************************


  return (
    <>
      {/* {abouts.map(({ id, attributes }, index) => (
        {
          attributes.Images.data.map((image, index) => (
            image.map((image, index) => (
              <img src={'http://localhost:1337' + image.attributes.url} alt={image.attributes.name} />
            ))
          ))
        }
      ))} */}
      <Header />
      <MaxiMenu />
    </>
  )
}

export default App
