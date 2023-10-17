import React from "react";
// import { Tilt } from 'react-tilt'
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brainLogo.png';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 40 }} style={{ height: 220, width: 220 }} >
                <div className="Tilt-inner pa5">
                    <img style={{paddingTop: '1px'}} alt='logo' src={brain}/>
                </div>
            </Tilt>
        </div>

    )
}

export default Logo;