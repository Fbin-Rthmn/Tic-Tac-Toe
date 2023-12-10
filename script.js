let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = 'circle';

function init() {
    render();
}

function render() {
    let contentDiv = document.getElementById('content');
    contentDiv.innerHTML = generateTableHTML();
    checkForWinner();
}

function generateTableHTML() {
    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }
            tableHTML += `<td onclick="handleClick(${index})">${symbol}</td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    return tableHTML;
}

function handleClick(index) {
    if (!fields[index]) {
        fields[index] = currentPlayer;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        render();
    }
}


function checkForWinner() {
    const winLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertikal
        [0, 4, 8], [2, 4, 6]             // diagonal
    ];

    for (const line of winLines) {
        const [a, b, c] = line;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            removeClickEvent();
            break;
        }
    }
}


function removeClickEvent() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => cell.onclick = null);
}


function generateCircleSVG() {
    const svgHTML = /*html*/`
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" stroke="#00B0EF" stroke-width="10" fill="transparent">
                <animate attributeName="r" values="0;30" dur="250ms" begin="0s" fill="freeze" />
            </circle>
        </svg>
    `;
    return svgHTML;
}


function generateCrossSVG() {
    const svgHTML = /*html*/`
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="35" x2="70" y2="35" stroke="#FFC000" stroke-width="10" transform="rotate(45, 35, 35)">
                <animate attributeName="x2" values="0;70" dur="250ms" keyTimes="0;1" begin="0s" fill="freeze" calcMode="spline" keySplines="0.42 0 0.58 1"/>
            </line>
            <line x1="35" y1="0" x2="35" y2="70" stroke="#FFC000" stroke-width="10" transform="rotate(45, 35, 35)">
                <animate attributeName="y2" values="0;70" dur="250ms" keyTimes="0;1" begin="0s" fill="freeze" calcMode="spline" keySplines="0.42 0 0.58 1"/>
            </line>
        </svg>
    `;
    return svgHTML;
}