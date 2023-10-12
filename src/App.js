import React, {Components} from "react";
import Navigation from "./components/Navigation";
import './App.css'

class App extends Components {
  render () {
    return (
      <div className="App">
        <Navigation />
  
        {/* <Logo />
        <ImageLinkForm />
        <FaceRecognition /> */}
      </div>
    );
  }

}

export default App;
