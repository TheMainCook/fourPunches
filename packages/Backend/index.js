const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const {findRoom, getUserRoom, deleteRoom, updateRoomRound, updateUserRoundData} = require('./Game');
//Port from environment variable or default - 4001
const port = process.env.PORT || 4001;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//Setting up a socket with the namespace "connection" for new sockets
io.on("connection", socket => {

    //puts user in room/ if no avaibale room creates room
    console.log("New client connected");
    const isPlayerTwo = findRoom(socket.id);
    socket.join(getUserRoom(socket.id));
    if (isPlayerTwo) {
        //sends that the game is started to players
        //TODO: find a way to emit message to player two also
        console.log("Start Game");
        io.to(getUserRoom(socket.id)).emit('startGame', {isGameStarted: true});
    }


    //Here we listen on a new namespace called "roundInit"
    socket.on('roundInit', (message, callback) => {
        // update round number
        updateRoomRound(socket.id, 1);
        // sends the round number to players
        console.log("Round: ", 1);
        io.to(getUserRoom(socket.id)).emit('roundStart', {round: 1});
        callback();
    });

    socket.on('roundEnd', (message, callback) => {
        // gets round data, if both players have sent data it decides the winner and swaps the status
        const allPlayersDone = updateUserRoundData(socket.id, message.value);
        if (allPlayersDone !== false) {
            //TODO: winner of round and if they are attacking or defending
            //io.to(getUserRoom(socket.id)).emit('roundResults', {isGameStarted: true});
            //TODO: loser of round and if they are attacking or defending
           // io.to(getUserRoom(socket.id)).emit('roundResults', {isGameStarted: true});
            // update round number
            updateRoomRound(socket.id, message.round + 1);
            //starts a new round
            io.to(getUserRoom(socket.id)).emit('roundStart', {round: message.round + 1});
        }
        callback();
    });


    //A special namespace "disconnect" for when a client disconnects
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        deleteRoom(socket.id);
    });

});


server.listen(port, () => console.log(`Listening on port ${port}`));