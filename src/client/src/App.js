import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Users from "./pages/Users";


function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Users} />
      </div>
    </Router>
  );
}

export default App;
