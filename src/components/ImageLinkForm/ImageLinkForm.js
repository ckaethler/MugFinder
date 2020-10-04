import React from 'react';
import "./ImageLinkForm.css";

const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return (
        <div>
            {/* Main Banner of information */}
            <p className="s3">
                {`This magic brain will detect faces in your pictures. 
                    Give it a try!`}
            </p>
            <div className="center">
                <div className="center pa4 br3 shadow-5 form">
                    <input 
                        className="f4 pa2 w-70 center" 
                        type="text" 
                        onChange={onInputChange} />
                    <button 
                        className="w-30 grow f4 link ph3 pv2 dib white 
                            bg-light-purple" 
                        onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;