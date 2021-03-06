import React from "react";
import Style from "style-it";

import ToastSaveCancel from "../toast/toast-save-cancel";

import { connect } from "react-redux";
import {
  getCurrentStep,
  getClientId,
  getFilteredClients,
  getFirstName,
  getLastName,
  getSalaryAfterTax,
} from "../../redux/selectors";
import { incrementStep, decrementStep } from "../../redux/actions";

import ConfigurationContent from "./configuration-content";
import PlanContent from "./plan-content";
import ProfileContent from "./profile-content";

class PageContentTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.getSave = this.getSave.bind(this);
  }

  next() {
    if (this.getSave() === "View Plan") {
      document.location.href = "/plan";
    } else {
      this.props.incrementStep();
    }
  }

  prev() {
    this.props.decrementStep();
  }

  getHideCancel() {
    if (this.props.user === "client" && this.props.page === "plan") {
      return this.props.clientId === "";
    } else {
      return this.props.currentStep === 0;
    }
  }

  getHideSave() {
    if (this.props.user === "client" && this.props.page === "plan") {
      return this.props.clientId === "";
    } else if (this.props.user === "client" && this.props.page === "profile") {
      return (
        !this.props.firstName ||
        !this.props.lastName ||
        !this.props.salaryAfterTax
      );
    } else {
      return this.props.currentStep === 4 && this.props.page !== "profile";
    }
  }

  getSave() {
    if (this.props.page === "profile" && this.props.currentStep === 3) {
      return "View Plan";
    } else {
      return "Next";
    }
  }

  showContent() {
    return this.props.clientId !== "";
  }

  getContent() {
    switch (this.props.page) {
      case "profile":
        return <ProfileContent {...this.props} />;
      case "plan":
        return <PlanContent {...this.props} showContent={this.showContent()} />;
      case "configuration":
        return <ConfigurationContent {...this.props} />;
      default:
        return <React.Fragment />;
    }
  }

  render() {
    const styles = `
    .save-cancel {
      display: flex;
      justify-content: flex-end;
    }

    .container {
      height: calc(90vh - 5rem);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    `;

    return Style.it(
      `${styles}`,
      <div className="container">
        {this.getContent()}
        <div className="save-cancel">
          <ToastSaveCancel
            saveClicked={this.next}
            cancelClicked={this.prev}
            saveLabel={this.getSave()}
            cancelLabel="Previous"
            hideCancel={this.getHideCancel()}
            hideSave={this.getHideSave()}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentStep: getCurrentStep(state),
  clientId: getClientId(state),
  clients: getFilteredClients(state),
  firstName: getFirstName(state),
  lastName: getLastName(state),
  salaryAfterTax: getSalaryAfterTax(state),
});

export default connect(mapStateToProps, {
  incrementStep,
  decrementStep,
})(PageContentTemplate);
