// Include React as a dependency
import React, { Component } from 'react'
import userimage from '../../assets/userimg.jpg'

// Results Component Declaration
class Results extends Component {
  // Here we will save states for the contents we save
  state = {
    title: "",
    url: "",
    pubdate: ""
  }

  // A helper method for mapping through our tweets and outputting some HTML
  renderTweets = () => {
    return this.props.results.map((tweet) => {
      return (
        <div key={tweet}>
          <li className="list-group-item">
            <div className='row'>
              <img className='img-circle tweetimg pull-left ' src={userimage} />
              <p className='texty'> <strong>MarkovBot </strong> <a className='greyer'>@markovbotREAL</a><br />
                </p>
                <p className='thetweet'>{tweet}
              </p>
            </div>
          </li>
        </div>
      );
    });
  }

  // A helper method for rendering a container to hold all of our tweets
  renderContainer = () => {
    return (
      <div>
        <div className="col-md-1">
        </div>
        <div className="col-md-7">
          <ul className="list-group">
            {this.renderTweets()}
          </ul>
        </div>
      </div>
    );
  }
  render() {
    // If we have tweets, return this.renderContainer()
    return this.renderContainer();
  }
};

// Export the module back to the route
export default Results;
