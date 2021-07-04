import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';



//API added below

//for home page animation
const particleOptions={
  particles: {
      line_linked:{
        shadow:{
          enable: true,
          color:'#3CA9D1',
          blur: 5

        },
        distance:150
      },
      number: {
        value:80,
        density:{
          enable: true,
          value_area:800
        }
      }
  }
  }

  //state unitializer
  const initialState={
    input:'',
    imageURL:'',
    box: {},
    route:'signin',
    isSignedIn:false,
    user: {
      id:'',
      name:'',
      joined: '',
      score: 0,
      email:''
    }
  }


class App extends React.Component {

  constructor(){
    super();
    this.state=initialState;
  }

  loadUser=(data)=>{
    this.setState({ user: {
      id: data.id,
      name: data.name,
      joined: data.joined,
      score: data.score,
      email: data.email
    }})
  }

  calculateFaceLocation=(data)=>{
    const clarifaiFace=data;
    const image=document.getElementById('inputImage');
    const width=Number(image.width);
    const height=Number(image.height);
    return{
      leftCol:clarifaiFace.left_col*width,
      topRow:clarifaiFace.top_row*height,
      rightCol:width- (clarifaiFace.right_col*width),
      bottomRow:height-(clarifaiFace.bottom_row*height)
    }
  }

  displayFaceBox=(box)=>{
    this.setState({box: box});
  }

  onInputChange=(event)=>{
    this.setState({input: event.target.value});
  }

  onSubmit=()=>{
    console.log("submit");
    this.setState({imageURL: this.state.input})
    fetch('http://localhost:3000/imageurl', {
            method: 'post',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input 
          })
        })
      .then(response=> response.json())
      .then(response=> {
        if(response){
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id 
          })
          })
          .then(response => response.json())
          .then( count => {
            this.setState(Object.assign(this.state.user, {score : count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(
        this.calculateFaceLocation(response.outputs[0].data.regions[0].region_info.bounding_box)
      )})
      .catch(err=> console.log("Oopsies",err))
  }



  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState(initialState)
    } else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route: route});
  }

 

  render(){
    const {isSignedIn, imageURL, route, box} = this.state;
    return (
      <div className="App">

        <Particles  className='particles'
                params={particleOptions} />


        <Navigation isSignedIn={isSignedIn}  onRouteChange={this.onRouteChange}/>
        {this.state.route=== 'home'
          ?<div>
            <Logo />
            <Rank name={this.state.user.name} score={this.state.user.score} />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit} 
            />
        
            <FaceRecognition  box={box} imageURL={imageURL}  />
          </div>
          :(
            route==='signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          ) 
        } 
      </div>
    );
  }
}

export default App;
