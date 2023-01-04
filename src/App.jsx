import React from "react";
import ReactDOM from "react-dom";
import ActivityFeed from "./Components/ActivityFeed.jsx";

import Header from "./Header.jsx";

const App = () => {
  return (
    <div className="container">
      <Header />
      <ActivityFeed />
      <div className="container-view">Some activities should be here</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
