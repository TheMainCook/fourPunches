const gamePlayLogic = (userOBJArray) => {
    let data;
    if (userOBJArray[0].status === 'A') {
        switch (userOBJArray[0].value) {
            case 'LH':
                if (userOBJArray[1].value === 'LHB') {
                    data = {user: userOBJArray[1].id, damageTaken: 0}
                }
                if (userOBJArray[1].value === 'LJB') {
                    data = {user: userOBJArray[1].id, damageTaken: 1}
                }
                if (userOBJArray[1].value === 'RJB') {
                    data = {user: userOBJArray[1].id, damageTaken: 2}
                }
                if (userOBJArray[1].value === 'RHB') {
                    data = {user: userOBJArray[1].id, damageTaken: 3}
                }
                break;
            case 'LJ':
                if (userOBJArray[1].value === 'LHB') {
                    data = {user: userOBJArray[1].id, damageTaken: 1}
                }
                if (userOBJArray[1].value === 'LJB') {
                    data = {user: userOBJArray[1].id, damageTaken: 0}
                }
                if (userOBJArray[1].value === 'RJB') {
                    data = {user: userOBJArray[1].id, damageTaken: 2}
                }
                if (userOBJArray[1].value === 'RHB') {
                    data = {user: userOBJArray[1].id, damageTaken: 3}
                }
                break;
            case 'RJ':
                if (userOBJArray[1].value === 'LHB') {
                    data = {user: userOBJArray[1].id, damageTaken: 3}
                }
                if (userOBJArray[1].value === 'LJB') {
                    data = {user: userOBJArray[1].id, damageTaken: 2}
                }
                if (userOBJArray[1].value === 'RJB') {
                    data = {user: userOBJArray[1].id, damageTaken: 0}
                }
                if (userOBJArray[1].value === 'RHB') {
                    data = {user: userOBJArray[1].id, damageTaken: 1}
                }
                break;
            case 'RH':
                if (userOBJArray[1].value === 'LHB') {
                    data = {user: userOBJArray[1].id, damageTaken: 3}
                }
                if (userOBJArray[1].value === 'LJB') {
                    data = {user: userOBJArray[1].id, damageTaken: 2}
                }
                if (userOBJArray[1].value === 'RJB') {
                    data = {user: userOBJArray[1].id, damageTaken: 1}
                }
                if (userOBJArray[1].value === 'RHB') {
                    data = {user: userOBJArray[1].id, damageTaken: 0}
                }
                break;
        }
    } else {
        switch (userOBJArray[1].value) {
            case 'LH':
                if (userOBJArray[0].value === 'LHB') {
                    data = {user: userOBJArray[0].id, damageTaken: 0}
                }
                if (userOBJArray[0].value === 'LJB') {
                    data = {user: userOBJArray[0].id, damageTaken: 1}
                }
                if (userOBJArray[0].value === 'RJB') {
                    data = {user: userOBJArray[0].id, damageTaken: 2}
                }
                if (userOBJArray[0].value === 'RHB') {
                    data = {user: userOBJArray[0].id, damageTaken: 3}
                }
                break;
            case 'LJ':
                if (userOBJArray[0].value === 'LHB') {
                    data = {user: userOBJArray[0].id, damageTaken: 1}
                }
                if (userOBJArray[0].value === 'LJB') {
                    data = {user: userOBJArray[0].id, damageTaken: 0}
                }
                if (userOBJArray[0].value === 'RJB') {
                    data = {user: userOBJArray[0].id, damageTaken: 2}
                }
                if (userOBJArray[0].value === 'RHB') {
                    data = {user: userOBJArray[0].id, damageTaken: 3}
                }
                break;
            case 'RJ':
                if (userOBJArray[0].value === 'LHB') {
                    data = {user: userOBJArray[0].id, damageTaken: 3}
                }
                if (userOBJArray[0].value === 'LJB') {
                    data = {user: userOBJArray[0].id, damageTaken: 2}
                }
                if (userOBJArray[0].value === 'RJB') {
                    data = {user: userOBJArray[0].id, damageTaken: 0}
                }
                if (userOBJArray[0].value === 'RHB') {
                    data = {user: userOBJArray[0].id, damageTaken: 1}
                }
                break;
            case 'RH':
                if (userOBJArray[0].value === 'LHB') {
                    data = {user: userOBJArray[0].id, damageTaken: 3}
                }
                if (userOBJArray[0].value === 'LJB') {
                    data = {user: userOBJArray[0].id, damageTaken: 2}
                }
                if (userOBJArray[0].value === 'RJB') {
                    data = {user: userOBJArray[0].id, damageTaken: 1}
                }
                if (userOBJArray[0].value === 'RHB') {
                    data = {user: userOBJArray[0].id, damageTaken: 0}
                }
                break;
        }
    }
    return data;
};


module.exports = {gamePlayLogic};