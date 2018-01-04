// Include React as a dependency
import React, { Component } from 'react'
// Including the Link component from React Router to navigate within our application without full page reloads
// https://github.com/ReactTraining/react-router/blob/master/docs/API.md#link
import "../assets/style.css"
import { Link } from "react-router";

// Create the Main component
class Main extends Component {

  render() {

    return (
      // We can only render a single div. So we need to group everything inside of this main-container one
      <div className="main-container container">
          {/* These sub-components are getting passed as this.props.children */}
          {this.props.children}
      </div>
    );
  }
};

// Export the module back to the route
export default Main;
