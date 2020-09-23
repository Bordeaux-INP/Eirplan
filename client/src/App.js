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

import React from "react";
import ReactDOM from "react-dom";
import Taiwan from "@svg-maps/taiwan";
// import Taiwan from "./SVG/tunisia";
import { RadioSVGMap } from "react-svg-map";
import "./map.scss";

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   handleClick(){
//       console.log('propst',this.props);
//   }
//   render() {
   
//     return (
//     <RadioSVGMap onClick={this.handleClick()} map={Taiwan} />
   
    
//     );
//   }
// }

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
     
			pointedLocation: null,
			focusedLocation: null,
      selectedLocation: null,
      floorMaps: [],
      testMap:{
        label: "Map of RDC",
        viewBox: "0 0 300 500",
        locations:[
          {
            name: "capgemini",
            id: "capgemini",
            path: "m 145.26099,100.09245 h 6.41447 v 2.93997 h -6.41447 z",
            desc: "Description of capgemini"
          },
          {
            name: "bouygues",
            id: "bouygues",
            path: "m 156.61993,99.156998 h 6.41447 v 2.939962 h -6.41447 z",
            desc: "Description of bouygues"
          },
          {
            name: "wall",
            id: "wall",
            path: "M 104.6994,161.58482 -0.13363476,159.69354 v -49.71213 m 206.69762476,30.81472 -0.36555,21.30284 -65.78029,-0.51415 m 7.18156,-41.38839 c 0,5.21876 -5.45754,9.4494 -12.18974,9.4494 -6.7322,0 -12.18973,-4.23064 -12.18973,-9.4494 0,-5.21876 5.45752,-9.44941 12.18973,-9.44941 6.73221,0 12.18974,4.23064 12.18974,9.44941 z m 58.96428,20.5997 -66.7128,-0.37798 0.56696,21.16667 H 104.6994 l 0.18899,-20.97768 -105.03275491,-1.25807 0.0107302,-29.36766 L 207.13095,93.171131 Z",
            desc: "Description of wall"
          },

        ]
      }
		};

		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationFocus = this.handleLocationFocus.bind(this);
		this.handleLocationBlur = this.handleLocationBlur.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
  }
  // componentDidMount() {
  //   this.getSvgData();
  // }

  // getSvgData = async () => {
  //   try {
  //     let {data} = await API.getEventData();
     
  //     this.setState({floor: data.floors[2].stringData});

  //   } catch (error) {
  //     console.log('getSvgData error:', error);
  //   }
  // }

  getLocationName(event) {
    console.log(event.target.attributes);
    let id = event.target.attributes.name.value;

    for (const path of this.state.testMap.locations) {
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
		const focusedLocation = this.getLocationName(event);
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

	render() {

    // console.log('taiwan',Taiwan);
    // console.log('testMap',this.state.testMap);

    
		return (
			<article className="examples__block">
				<h2 className="examples__block__title">
					Taiwan SVG map as radio buttons
				</h2>
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
        <div className="container">
				<div className="examples__block__map examples__block__map--Taiwan">
					<RadioSVGMap
						map={this.state.testMap}
						onLocationMouseOver={this.handleLocationMouseOver}
						onLocationMouseOut={this.handleLocationMouseOut}
						onLocationFocus={this.handleLocationFocus}
						onLocationBlur={this.handleLocationBlur}
						onChange={this.handleOnChange} />
				</div>
        </div>
			</article>
		);
	}
}

export default App;
