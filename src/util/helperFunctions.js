const isInBounds = (x, y) => {
    if (x >= 0 && x <= 7 && y >= 0 && y <= 7)
        return true;
    else
        return false;
}

export const getKingPosition = (player, boardArray) => {
    const kingId = player * 10 + 1;
    for (let i = 0; i <= 7; i++) {
        for (let j = 0; j <= 7; j++) {
            if (boardArray[i][j] === kingId)
                return { i, j }
        }
    }
}

const findPathFuncs = (param, x, y, boardArray) => {
    const showPathArray = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    switch (param) {
        case 1:
            return findKingsPath(x, y, boardArray, showPathArray);
        case 2:
            return findQueensPath(x, y, boardArray, showPathArray);
        case 3:
            return findBishopsPath(x, y, boardArray, showPathArray);
        case 4:
            return findKnightsPath(x, y, boardArray, showPathArray);
        case 5:
            return findRooksPath(x, y, boardArray, showPathArray);
        case 6:
            return findPawnsPath(x, y, boardArray, showPathArray);
    }
}

export const isPlayerCheckmated = (player, boardArray) => {
    let isPlayerCheckmated = true;

    for (let l = 0; l <= 7 && isPlayerCheckmated; l++) {
        for (let m = 0; m <= 7 && isPlayerCheckmated; m++) {
            if (Math.floor(boardArray[l][m] / 10) === player) {
                let showPathArray$ = findPathFuncs(Math.floor(boardArray[l][m] % 10), l, m, boardArray)

                for (let p = 0; p <= 7 && isPlayerCheckmated; p++) {
                    for (let q = 0; q <= 7 && isPlayerCheckmated; q++) {
                        if (showPathArray$[p][q] !== 0)
                            isPlayerCheckmated = false;
                    }
                }
            }
        }
    }
    return isPlayerCheckmated;
}

