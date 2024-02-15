import React, { useRef, useEffect, useState } from 'react'
import axios from "axios";

const About = ({ isActive, onClick }) => {

    // *** GET ABOUT ******************************************************************
    // ********************************************************************************
    const [abouts, setAbouts] = useState([]);
    const [error, setError] = useState(null);

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

    if (error) {
        return <div>An error occured: {error.message}</div>;
    }
    // ********************************************************************************

    // ::: Change Height :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    const contentHeight = useRef();
    const [containerHeight, setContainerHeight] = useState('0px');

    useEffect(() => {
        if (isActive) {
            setContainerHeight(`${contentHeight.current.scrollHeight}px`);
        } else {
            setContainerHeight('0px');
        }
    }, [isActive]);
    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


    return (
        <div className="about-wrapper" >
            <button className={`title-container ${isActive ? 'active' : ''}`} onClick={onClick} >
                <h2 className='title-content'>About</h2>
            </button>
            {isActive && (
                <div ref={contentHeight} className={`answer-container ${isActive ? 'active' : ''}`}
                    style={{ height: containerHeight }} a
                >
                    {abouts.map(({ id, attributes }, index) => (
                        <div>
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
        </div>
    );
};

export default About;