import React from 'react';
import parser from 'react-xml-parser';

import NavBar from './components/navBar';

// import SVG from "./components/SVGs/svg";
import logo from "./logo.svg"
import rdc from "./SVG/RDC.svg"
// import testSvg from './SVG/test.svg'
import {ReactComponent as Icon} from './SVG/RDC4.svg';

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
      svgData: [],
      floor: []
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // this.getSvgData();
  }

  getSvgData = async () => {
    let parser = new DOMParser();
    try {
      let {data} = await API.getEventData();
      // this.setState({svgData: svgData});
      console.log('data',data);
      // const floor = parser.parseFromString(data.floors[0].stringData,'text/xml');
      this.setState({floor: data.floors[0].stringData});
      // this.setState({floor: floor});

      // console.log('floor',this.state.floor);
      

    } catch (error) {
      console.log('getSvgData error:', error);
    }
  }

  // handleClick(view) {
  //   this.setState( {view} )
  //   console.log(this.state);
  // }

  render (){
    const { view } = this.state.view;
    // const buff = new Buffer(this.state.floor);
    // const base64data = buff.toString('base64');
    // const base64data = buff.toString('utf-8');
    // console.log('floor',this.state.floor);
    
    
    return (
        
      <div className="App">
      <NavBar className="NavBar"/>
      <hr />

      {/* <div className="buttons">
      
      <ButtonGroup
        orientation="vertical"
        color="secondary"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        <Fab onClick={() => this.handleClick(1)}>-1</Fab>
        <Fab onClick={() => this.handleClick(2)}>0</Fab>
        <Fab onClick={() => this.handleClick(3)}>0N</Fab>
 
      </ButtonGroup>
    </div> */}
    
    {/* {view === 1 ? <SS_SOL /> : view === 2 ? <RDC /> :  <NV_BAT />} */}
  
      {/* <img src={`data:image/svg+xml;base64,${base64data}`} className="rdc" alt=""/>  */}
      {/* <img src={`data:image/svg+xml;utf8,${base64data}`} className="rdc" alt=""/>  */}
      {/* <img src={`data:image/svg+xml,${this.state.floor }`} className="rdc" alt=""/>  */}
      {/* <img src={this.state.floor } className="rdc" alt=""/>  */}
      {/* <img src={rdc } className="rdc" alt=""/>  */}
      {/* <img src={testSvg} className={"test_svg"} alt=""/>  */}
      {/* <object type="image/svg+xml" data="testSvg" width="100%" height="100%"></object> */}
      {/* <object type="image/svg+xml" data="./SVG/test.svg" width="100%" height="100%"></object> */}
      
      {/* <div>
        {this.state.floor}
      </div> */}
      {/* <span dangerouslySetInnerHTML={{__html: this.state.floor}} />; */}


        <div className='home'>
            <Icon className='home__icon'/>
        </div>
      
    </div>  

    )
    
  }
}

export default App;
