import React, {Component} from "react";
import Navigation from "./components/Navigation/Navigation";
import './App.css'
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";


const particlesOptions = {
  Particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const returnClarifaiRequestOptions =(imageURL) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = 'b97159a343f7487e9d942beab677436e';
  // Specify the correct user_id/app_id pairings
  const USER_ID = '5vq48xpk02s2';       
  const APP_ID = 'my-first-application-7svhpi';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageURL;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
          "data": {
              "image": {
                  "url": IMAGE_URL
              }
            }
        }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions

}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  OnSubmitDetectButton = () => {
    this.setState({imageURL: this.state.input});

    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }

  render () {
    return (
      <div className="App">
        <Particles className="particles"
        params={particlesOptions}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange = {this.onInputChange} OnSubmitDetectButton = {this.OnSubmitDetectButton} />
        <FaceRecognition imageURL = {this.state.imageURL}/>
      </div>
    );
  }

}

export default App;
