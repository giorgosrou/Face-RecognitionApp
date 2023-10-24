import React, {Component} from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from 'particles-bg'
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import './App.css'
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

const returnClarifaiRequestOptions =(imageURL) => {
  const PAT = 'b97159a343f7487e9d942beab677436e';
  const USER_ID = '5vq48xpk02s2';       
  const APP_ID = 'my-first-application-7svhpi';
  // const MODEL_ID = 'face-detection';
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
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  OnSubmitDetectButton = () => {
    this.setState({ imageURL: this.state.input });

    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
    .then(resp => this.displayFaceBox(this.calculateFaceLocation(resp)))
    .then(res=> {
      fetch('http://localhost:3000/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: this.state.user.id
        })
      })
      .then(response=>response.json())
      .then(count=> {
        this.setState(Object.assign(this.state.user, { entries: count}))
        })
    })  
    .catch(error => console.log('error', error));
    
  }

  onRouteChange = (route) => {
    if (route==='signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render () {
    const { isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange} />
        { route === 'home' 
          ?
          <div>
            <Logo />
            <Rank 
              name={this.state.user.name}
              entries={this.state.user.entries}
           />
            <ImageLinkForm 
              onInputChange = {this.onInputChange} 
              OnSubmitDetectButton = {this.OnSubmitDetectButton}
            />
            <FaceRecognition imageURL = {imageURL} box = {box}/>
          </div>
          :
          ( route === 'signin' 
          ? 
          <SignIn loadUser={this.loadUser} onRouteChange ={this.onRouteChange}/>
          :
          <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/> 
          )
        }   
      </div>
    );
  }
}

export default App;
