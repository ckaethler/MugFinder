// Creates detect image form for user to upload photos
import React from 'react';
import "./ImageLinkForm.css";

const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return (
        <div className="w-80 m-auto shadow-box p-56">
            <div className="">
                <label 
                    className="input-label" 
                    htmlFor="url">Detect someone's mug:</label>
            </div>
            
            <div className="space-between">
                <input 
                    className="input-form" 
                    type="text" 
                    name="url"  
                    id="url"
                    placeholder="Enter a url..."
                    onChange={() => onInputChange} 
                    required />
                <button 
                    className="btn ml-16" 
                    onClick={onSubmit}>
                    Detect
                </button>
            </div>
            
        </div>
    );
}

export default ImageLinkForm;