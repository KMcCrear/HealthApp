import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NavBar from './components/NavBar';
import Login from './pages/Login'
import Test from './pages/Test'

function App() {
	return (
		<>
		<div className='App'>
		<NavBar/>
		<Router>
			<Route path="/" exact render={()=><Home/>} />
			<Route path="/register" render={()=><Register/>} />
		</Router>
		</div>
		</>
	);
}

export default App;
