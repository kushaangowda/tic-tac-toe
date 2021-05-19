import React, { useState } from "react";

export const Cell = ({ board, changeBoard, i, j, player, notPlayer }) => {
	const [possibleState, setPossibleState] = useState("");

	const myStyle = {
		cell: {
			gridRow: Number(i) + 1 + "/" + (Number(i) + 2),
			gridColumn: Number(j) + 1 + "/" + (Number(j) + 2),
			color: board[i][j] !== notPlayer ? "gold" : "white",
			cursor: board[i][j] == null ? "pointer" : "context-menu",
		},
	};

	const changeCell = () => {
		if (board[i][j] == null) changeBoard(i, j, player);
	};

	return (
		<div
			className="cell"
			style={myStyle.cell}
			onMouseEnter={() => {
				setPossibleState(player);
			}}
			onMouseLeave={() => {
				setPossibleState("");
			}}
			onClick={changeCell}
		>
			{board[i][j]}
			{board[i][j] == null && possibleState}
		</div>
	);
};
