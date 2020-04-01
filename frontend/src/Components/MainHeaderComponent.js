import React, { Component } from 'react';
import Style from 'style-it';

import ClientNavComponent from './ClientNavComponent';

class MainHeaderComponent extends Component {
  render() {
    const styles = `
    .wrapper {
       display: flex;
       justify-content: space-between;
       align-items: center;
       height: 10vh;
    }
    `;

    function getLeftSide(props) {
      switch (props.leftside) {
        case 'header':
          return <h2>{props.header}</h2>;
        default:
          return <React.Fragment></React.Fragment>;
      }
    }

    function getRightSide(props) {
      switch (props.rightside) {
        case 'nav':
          return <ClientNavComponent></ClientNavComponent>;
        default:
          return <React.Fragment></React.Fragment>;
      }
    }

    return Style.it(
      `${styles}`,
      <div className='wrapper'>
        {getLeftSide(this.props)}
        {getRightSide(this.props)}
      </div>
    );
  }
}
export default MainHeaderComponent;
