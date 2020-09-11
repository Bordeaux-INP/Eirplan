import React from 'react';

import NavBar from './components/navBar';

// import SVG from "./components/SVGs/svg";
import logo from "./logo.svg"
import rdc from "./SVG/RDC.svg"
import API from "./API"

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Fab from '@material-ui/core/Fab';


import './App.css';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 1,
      svgData: []
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getSvgData();
  }

  getSvgData = async () => {
    try {
      let {data} = await API.getEventData();
      // this.setState({svgData: svgData});
      console.log('data',data);
    } catch (error) {
      console.log('getSvgData error:', error);
    }
  }

  // handleClick(view) {
  //   this.setState( {view} )
  //   console.log(this.state);
  // }

  render (){
    const { view } = this.state;
    return (
        
      <div className="App">
      <NavBar className="NavBar"/>
      <hr />

      <div className="buttons">
      
      {/* <ButtonGroup
        orientation="vertical"
        color="secondary"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        <Fab onClick={() => this.handleClick(1)}>-1</Fab>
        <Fab onClick={() => this.handleClick(2)}>0</Fab>
        <Fab onClick={() => this.handleClick(3)}>0N</Fab>
 
      </ButtonGroup> */}
    </div>
    
    {/* {view === 1 ? <SS_SOL /> : view === 2 ? <RDC /> :  <NV_BAT />} */}

      {/* <img src={rdc} className="rdc" alt="rdc" />  */}

    </div>  

    )
    
  }
}

export default App;
