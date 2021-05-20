const io = require("socket.io")(5000, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

// run everytime client connects
io.on("connection", (socket) => {
	console.log("Connected");
	socket.on("get-game", (gameId) => {
		socket.join(gameId);
		console.log(io.sockets.adapter.rooms);
		var np = io.sockets.adapter.rooms.get(gameId).size;
		if (np == 1) io.to(socket.id).emit("init", { player1: "X", userID: socket.id });
		else if (np == 2) io.to(socket.id).emit("init", { player1: "O", userID: socket.id });
		else io.to(socket.id).emit("init", { player1: null, userID: socket.id });

		socket.on("send-changes", ({ board, notPlayer }) => {
			console.log("sending changes");
			console.log(board);
			socket.broadcast.to(gameId).emit("receive-changes", { board, notPlayer });
		});
	});
});