export const isKingSafe = (i, j, boardArray) => {
    const currentPlayer = Math.floor(boardArray[i][j] / 10);
    let isKingSafe$ = true;

    // checking top-left
    let x = i - 1, y = j - 1;
    while (x >= 0 && y >= 0 && isKingSafe$) {
        const positionPlayer = Math.floor(boardArray[x][y] / 10);
        const positionPiece = Math.floor(boardArray[x][y] % 10);

        if (boardArray[x][y] !== 0) {
            if (positionPlayer !== currentPlayer && (positionPiece === 2 || positionPiece === 3))
                isKingSafe$ = false;

            break;
        }

        x--;
        y--;
    }

    // checking top
    x = i - 1;
    y = j;
    while (x >= 0 && isKingSafe$) {
        const positionPlayer = Math.floor(boardArray[x][y] / 10);
        const positionPiece = Math.floor(boardArray[x][y] % 10);

        if (boardArray[x][y] !== 0) {
            if (positionPlayer !== currentPlayer && (positionPiece === 2 || positionPiece === 5))
                isKingSafe$ = false;

            break;
        }

        x--;
    }

    // checking top-right
    x = i - 1;
    y = j + 1;
    while (x >= 0 && y <= 7 && isKingSafe$) {
        const positionPlayer = Math.floor(boardArray[x][y] / 10);
        const positionPiece = Math.floor(boardArray[x][y] % 10);

        if (boardArray[x][y] !== 0) {
            if (positionPlayer !== currentPlayer && (positionPiece === 2 || positionPiece === 3))
                isKingSafe$ = false;

            break;
        }

        x--;
        y++;
    }

    // checking right
    x = i;
    y = j + 1;
    while (y <= 7 && isKingSafe$) {
        const positionPlayer = Math.floor(boardArray[x][y] / 10);
        const positionPiece = Math.floor(boardArray[x][y] % 10);

        if (boardArray[x][y] !== 0) {
            if (positionPlayer !== currentPlayer && (positionPiece === 2 || positionPiece === 5))
                isKingSafe$ = false;

            break;
        }

        y++;
    }

    // checking bottom-right
    x = i + 1;
    y = j + 1;
    while (x <= 7 && y <= 7 && isKingSafe$) {
        const positionPlayer = Math.floor(boardArray[x][y] / 10);
        const positionPiece = Math.floor(boardArray[x][y] % 10);

        if (boardArray[x][y] !== 0) {
            if (positionPlayer !== currentPlayer && (positionPiece === 2 || positionPiece === 3))
                isKingSafe$ = false;

            break;
        }

        x++;
        y++;
    }

    // checking bottom
    x = i + 1;
    y = j;
    while (x <= 7 && isKingSafe$) {
        const positionPlayer = Math.floor(boardArray[x][y] / 10);
        const positionPiece = Math.floor(boardArray[x][y] % 10);

        if (boardArray[x][y] !== 0) {
            if (positionPlayer !== currentPlayer && (positionPiece === 2 || positionPiece === 5))
                isKingSafe$ = false;

            break;
        }

        x++;
    }

    // checking bottom-left
    x = i + 1;
    y = j - 1;
    while (x <= 7 && y >= 0 && isKingSafe$) {
        const positionPlayer = Math.floor(boardArray[x][y] / 10);
        const positionPiece = Math.floor(boardArray[x][y] % 10);

        if (boardArray[x][y] !== 0) {
            if (positionPlayer !== currentPlayer && (positionPiece === 2 || positionPiece === 3))
                isKingSafe$ = false;

            break;
        }

        x++;
        y--;
    }

    // checking-left
    x = i;
    y = j - 1;
    while (y >= 0) {
        const positionPlayer = Math.floor(boardArray[x][y] / 10);
        const positionPiece = Math.floor(boardArray[x][y] % 10);

        if (boardArray[x][y] !== 0) {
            if (positionPlayer !== currentPlayer && (positionPiece === 2 || positionPiece === 5))
                isKingSafe$ = false;

            break;
        }

        y--;
    }

    // checking for knights
    let potentialThreats = [[-1, -2], [1, -2], [-2, -1], [-2, 1], [-1, 2], [1, 2], [2, -1], [2, 1]]
        .filter(arr => {
            if (isInBounds(i + arr[0], j + arr[1]))
                return true;
            else
                return false;
        })
        .map(arr => {
            return {
                row: i + arr[0],
                col: j + arr[1]
            }
        });

    x = 0;
    while (x < potentialThreats.length && isKingSafe$) {
        const { row, col } = potentialThreats[x];

        const positionPlayer = Math.floor(boardArray[row][col] / 10);
        const positionPiece = Math.floor(boardArray[row][col] % 10);

        if (positionPlayer !== currentPlayer && positionPiece === 4)
            isKingSafe$ = false;

        x++;
    }

    // checking for rival king
    potentialThreats = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]
        .filter(arr => {
            if (isInBounds(i + arr[0], j + arr[1]))
                return true;
            else
                return false;
        })
        .map(arr => {
            return {
                row: i + arr[0],
                col: j + arr[1]
            }
        });

    x = 0;
    while (x < potentialThreats.length && isKingSafe$) {
        const { row, col } = potentialThreats[x];

        const positionPlayer = Math.floor(boardArray[row][col] / 10);
        const positionPiece = Math.floor(boardArray[row][col] % 10);

        if (positionPlayer !== currentPlayer && positionPiece === 1)
            isKingSafe$ = false;

        x++;
    }

    // checking for rival pawns
    if (isKingSafe$) {
        if (currentPlayer === 1) {
            potentialThreats = [[-1, -1], [-1, 1]]
                .filter(arr => {
                    if (isInBounds(i + arr[0], j + arr[1]))
                        return true;
                    else
                        return false;
                })
                .map(arr => {
                    return {
                        row: i + arr[0],
                        col: j + arr[1]
                    }
                });

            x = 0;
            while (x < potentialThreats.length && isKingSafe$) {
                const { row, col } = potentialThreats[x];

                const positionPlayer = Math.floor(boardArray[row][col] / 10);
                const positionPiece = Math.floor(boardArray[row][col] % 10);

                if (positionPlayer === 2 && positionPiece === 6)
                    isKingSafe$ = false;

                x++;
            }
        }
        else {
            potentialThreats = [[1, -1], [1, 1]]
                .filter(arr => {
                    if (isInBounds(i + arr[0], j + arr[1]))
                        return true;
                    else
                        return false;
                })
                .map(arr => {
                    return {
                        row: i + arr[0],
                        col: j + arr[1]
                    }
                });

            x = 0;
            while (x < potentialThreats.length && isKingSafe$) {
                const { row, col } = potentialThreats[x];

                const positionPlayer = Math.floor(boardArray[row][col] / 10);
                const positionPiece = Math.floor(boardArray[row][col] % 10);

                if (positionPlayer === 1 && positionPiece === 6)
                    isKingSafe$ = false;

                x++;
            }
        }
    }

    return isKingSafe$;
}

