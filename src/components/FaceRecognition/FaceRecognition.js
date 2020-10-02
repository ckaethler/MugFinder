// ----------------------------------------------------------------------------
import React from 'react';
import './FaceRecognition.css';

// ----------------------------------------------------------------------------
const FaceRecognition = ({imageURL, borderBoxes}) => {
    // ------------------------------------------------------------------------
    let borders = <div></div>;
    if(borderBoxes.length > 0) {
        borders = borderBoxes.map((box, index) => {
           return <div key={index} className="border-box" 
            style={{
                top: box.topRow, 
                right: box.rightCol, 
                bottom: box.bottomRow, 
                left: box.leftCol,
            }}></div>
        });
    }

    // ------------------------------------------------------------------------
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img
                    id="mugImage"
                    src={imageURL} 
                    alt="" 
                    width="600px"
                    height="auto" />
                {borders}
            </div>
        </div>
    );
}

export default FaceRecognition;