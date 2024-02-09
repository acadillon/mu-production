import React, { useRef, useEffect, useState } from 'react'


const About = ({ isActive, onClick }) => {

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
                <p className='title-content'>About</p> 
            </button>
            {isActive && (
                <div ref={contentHeight} className={`answer-container ${isActive ? 'active' : ''}`}
                    style={{ height: containerHeight }} a
                >
                    <p>About content</p>
                </div>
            )}
        </div>
    );
};

export default About;