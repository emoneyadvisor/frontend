import React from "react";
import Style from "style-it";

import MainHeader from "./main-header";
import MainNav from "./main-nav";
import ActionItemsContent from "./page_content/action-items-content";
import AdvisorContactContent from "./page_content/advisor-contact-content";
import ClientsContent from "./page_content/clients-content";
import ConfigurationContent from "./page_content/configuration-content";
import PlanContent from "./page_content/plan-content";
import ProfileContent from "./page_content/profile-content";
import ToastCard from "./toast/toast-card";
import ToastPageNav from "./toast/toast-page-nav";

class PageTemplate extends React.Component {
  getScreenContent() {
    switch (this.props.page) {
      case "profile":
        return <ProfileContent />;
      case "plan":
        return <PlanContent />;
      case "actionitems":
        return <ActionItemsContent />;
      case "advisorcontact":
        return <AdvisorContactContent />;
      case "clients":
        return <ClientsContent />;
      case "configs":
        return <ConfigurationContent />;
      default:
        return <React.Fragment />;
    }
  }

  getLeftNav() {
    switch (this.props.page) {
      case "profile":
        return <ToastPageNav profile />;
      case "clients":
        return <ToastPageNav hidden />;
      case "advisorcontact":
        return <ToastPageNav hidden />;
      default:
        return <ToastPageNav />;
    }
  }

  getMainHeader() {
    switch (this.props.page) {
      case "profile":
        return (
          <MainHeader header="Your Profile" leftside="header" rightside="nav" />
        );
      case "plan":
        return <MainHeader header="Your Plan" leftside="header" />;
      case "actionitems":
        return <MainHeader header="Your Action Items" leftside="header" />;
      case "advisorcontact":
        return <MainHeader header="Your Advisor" leftside="header" />;
      case "clients":
        return <MainHeader header="Your Clients" leftside="header" />;
      case "configs":
        return <MainHeader header="Configure Factors" leftside="header" />;
      default:
        return <MainHeader />;
    }
  }

  render() {
    const styles = `
    .nav-content-container {
        display: flex;
        justify-content: space-between;
        background-color: var(--toast-neutral-5);
    }
    
    .leftnav-card {
        display: flex;
        justify-content: space-between;
        height: calc(90vh - 1rem);
    }

    .right-content {
      width: calc(100% - 10rem);
      margin: 1rem 6.5rem 0 6.5rem;
    }
      `;

    return Style.it(
      `${styles}`,
      <div>
        <div className="nav-content-container">
          <MainNav user={this.props.user} />
          <div className="right-content">
            {this.getMainHeader()}
            <div className="leftnav-card">
              {this.getLeftNav()}
              <ToastCard>{this.getScreenContent()}</ToastCard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageTemplate;