const isKingSafeAfterTheMoves = (x, y, boardArray, showPathArray) => {
    let boardArray$;
    const currentPlayer = Math.floor(boardArray[x][y] / 10);

    let potentialMoves = [];
    for (let l = 0; l <= 7; l++) {
        for (let m = 0; m <= 7; m++) {
            if (showPathArray[l][m] === 1 || showPathArray[l][m] === 2 || showPathArray[l][m] === -1)
                potentialMoves.push({
                    row: l,
                    col: m
                });
        }
    }

    potentialMoves.forEach(move => {
        boardArray$ = [...boardArray];
        let temp = boardArray$[move.row][move.col];
        boardArray$[move.row][move.col] = boardArray$[x][y];
        boardArray$[x][y] = 0;

        let { i, j } = getKingPosition(currentPlayer, boardArray$);
        if (!isKingSafe(i, j, boardArray$))
            showPathArray[move.row][move.col] = 0;

        boardArray$[x][y] = boardArray$[move.row][move.col];
        boardArray$[move.row][move.col] = temp;
    })
}

export const findKingsPath = (i, j, boardArray, showPathArray) => {
    let showPathArray$ = [...showPathArray];

    for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
            if (!isInBounds(x, y) || (x === i && y === j)) {
                continue;
            }

            if (boardArray[x][y] === 0) {
                showPathArray$[x][y] = 1;
            }
            else if ((boardArray[x][y] !== 0) && (Math.floor(boardArray[x][y] / 10) !== (Math.floor(boardArray[i][j] / 10)))) {
                showPathArray$[x][y] = -1;
            }
        }
    }

    isKingSafeAfterTheMoves(i, j, boardArray, showPathArray$);

    return showPathArray$;
}

