// Include React as a dependency
import React, { Component } from 'react'
import helpers from "../../utils/helpers";
// Query Component Declaration
class Query extends Component {
  // Here we set initial variables for the component to be blanks
  state = {
    twitter: "realdonaldtrump",
    twitter1: "quotessimpson",
  }

  // Whenever we detect ANY change in the textbox, we register it.
  handleChange = (event) => {
    // Here we create syntax to capture any change in text to the query terms (pre-twitter).
    // See this Stack Overflow answer for more details:
    // http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  // This code handles the stwitter2ing of the twitter terms to the parent Search component
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateSearch(this.state.twitter, this.state.twitter1);

  }

  // Here we render the Query component
  render() {

    return (
          <div className="col-md-5">
              <div className="row">
                {/* Note how we associate the text-box inputs with the state values */}
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <div className=" col-md-6">
                     First Twitter User
                      <input
                        type="text"
                        value={this.state.twitter}
                        className="form-control"
                        id="twitter"
                        onChange={this.handleChange}
                        required
                      />
                      </div>
                      <div className=" col-md-6">
                      Second Twitter User
                      <input
                        type="text"
                        value={this.state.twitter1}
                        className="form-control"
                        id="twitter1"
                        onChange={this.handleChange}
                        required
                      />
                      </div>
                    {/* Here we create the onClick event that triggers the HandleSubmit */}

                    <div className='col-md-12'>
                      <button
                        type="submit"
                        className="btn-block btn-xs margintop1"
                      >
                       Generate Markov Tweets
                      </button>
                      </div>
                  </div>
                </form>
              </div>
              <h2 className="sometextmorewidth">
                <strong>
                  Twitter Markov Creator
                </strong>
              </h2>
              <div className="sometext">
                <p>
                  Search for two twitter users and see the result of plugging their tweets through a <a href='https://en.wikipedia.org/wiki/Markov_chain' target='_blank' >markov chain</a>.
                </p>
                <p className='viewit'>
                  <a href='www.github.com'>
                    view the code on github
                  </a>
                </p>
              </div>
            </div>
        );
      }
    };

// Export the module back to the route
export default Query;
