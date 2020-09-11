import React from 'react';

class navBar extends React.Component {
    render(){
    return(
        <div className="logo">
            <img className="enseirbLogo" src="./img/enseirb-logo.png" alt="logo enseirb" ></img>
            <div className="txt">
                <h2 className="txt-1"> Forum Ingénib </h2>
                <h3 className="txt-2"> 10/10/2020 </h3>
            </div>
            <img className="forumLogo" src="./img/forum-logo.png" alt="logo forum" ></img>

        </div>
    )
    }
}

export default navBar;