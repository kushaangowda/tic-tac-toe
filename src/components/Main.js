import React from "react";
import { Board } from "./Board";

export const Main = () => {
	return (
		<div className="main p-5">
			<h1>Tic Tac Toe</h1>
			<div className="container">
				<Board />
			</div>
		</div>
	);
};
