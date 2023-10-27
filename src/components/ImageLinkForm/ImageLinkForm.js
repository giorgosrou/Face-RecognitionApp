import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, OnSubmitDetectButton}) => {
    return (
        <div>
            <p className="f3">
                {'This magic brain will detect faces in your pictures.'}
            </p>  
            <p>{'To use the smart brain follow the below steps:'}</p>
            <ol>
                <li><i>{'1.Find online the image e.g google.'}</i></li>
                <li><i>{'2.Press right click on the image.'}</i></li>
                <li><i>{'3.Click on "Copy image Address".'}</i></li>
                <li><i>{'4.Paste it and click the "Detect" button.'}</i></li>
            </ol>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className="f4 pa2  w-70 center" type="tex" onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" 
                    onClick={OnSubmitDetectButton}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;