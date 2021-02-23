import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Landing from "./components/Landing";

function App() {
	return (
		<div className="App">
			<Router>
				<Route path="/" exact render={(props) => <Home />} />
				<Route path="/register" render={(props) => <Register />} />
				<Route path="/landing" render={(props) => <Landing />} />
			</Router>
		</div>
	);
}

export default App;
