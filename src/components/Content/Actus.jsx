import React, { useRef, useEffect, useState } from 'react'
import axios from "axios";
import Actu from './Actu';



const Actus = ({ isActive, onClick }) => {

    // *** GET ACTUS ******************************************************************
    // ********************************************************************************
    const [actus, setActus] = useState([]);
    const [error, setError] = useState(null);

    // ** Datas Works
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
        <>
            <div className="actus-wrapper">
                <button className={`title-container ${isActive ? 'active' : ''}`} onClick={onClick} >
                    <p className='title-content'>Actualités</p>
                </button>
                {isActive && (
                    <div ref={contentHeight} className={`answer-container actu-content ${isActive ? 'active' : ''}`}
                        style={{ height: containerHeight }} a
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

        </>
    );
};

export default Actus;
