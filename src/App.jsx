import React from "react";
import ReactDOM from "react-dom";
import Footer from "./Components/Footer.jsx";
import Home from "./Components/Home.jsx";

import Header from "./Header.jsx";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