export const findQueensPath = (i, j, boardArray, showPathArray) => {
    let showPathArray$ = [...showPathArray];
    let x = i - 1, y = j + 1;
    while (x >= 0 && y <= 7) {
        if (boardArray[x][y] === 0)
            showPathArray$[x][y] = 1;
        else {
            if ((boardArray[x][y] !== 0) && (Math.floor(boardArray[x][y] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[x][y] = -1;
            break;
        }

        x--;
        y++;
    }

    x = i - 1;
    y = j - 1;
    while (x >= 0 && y >= 0) {
        if (boardArray[x][y] === 0)
            showPathArray$[x][y] = 1;
        else {
            if ((boardArray[x][y] !== 0) && (Math.floor(boardArray[x][y] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[x][y] = -1;
            break;
        }

        x--;
        y--;
    }

    x = i + 1;
    y = j + 1;
    while (x <= 7 && y <= 7) {
        if (boardArray[x][y] === 0)
            showPathArray$[x][y] = 1;
        else {
            if ((boardArray[x][y] !== 0) && (Math.floor(boardArray[x][y] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[x][y] = -1;
            break;
        }

        x++;
        y++;
    }

    x = i + 1;
    y = j - 1;
    while (x <= 7 && y >= 0) {
        if (boardArray[x][y] === 0)
            showPathArray$[x][y] = 1;
        else {
            if ((boardArray[x][y] !== 0) && (Math.floor(boardArray[x][y] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[x][y] = -1;
            break;
        }

        x++;
        y--;
    }

    x = i - 1;
    while (x >= 0) {
        if (boardArray[x][j] === 0)
            showPathArray$[x][j] = 1;
        else {
            if ((boardArray[x][j] !== 0) && (Math.floor(boardArray[x][j] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[x][j] = -1;
            break;
        }

        x--;
    }

    x = i + 1;
    while (x <= 7) {
        if (boardArray[x][j] === 0)
            showPathArray$[x][j] = 1;
        else {
            if ((boardArray[x][j] !== 0) && (Math.floor(boardArray[x][j] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[x][j] = -1;
            break;
        }

        x++;
    }

    y = j - 1;
    while (y >= 0) {
        if (boardArray[i][y] === 0)
            showPathArray$[i][y] = 1;
        else {
            if ((boardArray[i][y] !== 0) && (Math.floor(boardArray[i][y] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[i][y] = -1;
            break;
        }

        y--;
    }

    y = j + 1;
    while (y <= 7) {
        if (boardArray[i][y] === 0)
            showPathArray$[i][y] = 1;
        else {
            if ((boardArray[i][y] !== 0) && (Math.floor(boardArray[i][y] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[i][y] = -1;
            break;
        }

        y++;
    }

    isKingSafeAfterTheMoves(i, j, boardArray, showPathArray$);

    return showPathArray$;
}

export const findBishopsPath = (i, j, boardArray, showPathArray) => {
    let showPathArray$ = [...showPathArray];
    let x = i - 1, y = j + 1;
    while (x >= 0 && y <= 7) {
        if (boardArray[x][y] === 0)
            showPathArray$[x][y] = 1;
        else {
            if ((boardArray[x][y] !== 0) && (Math.floor(boardArray[x][y] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[x][y] = -1;
            break;
        }

        x--;
        y++;
    }

    x = i - 1;
    y = j - 1;
    while (x >= 0 && y >= 0) {
        if (boardArray[x][y] === 0)
            showPathArray$[x][y] = 1;
        else {
            if ((boardArray[x][y] !== 0) && (Math.floor(boardArray[x][y] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[x][y] = -1;
            break;
        }

        x--;
        y--;
    }

    x = i + 1;
    y = j + 1;
    while (x <= 7 && y <= 7) {
        if (boardArray[x][y] === 0)
            showPathArray$[x][y] = 1;
        else {
            if ((boardArray[x][y] !== 0) && (Math.floor(boardArray[x][y] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[x][y] = -1;
            break;
        }

        x++;
        y++;
    }

    x = i + 1;
    y = j - 1;
    while (x <= 7 && y >= 0) {
        if (boardArray[x][y] === 0)
            showPathArray$[x][y] = 1;
        else {
            if ((boardArray[x][y] !== 0) && (Math.floor(boardArray[x][y] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[x][y] = -1;
            break;
        }

        x++;
        y--;
    }

    isKingSafeAfterTheMoves(i, j, boardArray, showPathArray$);

    return showPathArray$;
}

export const findKnightsPath = (i, j, boardArray, showPathArray) => {
    let showPathArray$ = [...showPathArray];

    let arr1 = [-2, -2, -1, 1, 2, 2, -1, 1];
    let arr2 = [-1, 1, 2, 2, -1, 1, -2, -2];

    let x, y;

    for (let z = 0; z <= 7; z++) {
        x = i + arr1[z];
        y = j + arr2[z];
        if (x < 0 || x > 7 || y < 0 || y > 7)
            continue;

        if (boardArray[x][y] === 0)
            showPathArray$[x][y] = 1;
        else {
            if ((boardArray[x][y] !== 0) && (Math.floor(boardArray[x][y] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[x][y] = -1;
        }
    }

    isKingSafeAfterTheMoves(i, j, boardArray, showPathArray$);

    return showPathArray$;
}

export const findRooksPath = (i, j, boardArray, showPathArray) => {
    let showPathArray$ = [...showPathArray];

    let x = i - 1;
    while (x >= 0) {
        if (boardArray[x][j] === 0)
            showPathArray$[x][j] = 1;
        else {
            if ((boardArray[x][j] !== 0) && (Math.floor(boardArray[x][j] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[x][j] = -1;
            break;
        }

        x--;
    }

    x = i + 1;
    while (x <= 7) {
        if (boardArray[x][j] === 0)
            showPathArray$[x][j] = 1;
        else {
            if ((boardArray[x][j] !== 0) && (Math.floor(boardArray[x][j] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[x][j] = -1;
            break;
        }

        x++;
    }

    let y = j - 1;
    while (y >= 0) {
        if (boardArray[i][y] === 0)
            showPathArray$[i][y] = 1;
        else {
            if ((boardArray[i][y] !== 0) && (Math.floor(boardArray[i][y] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[i][y] = -1;
            break;
        }

        y--;
    }

    y = j + 1;
    while (y <= 7) {
        if (boardArray[i][y] === 0)
            showPathArray$[i][y] = 1;
        else {
            if ((boardArray[i][y] !== 0) && (Math.floor(boardArray[i][y] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[i][y] = -1;
            break;
        }

        y++;
    }

    isKingSafeAfterTheMoves(i, j, boardArray, showPathArray$);

    return showPathArray$;
}

export const findPawnsPath = (i, j, boardArray, showPathArray) => {
    let showPathArray$ = [...showPathArray];

    let arr1, arr2;
    if (Math.floor(boardArray[i][j] / 10) === 1) {  //  If the piece is white
        if (i === 6) {  //  If it is first move
            arr1 = [-1, -2];
            arr2 = [0, 0];
        }
        else {  //  for other moves
            arr1 = [-1];
            arr2 = [0];
        }

        let k = 0, x, y;

        while (k < arr1.length) {
            x = i + arr1[k];
            y = j + arr2[k];

            if (boardArray[x][y] === 0 && x !== 0) {    //  If the position is empty and is not the end of board
                showPathArray$[x][y] = 1;
            }
            else if (boardArray[x][y] === 0 && x === 0) {   //  If position is empty and is the end of board
                showPathArray$[x][y] = 2;
            }
            else    //  If position is not empty
                break;

            k++;
        }

        // To check possible rival kills
        arr1 = [-1, -1];
        arr2 = [-1, 1];

        for (let z = 0; z < 2; z++) {
            x = i + arr1[z];
            y = j + arr2[z];

            if ((boardArray[x][y] !== 0) && Math.floor(boardArray[x][y] / 10) === 2) {  //  If position is empty and is occupied by a black piece
                if (x === 0)
                    showPathArray$[x][y] = 2;
                else
                    showPathArray$[x][y] = -1;
            }
        }
    }
    else {  //  If the piece is black
        if (i === 1) {  //  If it is first move
            arr1 = [1, 2];
            arr2 = [0, 0];
        }
        else {  //  for other moves
            arr1 = [1];
            arr2 = [0];
        }

        let k = 0, x, y;

        while (k < arr1.length) {
            x = i + arr1[k];
            y = j + arr2[k];

            if (boardArray[x][y] === 0 && x !== 7) {    //  If the position is empty and is not the end of board
                showPathArray$[x][y] = 1;
            }
            else if (boardArray[x][y] === 0 && x === 7) {   //  If the position is empty and is the end of board
                showPathArray$[x][y] = 2;
            }
            else    //  If the position is not empty
                break;

            k++;
        }

        //  To check possible rival kills
        arr1 = [1, 1];
        arr2 = [-1, 1];

        for (let z = 0; z < 2; z++) {
            x = i + arr1[z];
            y = j + arr2[z];

            if ((boardArray[x][y] !== 0) && Math.floor(boardArray[x][y] / 10) === 1)  //  If position is not empty and is occupied by a white piece
                if (x === 7)   //  If it is the end of board
                    showPathArray$[x][y] = 2;
                else    //  If not the end of board
                    showPathArray$[x][y] = -1;
        }
    }

    isKingSafeAfterTheMoves(i, j, boardArray, showPathArray$);

    return showPathArray$;
}