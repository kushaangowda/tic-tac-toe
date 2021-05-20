import React from "react";
import { Main } from "./components/Main";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Redirect to={"/game/" + uuidV4()} />
				</Route>
				<Route path="/game/:id">
					<Main />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
