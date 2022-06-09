export const getSavedGames = () => {
    let savedGames = JSON.parse(localStorage.getItem('chessGames'));
    if (!savedGames) {
        savedGames = [
            {
                slot: 1,
                whitePlayerName: '',
                blackPlayerName: '',
                gameData: {
                    boardArray: [],
                    activePlayer: 0,
                    whiteKingPosition: null,
                    blackKingPosition: null,
                    isWhiteUnderCheck: null,
                    isBlackUnderCheck: null
                },
                isGameSavedinThisSlot: false
            },
            {
                slot: 2,
                whitePlayerName: '',
                blackPlayerName: '',
                gameData: {
                    boardArray: [],
                    activePlayer: 0,
                    whiteKingPosition: null,
                    blackKingPosition: null,
                    isWhiteUnderCheck: null,
                    isBlackUnderCheck: null
                },
                isGameSavedinThisSlot: false
            },
            {
                slot: 3,
                whitePlayerName: '',
                blackPlayerName: '',
                gameData: {
                    boardArray: [],
                    activePlayer: 0,
                    whiteKingPosition: null,
                    blackKingPosition: null,
                    isWhiteUnderCheck: null,
                    isBlackUnderCheck: null
                },
                isGameSavedinThisSlot: false
            },
            {
                slot: 4,
                whitePlayerName: '',
                blackPlayerName: '',
                gameData: {
                    boardArray: [],
                    activePlayer: 0,
                    whiteKingPosition: null,
                    blackKingPosition: null,
                    isWhiteUnderCheck: null,
                    isBlackUnderCheck: null
                },
                isGameSavedinThisSlot: false
            }
        ];
    }

    return savedGames;
}