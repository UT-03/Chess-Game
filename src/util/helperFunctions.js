export const showKingsPath = (i, j, boardArray, showPathArray, setShowPathArray, setShowPath) => {
    let showPathArray$ = [...showPathArray];

    for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
            console.log(x, y)
            if (x < 0 || x > 7 || y < 0 || x > 7 || (x === i && y === j)) {
                console.log(x, y, " continue");
                continue;
            }

            if (boardArray[x][y] === 0) {
                console.log(x, y, " updated to 1");
                showPathArray$[x][y] = 1;
            }
            else if ((boardArray[x][y] !== 0) && (Math.floor(boardArray[x][y] / 10) !== (Math.floor(boardArray[i][j] / 10)))) {
                console.log(x, y, "updated to -1")
                showPathArray$[x][y] = -1;
            }
        }
    }

    setShowPathArray(() => showPathArray$);
    setShowPath(true);
    console.log(showPathArray)
}

export const showQueensPath = (i, j, boardArray, showPathArray, setShowPathArray, setShowPath) => {
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

    setShowPathArray(() => showPathArray$);
    setShowPath(true);
}

export const showBishopsPath = (i, j, boardArray, showPathArray, setShowPathArray, setShowPath) => {
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

    setShowPathArray(() => showPathArray$);
    setShowPath(true);
}

export const showKnightsPath = (i, j, boardArray, showPathArray, setShowPathArray, setShowPath) => {
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

    setShowPathArray(() => showPathArray$);
    setShowPath(true);
}

export const showRooksPath = (i, j, boardArray, showPathArray, setShowPathArray, setShowPath) => {
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

    setShowPathArray(() => showPathArray$);
    setShowPath(true);
}

export const showPawnsPath = (i, j, boardArray, showPathArray, setShowPathArray, setShowPath) => {
    // console.log("Pawn ", i, j);
    let showPathArray$ = [...showPathArray];

    let arr1, arr2;
    if (Math.floor(boardArray[i][j] / 10) === 1) {
        if (i === 6) {
            arr1 = [-1, -2];
            arr2 = [0, 0];
        }
        else {
            arr1 = [-1];
            arr2 = [0];
        }

        let k = 0, x, y;

        while (k < arr1.length) {
            x = i + arr1[k];
            y = j + arr2[k];

            if (boardArray[x][y] === 0 && x !== 0) {
                showPathArray$[x][y] = 1;
            }
            else if (boardArray[x][y] === 0 && x === 0) {
                showPathArray$[x][y] = 2;
            }
            else
                break;

            k++;
        }

        arr1 = [-1, -1];
        arr2 = [-1, 1];

        for (let z = 0; z < 2; z++) {
            x = i + arr1[z];
            y = j + arr2[z];

            if ((boardArray[x][y] !== 0) && (Math.floor(boardArray[x][y] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[x][y] = -1;
        }
    }
    else {
        if (i === 1) {
            arr1 = [1, 2];
            arr2 = [0, 0];
        }
        else {
            arr1 = [1];
            arr2 = [0];
        }

        let k = 0, x, y;

        while (k < arr1.length) {
            x = i + arr1[k];
            y = j + arr2[k];

            if (boardArray[x][y] === 0) {
                showPathArray$[x][y] = 1;
            }
            else if (boardArray[x][y] === 0 && x === 7) {
                showPathArray$[x][y] = 2;
            }
            else
                break;

            k++;
        }

        arr1 = [1, 1];
        arr2 = [-1, 1];

        for (let z = 0; z < 2; z++) {
            x = i + arr1[z];
            y = j + arr2[z];

            if ((boardArray[x][y] !== 0) && (Math.floor(boardArray[x][y] / 10) !== (Math.floor(boardArray[i][j] / 10))))
                showPathArray$[x][y] = -1;
        }
    }

    setShowPathArray(() => showPathArray$);
    setShowPath(true);
}