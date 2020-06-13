const {gamePlayLogic} = require('./GamePlay');

const rooms = [];
let roomIndx = 0;

const findRoom = (id) => {
    if (rooms.length === 0) {
        rooms.push({roomNumber: roomIndx + 1, users: [{id, health: 100, status: 'A'}], round: 0, roundClicks: []});
        return 0;
    } else {
        if (rooms[rooms.length - 1].users.length < 2) {
            rooms[rooms.length - 1].users.push({id, health: 100, status: 'D'});
            return 1;
        } else {
            rooms.push({roomNumber: roomIndx + 1, users: [{id, health: 100, status: 'A'}], round: 0, roundClicks: []});
            return 0;
        }
    }
};

const getUserRoom = (id) =>
    rooms.find(room => room.users.find(user => user.id === id));

const deleteRoom = (id) => {
    rooms.forEach(room => {
        if (room.users.findIndex(i => i === id) !== -1) {
            const index = rooms.indexOf(room);
            if (index > -1) {
                if (room.users.length > 1) {
                    if (room.users[0] !== id) {
                        room.users.pop();
                        return;
                    } else {
                        room.users.shift();
                        return;
                    }

                }
                rooms.splice(index, 1);
            }
        }
    })
};

const updateUserRoundData = (id, val) => {
    rooms.forEach(room => {
        if (room.users.findIndex(i => i === id) !== -1) {
            const roomRound = room.round;
            const thisRound = room.roundClicks.findIndex(i => i.round === roomRound);
            if (room.roundClicks[thisRound][id]) {
                return false;
            } else {
                room.roundClicks[thisRound][id] = val;

                if (Object.keys(room.roundClicks[thisRound]).length > 2) {
                    // puts the round data and the user data together
                    let userOBJArray = [];
                    for (let j = 0; j < room.users.length; j++) {
                        for (let k = 0; k < room.roundClicks[thisRound].length; k++) {
                            //TODO: need to find a way to get the key back instead of value in roundClicks
                            if (room.users[j].id === room.roundClicks[thisRound][k].id) {
                                userOBJArray.push({...room.users[j], value: room.roundClicks[thisRound][k].id});
                            }
                        }
                    }
                    // handles the logic for the who won the round
                    const whoWon = gamePlayLogic(userOBJArray);
                    swapStatus(id);
                    return whoWon;
                }
            }
        } else {
            return false;
        }
    })
};

const updateRoomRound = (id, val) => {
    rooms.forEach(room => {
        if (room.users.findIndex(i => i.id === id) !== -1) {
            room.round = val;
            if (room.roundClicks.findIndex(i => i.round === val) === -1) {
                room.roundClicks.push({round: val});
            }
            console.log("Fuck: ", val);
            return val;
        } else {
            return 1;
        }
    })
};


const swapStatus = (id) => {
    rooms.forEach(room => {
        if (room.users.findIndex(i => i === id) !== -1) {
            room.users.forEach(user => {
                user.status = user.status === 'A' ? 'D' : 'A';
            });
            return 1;
        } else {
            return 0;
        }
    })
};


module.exports = {findRoom, deleteRoom, getUserRoom, updateRoomRound, updateUserRoundData};