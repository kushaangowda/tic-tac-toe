import React, { useState } from "react";
import { Cell } from "./Cell";

export const Board = () => {
	const [board, setBoard] = useState([
		["X", null, null],
		[null, "O", null],
		[null, null, null],
	]);

	const [player, setPlayer] = useState("X");
	const [notPlayer, setNotPlayer] = useState("O");
	const [turn, setTurn] = useState("X");

	const changeBoard = (i, j, val) => {
		let newBoard = board;
		newBoard[i][j] = val;
		setBoard(newBoard);
		winGame(newBoard);
	};

	const winGame = (newBoard) => {
		if (
			(newBoard[0][0] === newBoard[0][1] && newBoard[0][1] === newBoard[0][2] && newBoard[0][0] === "X") ||
			(newBoard[1][0] === newBoard[1][1] && newBoard[1][1] === newBoard[1][2] && newBoard[1][0] === "X") ||
			(newBoard[2][0] === newBoard[2][1] && newBoard[2][1] === newBoard[2][2] && newBoard[2][0] === "X") ||
			(newBoard[0][0] === newBoard[1][0] && newBoard[1][0] === newBoard[2][0] && newBoard[0][0] === "X") ||
			(newBoard[0][1] === newBoard[1][1] && newBoard[1][1] === newBoard[2][1] && newBoard[0][1] === "X") ||
			(newBoard[0][2] === newBoard[1][2] && newBoard[1][2] === newBoard[2][2] && newBoard[0][2] === "X") ||
			(newBoard[0][0] === newBoard[1][1] && newBoard[1][1] === newBoard[2][2] && newBoard[0][0] === "X") ||
			(newBoard[0][2] === newBoard[1][1] && newBoard[1][1] === newBoard[2][0] && newBoard[0][2] === "X")
		) {
			if (player === "X") window.alert("You Won");
			else window.alert("You Lost");
			setBoard([
				[null, null, null],
				[null, null, null],
				[null, null, null],
			]);
		} else if (
			(newBoard[0][0] === newBoard[0][1] && newBoard[0][1] === newBoard[0][2] && newBoard[0][0] === "O") ||
			(newBoard[1][0] === newBoard[1][1] && newBoard[1][1] === newBoard[1][2] && newBoard[1][0] === "O") ||
			(newBoard[2][0] === newBoard[2][1] && newBoard[2][1] === newBoard[2][2] && newBoard[2][0] === "O") ||
			(newBoard[0][0] === newBoard[1][0] && newBoard[1][0] === newBoard[2][0] && newBoard[0][0] === "O") ||
			(newBoard[0][1] === newBoard[1][1] && newBoard[1][1] === newBoard[2][1] && newBoard[0][1] === "O") ||
			(newBoard[0][2] === newBoard[1][2] && newBoard[1][2] === newBoard[2][2] && newBoard[0][2] === "O") ||
			(newBoard[0][0] === newBoard[1][1] && newBoard[1][1] === newBoard[2][2] && newBoard[0][0] === "O") ||
			(newBoard[0][2] === newBoard[1][1] && newBoard[1][1] === newBoard[2][0] && newBoard[0][2] === "O")
		) {
			if (player === "X") window.alert("You Lost");
			else window.alert("You Won");
			setBoard([
				[null, null, null],
				[null, null, null],
				[null, null, null],
			]);
		}
	};

	return (
		<div>
			<div className="board">
				<Cell board={board} player={player} notPlayer={notPlayer} changeBoard={changeBoard} i={0} j={0} />
				<Cell board={board} player={player} notPlayer={notPlayer} changeBoard={changeBoard} i={0} j={1} />
				<Cell board={board} player={player} notPlayer={notPlayer} changeBoard={changeBoard} i={0} j={2} />
				<Cell board={board} player={player} notPlayer={notPlayer} changeBoard={changeBoard} i={1} j={0} />
				<Cell board={board} player={player} notPlayer={notPlayer} changeBoard={changeBoard} i={1} j={1} />
				<Cell board={board} player={player} notPlayer={notPlayer} changeBoard={changeBoard} i={1} j={2} />
				<Cell board={board} player={player} notPlayer={notPlayer} changeBoard={changeBoard} i={2} j={0} />
				<Cell board={board} player={player} notPlayer={notPlayer} changeBoard={changeBoard} i={2} j={1} />
				<Cell board={board} player={player} notPlayer={notPlayer} changeBoard={changeBoard} i={2} j={2} />
			</div>
			<h4 style={{ color: "#fff" }}>{turn === player ? "It's your turn" : "It's " + turn + "'s turn"}</h4>
		</div>
	);
};
