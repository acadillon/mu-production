import React, { useEffect, useState } from 'react'
import axios from "axios";
import Work from '../Content/Work';
import AaMenu from '../Content/AaMenu';

// Import styles
import '../../assets/css/maximenu.scss';

const MaxiMenu = ({ }) => {

    // *** GET WORKS ******************************************************************
    // ********************************************************************************
    const [error, setError] = useState(null);
    const [works, setWorks] = useState([]);

    // ** Datas Works
    useEffect(() => {
        // Fetch des projets
        axios
            .get("http://localhost:1337/api/works?populate=*")
            .then(({ data }) => {
                setWorks(data.data);
            })
            .catch((error) => setError(error));
    }, []);

    if (error) {
        return <div>An error occured: {error.message}</div>;
    }
    // ********************************************************************************



    // ::: States :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    const [activeIndex, setActiveIndex] = useState(null);
    // const [aboutActive, setAboutActive] = useState(false);
    // const [actusActive, setActusActive] = useState(false);
    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


    // ::: Event :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // ::: Show Works
    const handleWorkClick = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
        // Fermer About et Actus lorsqu'un Work est ouvert
        // setAboutActive(false);
        // setActusActive(false);
    };
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    const handleMenuButtonClick = () => {
        const bottomElement = document.body; // Element au bas de la page
        bottomElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    return (
        <>
            <button id='menu-btn' onClick={handleMenuButtonClick}>MENU</button>
            <div className='maximenu-wrapper'>
                <h2 id='menu'>MENU</h2>
                <div className="maximenu">
                    <AaMenu />
                    {/* <div className="aa-wrapper">
                        <About isActive={aboutActive} onClick={handleAboutClick} />
                        <Actus isActive={actusActive} onClick={handleActusClick} />
                    </div> */}
                    

                    {works.map(({ id, attributes }, index) => (
                        <Work
                            key={index}
                            title={attributes.Title}
                            customHtml={attributes.CustomHtml}
                            body={attributes.Body}
                            sliderImages={attributes.Images.data}
                            isOpen={activeIndex === index}
                            onClick={() => handleWorkClick(index)}
                        />
                    ))}
                </div>


            </div>
        </>
    );
};

export default MaxiMenu;
