import React from "react";
import Style from "style-it";

import Profile from "./profile/profile";
import Finances from "./profile/finances";
import Family from "./profile/family";
import Goals from "./profile/goals.js";
import { connect } from "react-redux";

class ProfileContent extends React.Component {
  onSubmit() {
    // submit form
  }

  render() {
    const styles = ``;

    return Style.it(
      `${styles}`,
      <form onSubmit={this.onSubmit}>
        <Profile currentStep={this.props.currentStep} />
        <Finances currentStep={this.props.currentStep} />
        <Family currentStep={this.props.currentStep} />
        <Goals currentStep={this.props.currentStep} />
      </form>
    );
  }
}

export default connect(null)(ProfileContent);
