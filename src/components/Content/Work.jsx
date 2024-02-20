import React, { useRef, useEffect, useState } from 'react'
import Slider from '../Sliders/Slider';

const Work = ({ title, customHtml, body, sliderImages, isOpen, onClick }) => {


    // ::: Change Height :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    const contentHeight = useRef();
    const [containerHeight, setContainerHeight] = useState('0px');
    const [isContentVisible, setIsContentVisible] = useState(isOpen);

    useEffect(() => {
        let timeoutId;
        if (isOpen) {
            setIsContentVisible(true);
            setContainerHeight(`${contentHeight.current.scrollHeight}px`);
        } else {
            timeoutId = setTimeout(() => {
                setIsContentVisible(false);
            }, 1000);
            setContainerHeight('0px'); 
        }
        return () => clearTimeout(timeoutId);
    }, [isOpen, body]);
    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    return (
        <div className={`accordeon-wrapper`}>
            <button className={`title-container ${isOpen ? 'active' : ''}`} onClick={onClick} >
                <h2 className='title-content'>{title}</h2> 
            </button>

            <div ref={contentHeight} className={`answer-container ${isOpen ? 'active' : ''}`}
            style={{ height: containerHeight }}
            >
                {setIsContentVisible && (
                    <div className="accordeon-content">
                        {body.map((paragraph, paragraphIndex) => (
                            <div className="body-p" key={paragraphIndex}>
                                <p>
                                    {paragraph.children.map((child, index) => (
                                        <span key={index}>{child.text}</span>
                                    ))}
                                </p>
                            </div>
                        ))}
                        <p className="answer-content" dangerouslySetInnerHTML={{ __html: customHtml }}></p>
                        <Slider images={sliderImages} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Work;


