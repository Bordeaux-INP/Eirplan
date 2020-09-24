// import React from 'react';
// import parser from 'react-xml-parser';

// import NavBar from './components/navBar';

// // import SVG from "./components/SVGs/svg";
// import logo from "./logo.svg"
// import rdc from "./SVG/RDC4.svg"
// // import testSvg from './SVG/test.svg'
// import {ReactComponent as Icon} from './SVG/RDC4.svg';


// import API from "./API"

// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import Fab from '@material-ui/core/Fab';


// import './App.css';
// import { stringify } from 'querystring';
// class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       view: 1,
//       svgData: [],
//       floor: []
//     };
//     // this.handleClick = this.handleClick.bind(this);
//   }

//   componentDidMount() {
//     this.getSvgData();
//   }

//   getSvgData = async () => {
//     let parser = new DOMParser();
//     try {
//       let {data} = await API.getEventData();
//       // this.setState({svgData: svgData});
//       // console.log('data',data);
//       // const xmlData = parser.parseFromString(data.floors[0].stringData,'text/xml');
//       // for (let index = 0; index < xmlData.g.g.path; index++) {
//       //   const element = array[index];
        
//       // }
//       // console.log('tag name', xmlData.getElementByTagName('PATH'));
//       // // for(let path of xmlData.getElementByTagName('PATH')){
//       // //   if(path.desc){
//       // //     path.removeAttribute("style");
//       // //   }
//       // // }
//       // xmlData.getElementsByTagName("PATH")[0].removeAttribute("style");
//       // console.log('xmlData',xmlData);


//       // this.setState({floor: stringify(xmlData)});
//       this.setState({floor: data.floors[2].stringData});
//       // this.setState({floor: rdc});

//       // console.log('floor',this.state.floor);
      

//     } catch (error) {
//       console.log('getSvgData error:', error);
//     }
//   }

//   // handleClick(view) {
//   //   this.setState( {view} )
//   //   console.log(this.state);
//   // }

//   handleStands(){
//     console.log('handling Stands');
//   }
//   render (){
//     const { view } = this.state.view;
//     // const buff = new Buffer(this.state.floor);
//     // const base64data = buff.toString('base64');
//     // const base64data = buff.toString('utf-8');
//     // console.log('floor',this.state.floor);
    
    
//     return (
        
//       <div className="App">
//       <NavBar className="NavBar"/>
//       <hr />

//       {/* <div className="buttons">
      
//       <ButtonGroup
//         orientation="vertical"
//         color="secondary"
//         aria-label="vertical contained primary button group"
//         variant="contained"
//       >
//         <Fab onClick={() => this.handleClick(1)}>-1</Fab>
//         <Fab onClick={() => this.handleClick(2)}>0</Fab>
//         <Fab onClick={() => this.handleClick(3)}>0N</Fab>
 
//       </ButtonGroup>
//     </div> */}
    
//     {/* {view === 1 ? <SS_SOL /> : view === 2 ? <RDC /> :  <NV_BAT />} */}
  
//       {/* <img src={`data:image/svg+xml;base64,${base64data}`} className="rdc" alt=""/>  */}
//       {/* <img src={`data:image/svg+xml;utf8,${base64data}`} className="rdc" alt=""/>  */}
//       {/* <img src={`data:image/svg+xml,${this.state.floor }`} className="rdc" alt=""/>  */}
//       {/* <img src={this.state.floor } className="rdc" alt=""/>  */}
//       {/* <img src={rdc } className="home" alt=""/>  */}
//       {/* <img src={testSvg} className={"test_svg"} alt=""/>  */}
//       {/* <object type="image/svg+xml" data="testSvg" width="100%" height="100%"></object> */}
//       {/* <object type="image/svg+xml" data="./SVG/test.svg" width="100%" height="100%"></object> */}
      
//       {/* <div>
//         {this.state.floor}
//       </div> */}
//       <div className={"container"}>

     
//         <div onClick={this.handleStands}>
//           <div dangerouslySetInnerHTML={{__html: this.state.floor}} />;
//         </div>
      
//         {/* <div id="a">Div A</div>
//         <div>random other elements</div>
//         <div>random other elements</div>
//         <div>random other elements</div>
//         <div id="b">Div B</div> */}
              
     
        
//       </div>
//         {/* <div className='home'>
//             <Icon className='home__icon'/>
//         </div> */}
      
//     </div>  

//     )
    
//   }
// }
  // Words.text
    //   for(var i = 0; i<5;i++){
       
    //     wordsString = data.plan.floors[0].locations[i].desc;
    //   }
    //   console.log('words',wordsString);

    //   for(var i = 0; i<wordsString.length;i++){
       
    //     ar.push(wordsString[i].split(' '));
    //   }
    //  console.log('words',ar);

//     for(var i = 0; i<ar.length;i++){
//       Words.push(ar[i]);
//       // this.setState({words[{text}] : Words} );
//  }
//  for(var i = 0; i<Words.length;i++){

