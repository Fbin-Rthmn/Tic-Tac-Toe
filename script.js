let fields = [
    'x',
    null,
    null,
    null,
    'o',
    null,
    null,
    null,
    null,
];


function init() {
    render();
}


function render() {
    let contentDiv = document.getElementById('content');
    contentDiv.innerHTML = generateTableHTML();
}


function generateTableHTML() {
    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            tableHTML += `<td>${fields[index] || ''}</td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    return tableHTML;
}

