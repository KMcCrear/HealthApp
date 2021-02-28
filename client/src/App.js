import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NavBar from './components/NavBar';


function App() {
	return (
		<>
		<NavBar/>
		<Router>
			<Route path="/" exact render={()=><Home/>} />
			<Route path="/register" render={()=><Register/>} />
		</Router>
		</>
	);
}

export default App;