//   wordsData.push({text: Words[i], value: 1});
// }
// this.setState({words : wordsData} );


// console.log('words',this.state.words);



import React from "react";
import ReactDOM from "react-dom";
import { RadioSVGMap } from "react-svg-map";

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Fab from '@material-ui/core/Fab';
import ReactWordcloud from 'react-wordcloud';

import NavBar from './components/navBar';

import API from "./API"

import "./map.scss";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
     
			pointedLocation: null,
			focusedLocation: null,
      selectedLocation: null,
      floorMaps: {},
      words:[{}],
      currentMap: 0,
      mapsCount: 0,
      loaded: false,
		};

		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationFocus = this.handleLocationFocus.bind(this);
		this.handleLocationBlur = this.handleLocationBlur.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.fetchEventData();
  }

  fetchEventData = async () => {
    let Words = [];
    let wordsData = [];
    let wordsString;
    try {

      let {data} = await API.getEventData();
     console.log('data',data);
      this.setState({floorMaps: data.plan.floors});
      this.setState({mapsCount: data.plan.floors.length});
      this.setState({loaded: true});
      // Words.text
     
  //      wordsString = data.plan.floors[0].locations[0].desc;
  //      var ar = wordsString.split(' ');
  //      for(var i = 0; i<ar.length;i++){
  //           Words.push(ar[i]);
  //           // this.setState({words[{text}] : Words} );
  //      }
  //      for(var i = 0; i<Words.length;i++){
      
  //       wordsData.push({text: Words[i], value: 1});
  //  }
  //     this.setState({words : wordsData} );


  //    console.log('words',this.state.words);



    } catch (error) {
      console.log('fetchEventData error:', error);
    }
  }

  getLocationName(event){
    return event.target.attributes.name.value;
  }

  getLocationDesc(event) {
    // console.log(event.target.attributes);
    let id = event.target.attributes.name.value;
    let currentMap = this.state.currentMap;

    console.log(currentMap)

    for (const path of this.state.floorMaps[currentMap].locations) {
      // for (const path of this.state.floorMaps[this.state.currentMap].locations) {
      if (path.id === id){
        return path.desc;
      }
    }
  }

	handleLocationMouseOver(event) {
		const pointedLocation = this.getLocationName(event);
		this.setState({ pointedLocation: pointedLocation });
	}

	handleLocationMouseOut() {
		this.setState({ pointedLocation: null });
	}

	handleLocationFocus(event) {
		const focusedLocation = this.getLocationDesc(event);
		this.setState({ focusedLocation: focusedLocation });
	}

	handleLocationBlur() {
		this.setState({ focusedLocation: null });
	}

	handleOnChange(selectedNode) {
		this.setState(prevState => {
			return {
				...prevState,
				selectedLocation: selectedNode.attributes.name.value
			};
		});
	}

  handleClick(increment) {

    let newMap = this.state.currentMap + increment;

    newMap = Math.min(Math.max(newMap, 0), this.state.mapsCount-1);

    this.setState( {currentMap: newMap} );

    console.log(this.state);
  }
	render() {

    if (this.state.loaded){
      let currentMap = this.state.currentMap;
      
      console.log('Current map check for wall id',this.state.floorMaps[currentMap]);

      return (
        <div className="App">
          <NavBar className="NavBar"/>  
      
        <article className="examples__block">
          <div className="container">
            <div className="buttons">
      
              <ButtonGroup
                orientation="vertical"
                color="secondary"
                aria-label="vertical contained primary button group"
                variant="contained"
              >
                <Fab onClick={() => this.handleClick(1)}>+</Fab>
                <Fab onClick={() => this.handleClick(-1)}>-</Fab>
        
              </ButtonGroup>
            </div> 
            
    {/* {view === 1 ? <SS_SOL /> : view === 2 ? <RDC /> :  <NV_BAT />}  */}
          <div className="examples__block__map examples__block__map--Taiwan">
            <RadioSVGMap
              map={this.state.floorMaps[currentMap]}
              onLocationMouseOver={this.handleLocationMouseOver}
              onLocationMouseOut={this.handleLocationMouseOut}
              onLocationFocus={this.handleLocationFocus}
              onLocationBlur={this.handleLocationBlur}
              onChange={this.handleOnChange} />
          </div>
          </div>
          <div className="standInformation">
            <div className="examples__block__info">
              <div className="examples__block__info__item">
                Pointed location: {this.state.pointedLocation}
              </div>
              <div className="examples__block__info__item">
                Focused location: {this.state.focusedLocation}
              </div>
              <div className="examples__block__info__item">
                Selected location: {this.state.selectedLocation}
              </div>
            </div>
          </div>
        </article>
        {/* <ReactWordcloud words={this.state.words} /> */}
        </div>
      );
    } else {
      return (
        <div>Loading....</div>
      )
    }
    
	}
}

export default App;
