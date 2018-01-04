// Include the Axios library for HTTP requests
import axios from "axios";

// Helper Functions
const helpers = {
  // This will post search query terms to the server
  postUser: function(twitter, twitter1) {
    console.log('gere')
    var newUsers = { user1: twitter, user2: twitter1};
    return axios.post("/markov", newUsers)
    .then(function(response) {
        console.log("axios results", response);
        return response;
    });
  },
};


// We export the helpers function
export default helpers;
