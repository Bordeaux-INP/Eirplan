import React from 'react';

import NavBar from './components/navBar';

import RDC from './components/SVGs/RDC';
import SS_SOL from './components/SVGs/SS_SOL';
import NV_BAT from './components/SVGs/NV_BAT';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


import './App.css';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 1
    };
    this.handleClick = this.handleClick.bind(this);
}

handleClick(view) {
  this.setState( {view} )
  console.log(this.state);
}

  render (){
    const { view } = this.state;
    return (
        
      <div className="App">
      <NavBar className="NavBar"/>
      <hr />

      <div className="buttons">
      
      <ButtonGroup
        orientation="vertical"
        color="secondary"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        <Button onClick={() => this.handleClick(1)}>Sous Sol</Button>
        <Button onClick={() => this.handleClick(2)}>RDC</Button>
        <Button onClick={() => this.handleClick(3)}>Nouv Bat</Button>
 
      </ButtonGroup>
    </div>
    
    {view === 1 ? <SS_SOL /> : view === 2 ? <RDC /> :  <NV_BAT />}

 

    </div>  

    )
    
  }
}

export default App;
