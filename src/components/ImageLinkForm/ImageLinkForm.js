import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, OnSubmitDetectButton}) => {
    return (
        <div>
            <p className="f3">
                {'This magic brain will detect faces in your pictures.'}
            </p>  
            <p>{'To use the smart brain follow the below steps:'}</p>
            <div>
            <ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
                <li style={{ marginLeft: '1.5em' }}><i>{'Find the image you want to upload online.'}</i></li>
                <li style={{ marginLeft: '1.5em' }}><i>{'Right-click on the image.'}</i></li>
                <li style={{ marginLeft: '1.5em' }}><i>{'Select "Copy Image Address" from the context menu.'}</i></li>
                <li style={{ marginLeft: '1.5em' }}><i>{'Paste the copied URL and click the "Detect" button.'}</i></li>
            </ol>
            </div>
            <p><i>{'Example image: https://staticg.sportskeeda.com/editor/2022/08/53e15-16596004347246.png?w=840'}</i></p>
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