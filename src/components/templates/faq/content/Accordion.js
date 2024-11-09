'use client';
import React, { useState } from 'react'
import styles from './accordion.module.css'
function Accordion() {

    const [openIndex, setOpenIndex] = useState(0);

    const toggleIndex = (index) => {
        setOpenIndex(prevIndex => (prevIndex === index ? -1 : index));
    }

    return (
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                    onClick={() => toggleIndex(0)}
                    className={`accordion-button ${openIndex === 0 ? '' : 'collapsed'}`}
                         type="button"
                         data-bs-target="#collapseOne" 
                         aria-expanded={openIndex === 0}
                         aria-controls="collapseOne">
                        Accordion Item #1
                    </button>
                </h2>
                <div id="collapseOne"
                    className={`accordion-collapse collapse ${openIndex === 0 ? 'show' : ''}`}
                    data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                    onClick={() => toggleIndex(1)}
                    className={`accordion-button ${openIndex === 1 ? '' : 'collapsed'}`}
                        type="button" data-bs-toggle="collapse" 
                        data-bs-target="#collapseTwo" 
                        aria-expanded={openIndex == 1}
                        aria-controls="collapseTwo">
                        Accordion Item #2
                    </button>
                </h2>
                <div id="collapseTwo"
                    id="collapseTwo" className={`accordion-collapse collapse ${openIndex === 1 ? 'show' : ''}`}
                    data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button
                    onClick={() => toggleIndex(2)}
                    className={`accordion-button ${openIndex === 2 ? '' : 'collapsed'}`} 
                        type="button" data-bs-toggle="collapse" 
                        data-bs-target="#collapseThree" 
                        aria-expanded={openIndex === 2} 
                        aria-controls="collapseThree">
                        Accordion Item #3
                    </button>
                </h2>
                <div id="collapseThree"
                   id="collapseTwo" className={`accordion-collapse collapse ${openIndex === 2 ? 'show' : ''}`}
                    data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accordion