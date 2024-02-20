import React, { useRef, useEffect, useState } from 'react'
import axios from "axios";
import Actu from './Actu';

const AaMenu = ({ isActive, onClick }) => {

    // *** GET ABOUT ******************************************************************
    // ********************************************************************************
    const [abouts, setAbouts] = useState([]);
    const [actus, setActus] = useState([]);
    const [error, setError] = useState(null);
    const [aboutActive, setAboutActive] = useState(false);
    const [actusActive, setActusActive] = useState(false);
    const [isOnDisplay, setisOnDisplay] = useState(false);
    const [aboutContainerHeight, setAboutContainerHeight] = useState('0px');
    const [actusContainerHeight, setActusContainerHeight] = useState('0px');

    const aboutContentHeight = useRef();
    const actusContentHeight = useRef();



    // ::: Change Height :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    useEffect(() => {
        if (isOnDisplay && aboutActive) {
            setAboutContainerHeight(`${aboutContentHeight.current.scrollHeight}px`);
        } else {
            setAboutContainerHeight('0px');
        }
    }, [isOnDisplay, aboutActive]);

    useEffect(() => {
        if (isOnDisplay && actusActive) {
            setActusContainerHeight(`${actusContentHeight.current.scrollHeight}px`);
        } else {
            setActusContainerHeight('0px');
        }
    }, [isOnDisplay, actusActive]);
    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // ** Datas about
    useEffect(() => {
        // Fetch des about
        axios
            .get("http://localhost:1337/api/abouts")
            .then(({ data }) => {
                setAbouts(data.data);
            })
            .catch((error) => setError(error));
    }, []);

    // ** Datas actu
    useEffect(() => {
        // Fetch des actualites
        axios
            .get("http://localhost:1337/api/actualites")
            .then(({ data }) => {
                setActus(data.data);
            })
            .catch((error) => setError(error));
    }, []);


    if (error) {
        return <div>An error occured: {error.message}</div>;
    }
    // ********************************************************************************


    const updateContainerHeight = async () => {
        if (isOnDisplay && aboutActive) {
            setAboutContainerHeight(`${aboutContentHeight.current.scrollHeight}px`);
        } else if (isOnDisplay && actusActive) {
            setActusContainerHeight(`${actusContentHeight.current.scrollHeight}px`);
        } else {
            setAboutContainerHeight('0px');
            setActusContainerHeight('0px');
        }
    };

    // ::: Event :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // ::: Show About
    // const handleAboutClick = () => {
    //     setAboutActive(!aboutActive);
    //     setActusActive(false);
    // };
    const handleAboutClick = async () => {
        if (!aboutActive && !actusActive) {
            setAboutActive(true);
            setActusActive(false);
            setisOnDisplay(true);
            console.log('1');
        } else if (!aboutActive && actusActive) {
            setAboutActive(true);
            setActusActive(false);
            await updateContainerHeight();
            console.log('2');
        } else if (aboutActive) {
            console.log('3');
            setisOnDisplay(false);
            setTimeout(() => {
                setAboutActive(false);
            }, 1000);
        }
    };
    // ::: Show Actus
    // const handleActusClick = () => {
    //     setActusActive(!actusActive);
    //     setAboutActive(false);
    // };
    const handleActusClick = async () => {
        if (!aboutActive && !actusActive) {
            setActusActive(true);
            setAboutActive(false);
            setisOnDisplay(true);
            console.log('1*');
        } else if (aboutActive && !actusActive) {
            setActusActive(true);
            setAboutActive(false);
            setisOnDisplay(true);
            await updateContainerHeight();
            console.log('2*');
        } else if (actusActive) {
            setisOnDisplay(false);
            setTimeout(() => {
                setActusActive(false);
            }, 1000);
            console.log('3*');
        }
    };
    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


    return (

        <div className="aa-wrapper">
            <div className="aa-btn--wrapper">
                <button className={`title-container ${aboutActive ? 'active' : ''}`} onClick={handleAboutClick} >
                    <h2 className='title-content'>About</h2>
                </button>
                <button className={`title-container ${actusActive ? 'active' : ''}`} onClick={handleActusClick} >
                    <h2 className='title-content'>Actualités</h2>
                </button>
            </div>
            <div className="aa-ctnt--wrapper">

                {/* contenus about */}
                {aboutActive && (
                    <div ref={aboutContentHeight} className={`answer-aa ${aboutActive ? 'active' : ''}`}
                        style={{ height: aboutContentHeight }}
                    >
                        {abouts.map(({ id, attributes }, index) => (
                            <div key={index}>
                                <div className="about-body">
                                    {attributes.Body.map((paragraph, index) => (
                                        <p key={index}>{paragraph.children[0].text}</p>
                                    ))}
                                </div>
                                <div className="about-bio">
                                    {attributes.Bio.map((paragraph, index) => (
                                        <p key={index}>{paragraph.children[0].text}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* contenus actus */}
                {actusActive && (
                    <div ref={actusContentHeight} className={`answer-aa actu-content ${actusActive ? 'active' : ''}`}
                        style={{ height: actusContentHeight }}
                    >
                        {actus.map(({ id, attributes }, index) => (
                            <Actu
                                key={index}
                                title={attributes.Title}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>


    );
};

export default AaMenu;