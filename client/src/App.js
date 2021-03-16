import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact render={(props) => <Login />} />
        <Route path="/register" render={(props) => <Register />} />
        <Route path="/landing" render={(props) => <Home />} />
        <Route path="/profile" exact render={(props) => <Profile />} />
      </Router>
    </div>
  );
}

export default App;
