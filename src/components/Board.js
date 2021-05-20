import React, { useState, useEffect } from "react";
import { Cell } from "./Cell";
import { io } from "socket.io-client";
import { useParams, useHistory } from "react-router-dom";

export const Board = () => {
	let history = useHistory();
	const { id: gameId } = useParams();
	const [socket, setSocket] = useState();
	const [board, setBoard] = useState([
		[null, null, null],
		[null, null, null],
		[null, null, null],
	]);
	const [userId, setUserId] = useState("");
	const [player, setPlayer] = useState("");
	const [notPlayer, setNotPlayer] = useState("");
	const [turn, setTurn] = useState("X");
	const [toggle, setToggle] = useState(false);

	// create socket connection
	useEffect(() => {
		const s = io("http://localhost:5000");
		setSocket(s);
		return () => {
			s.disconnect();
		};
	}, []);

	useEffect(() => {
		if (socket == null) return;
		const handler = ({ board, notPlayer }) => {
			console.log("receiving changes");
			setBoard(board);
			winGame(board);
			setTurn(notPlayer);
		};
		socket.on("receive-changes", handler);
		return () => {};
	}, [socket, board, gameId, toggle]);

	useEffect(() => {
		if (socket == null) return;
		socket.emit("send-changes", { board, notPlayer });
		console.log("sending changes");
		return () => {};
	}, [socket, toggle]);

	useEffect(() => {
		if (socket == null) return;
		socket.emit("get-game", gameId);
		socket.once("init", ({ player1, userId }) => {
			if (player1 == null) window.location.href = "http://localhost:3000";
			else {
				console.log("Yo");
				setPlayer(player1);
				setUserId(userId);
				if (player1 == "X") setNotPlayer("O");
				else setNotPlayer("X");
				console.log(player1);
			}
		});
	}, [socket, toggle, gameId]);

	const changeBoard = (i, j) => {
		let newBoard = board;
		newBoard[i][j] = player;
		setBoard(newBoard);
		setToggle(!toggle);
		setTurn(notPlayer);
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
				<Cell
					board={board}
					player={player}
					notPlayer={notPlayer}
					changeBoard={changeBoard}
					i={0}
					j={0}
					turn={turn}
				/>
				<Cell
					board={board}
					player={player}
					notPlayer={notPlayer}
					changeBoard={changeBoard}
					i={0}
					j={1}
					turn={turn}
				/>
				<Cell
					board={board}
					player={player}
					notPlayer={notPlayer}
					changeBoard={changeBoard}
					i={0}
					j={2}
					turn={turn}
				/>
				<Cell
					board={board}
					player={player}
					notPlayer={notPlayer}
					changeBoard={changeBoard}
					i={1}
					j={0}
					turn={turn}
				/>
				<Cell
					board={board}
					player={player}
					notPlayer={notPlayer}
					changeBoard={changeBoard}
					i={1}
					j={1}
					turn={turn}
				/>
				<Cell
					board={board}
					player={player}
					notPlayer={notPlayer}
					changeBoard={changeBoard}
					i={1}
					j={2}
					turn={turn}
				/>
				<Cell
					board={board}
					player={player}
					notPlayer={notPlayer}
					changeBoard={changeBoard}
					i={2}
					j={0}
					turn={turn}
				/>
				<Cell
					board={board}
					player={player}
					notPlayer={notPlayer}
					changeBoard={changeBoard}
					i={2}
					j={1}
					turn={turn}
				/>
				<Cell
					board={board}
					player={player}
					notPlayer={notPlayer}
					changeBoard={changeBoard}
					i={2}
					j={2}
					turn={turn}
				/>
			</div>
			<h4 style={{ color: "#fff" }}>turn: {turn}</h4>
			<h4 style={{ color: "#fff" }}>player: {player}</h4>
			<h4 style={{ color: "#fff" }}>notPlayer: {notPlayer}</h4>
			<h4 style={{ color: "#fff" }}>{turn === player ? "It's your turn" : "It's " + notPlayer + "'s turn"}</h4>
		</div>
	);
};
