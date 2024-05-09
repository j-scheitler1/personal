import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";


import Main from "./components/mainTable";
import BetCalculator from "./components/kelly";
import ImpliedProbabilityCalculator from "./components/impliedProb";
import ProbCalculator from "./components/novig";
import UserApp from "./components/user_frontend";
import AboutUs from "./components/aboutus";

function App() {
	return (
		<>

			<Router>
				<Routes>
					<Route
						exact
						path="/"
						element={<Main />}
					/>
					<Route
						exact
						path="/implied"
						element={<ImpliedProbabilityCalculator />}
					/>
					<Route
						exact
						path="/kelly"
						element={<BetCalculator />}
					/>	
					<Route
						exact
						path="/prob"
						element={<ProbCalculator />}
					/>
					<Route
						exact
						path="/login"
						element={<UserApp />}
					/>
					<Route
						exact
						path="/aboutUs"
						element={<AboutUs />}
					/>	
					<Route
            path="*"
            element={<Navigate to="/" />}
          />
				</Routes>
			</Router>
		
		</>
	);
}

export default App;
