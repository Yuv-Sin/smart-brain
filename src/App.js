import React, {Component} from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Header from './components/Header/Header';
import 'tachyons';




const app = new Clarifai.App({
  apiKey: '86ce594ab3a242649b7bd14ec574b97f'
});


const particlesOptions={
                particles: {
                  number: {
                    value: 120,
                    density: {
                      enable: true,
                      value_area: 800
                    }
                  }
                }
              }

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      IsSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
} 
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
    
  }


  


  loadUser = (data) =>{
    this.setState({
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
        entries: data.entries,
        joined: data.joined
      }
    })
  }


  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputImage');
    const width = Number(img.width);
    const height = Number(img.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    
    }

  }
  displayFaceBox = (box) =>{
    this.setState({box: box});
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
 onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        if (response) {
          fetch(' https://stormy-bastion-22152.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(err => console.log(err));

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(console.log);
  }

  onRouteChange = (route) =>{
    if(route === 'SignOut')
    {
      this.setState(initialState);
    }
    else if(route === 'home'){
      this.setState({ IsSignedIn: true });
    }
    this.setState({ route: route });
  }

  render() {
  return (
    <div className="App">
      <Particles className='particle' params={particlesOptions} />
      <Navigation  IsSignedIn = { this.state.IsSignedIn } onRouteChange={ this.onRouteChange } />
      { this.state.route === 'home'
       ?  <div>
            <Logo />
            <Rank name={ this.state.user.name } entries= { this.state.user.entries } />
      
            <ImageLinkForm onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={ this.state.box } imageUrl={ this.state.imageUrl }/>
          </div>
      :(
          this.state.route === 'SignIn'
          ? <SignIn loadUser={ this.loadUser } onRouteChange={ this.onRouteChange } />
          :(
              this.state.route === 'Register'
          ? <Register loadUser={ this.loadUser } onRouteChange={ this.onRouteChange } />
          : <div>
            <Header />
            <SignIn loadUser={ this.loadUser } onRouteChange={ this.onRouteChange } />
            </div>
          )
        )
      }    
    </div>
  );
}
}



export default App;
