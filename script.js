// IIFE pour ne pas polluer l'espace global
(()=>{
    let baseSudoku = [
        [2, 1, 0, 3, 0, 9, 7, 0, 6],
        [0, 7, 0, 0, 8, 0, 3, 0, 0],
        [0, 4, 0, 0, 2, 0, 0, 0, 1],
        [0, 2, 1, 0, 3, 0, 9, 7, 0],
        [0, 0, 0, 0, 0, 4, 0, 0, 0],
        [3, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 0],
        [0, 0, 6, 0, 1, 0, 0, 0, 0],
        [4, 5, 0, 0, 0, 3, 0, 0, 0]
    ];

    function app(){
        generateSudokuView();
        // generateSudokuValue();
        setValueOnView(baseSudoku);
        setKeyupListeners();
    }

    function generateSudokuView() {
        for (let i = 0; i < 9; i++)
            createRow(i);
    }
    function setValueOnView(sudoku) {
        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++)
                document.getElementById(i + "-" + j).innerText = sudoku[i][j]!=0 ? sudoku[i][j]: '';
    }

    function setKeyupListeners(){
        document.getElementById('app').addEventListener('keyup', checkAndColorize);
    }

    function checkAndColorize(){
        let sudoku = getSudoku();
        let bad = checkSudoku(sudoku);
        colorize(bad);
    }

    function checkSudoku(sudoku){
        let bad = checkHorizontal(sudoku)
            .concat(checkVertical(sudoku))
            .concat(checkQuadrant(sudoku));
        return bad;
    }

    function createRow(i) {
        let row = document.createElement('tr');
        for (let j = 0; j < 9; j++)
            row.appendChild(createCell(i, j));
        document.getElementById('app').appendChild(row);
    }

    function createCell(i,j) {
        let cell = document.createElement('td');
        cell.setAttribute('id', i + '-' + j);
        cell.setAttribute('class', 'cell');
        cell.setAttribute('contenteditable', 'true');
        cell.innerText = ' ';
        return cell;
    }

    function getSudoku(){
        let sudoku = [];
        for (let i = 0; i < 9; i++)
            getRowOnArray(sudoku,i);
        return sudoku;
    }

    function getRowOnArray(sudoku,i){
        sudoku[i] = [];
        for (let j = 0; j < 9; j++)
            getCellOnArray(sudoku, i, j);
    }

    function getCellOnArray(sudoku,i,j){
        sudoku[i][j] = getCellValue(i,j);
        if (isValidCell(sudoku[i][j])) {
            sudoku[i][j] = 0;
            document.getElementById(i + '-' + j).innerText = '';
        }
    }

    function getCellValue(i,j){
        return parseInt(document.getElementById(i + '-' + j).innerText);
    }

    function isValidCell(cellValue){
        return isNaN(cellValue) || cellValue < 1 || cellValue > 10;
    }

    function checkHorizontal(sudoku) {
        bad = [];
        for (let i = 0; i < 9; i++) {
            let numbers = [];
            for (let j = 0; j < 9; j++)
                checkCell(numbers, bad, sudoku[i][j],i,j);
        }
        return bad;
    }

    function checkVertical(sudoku) {
        bad = [];
        for (let i = 0; i < 9; i++) {
            let numbers = [];
            for (let j = 0; j < 9; j++)
                checkCell(numbers, bad, sudoku[j][i],j,i);
        }
        return bad;
    }

    function checkQuadrant(sudoku) {
        bad = [];
        doForEachQuadrant((i,j) => {
            let numbers = [];
            doForEachCellInQuadrant((k,l) => {
                checkCell(numbers, bad, sudoku[i + k][j + l],i + k,j + l);
            });
        });
        return bad;
    }

    function doForEachQuadrant(cb){
        for (let i = 0; i < 9; i += 3)
            for (let j = 0; j < 9; j += 3)
                cb(i,j);
    }

    function doForEachCellInQuadrant(cb){
        for (let k = 0; k < 3; k++)
            for (let l = 0; l < 3; l++) 
                cb(k,l);
    }

    function checkCell(numbers, bad, cellValue,i,j){
        otherCell = numbers.find(e => e.value == cellValue)
        if ( otherCell && cellValue != 0) {
            bad.push(i + '-' + j);
            if (!numbers.find(e => e.value == cellValue && e.x == i && e.y == j))
                bad.push(otherCell.x + '-' + otherCell.y);
            numbers.push({x : i, y : j, value : cellValue});
        } else {
            numbers.push({x: i, y: j, value: cellValue});
        }
    }
    
    function setGood(i, j) {
        let cell = document.getElementById(i + '-' + j);
        cell.setAttribute('class', 'cell');
    }
    
    function setBad(i, j) {
        let cell = document.getElementById(i + '-' + j);
        cell.setAttribute('class', 'cell bad');
    }
    
    function colorize(bad) {
        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++)
                setColorOnCell(bad, i, j);
    }

    function setColorOnCell(bad,i,j){
        if (bad.includes(i + "-" +j))
            setBad(i, j);
        else
            setGood(i, j);
    }

    app();

    // pas eu le temps de faire la génération du sudoku

    // function generateSudokuValue() {
    //     let sudoku = [];

    //     for (let i = 0; i < 9; i++) {
    //         sudoku[i] = [];
    //         for (let j = 0; j < 9; j++) 
    //         sudoku[i][j] = 0;
    //     }
        
    //     for (let i = 0; i < 3; i++)
    //         createQuadrant(sudoku, i, i);
        
    //     placeQuadrant(sudoku, 0, 1);
    //     placeQuadrant(sudoku, 0, 2);
    //     placeQuadrant(sudoku, 1, 0);
    //     placeQuadrant(sudoku, 2, 0);

    //     for (let i = 0; i < 30; i++) {
    //         randX = Math.floor(Math.random() * 9);
    //         randY = Math.floor(Math.random() * 9);
    //         sudoku[randX][randY] = 0;
    //     }

    //     setValueOnView(sudoku);
    // }

    // function createQuadrant(sudoku, BlockNumberX, BlockNumberY) {
    //     let quadrant = [];
    //     for (let i = 0; i < 9; i++) {
    //         let rand = Math.floor(Math.random() * 9) + 1;
    //         while (quadrant.includes(rand))
    //             rand = Math.floor(Math.random() * 9) + 1;
    //         quadrant[i] = rand;
    //     }
    //     let returnQuadrant = [];

    //     for (let i = 0; i < 3; i++) {
    //         returnQuadrant[i] = [];
    //         for (let j = 0; j < 3; j++) {
    //             returnQuadrant[i][j] = quadrant[i * 3 + j];
    //             sudoku[BlockNumberX * 3 + i][BlockNumberY * 3 + j] = returnQuadrant[i][j];
    //         }
    //     }
        
    //     return returnQuadrant;
    // }

    // function placeQuadrant(sudoku, x, y) {
    //     do {
    //         createQuadrant(sudoku, x, y);
    //     }
    //     while (checkSudoku(sudoku).length > 0);
    // }

    
})()