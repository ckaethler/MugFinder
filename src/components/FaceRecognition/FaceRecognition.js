// Renders picture from internet with boxes around faces
import React from 'react';

const FaceRecognition = ({imageURL, borderBoxes}) => {
    // Creates border divs for faces
    let borders = <div className="borders"></div>;
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

    return (
        <div className="w-100 center">
            <div className="absolute mt-72">
                <img
                    id="mugImage"
                    className=""
                    src={imageURL} 
                    alt="" 
                    width="800px"
                    height="auto" />
                {borders}
            </div>
        </div>
    );
}

export default FaceRecognition;