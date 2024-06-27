document.addEventListener('DOMContentLoaded', (event) => {
    loadTableData();
});

function addRow() {
    let fach = document.getElementById('inputFach').value;
    let aufgabe = document.getElementById('inputAufgabe').value;
    let datum = document.getElementById('inputDatum').value;
    let notizen = document.getElementById('inputNotizen').value;

    if (fach === '' || aufgabe === '' || datum === '' || notizen === '') {
        alert('Bitte fülle alle Felder aus.');
        return;
    }

    let table = document.getElementById('hausaufgabenListe');
    let newRow = table.insertRow();

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    let cell6 = newRow.insertCell(5);

    cell1.innerHTML = `<input type="text" value="${fach}" readonly />`;
    cell2.innerHTML = `<input type="text" value="${aufgabe}" readonly />`;
    cell3.innerHTML = `<input type="date" value="${datum}" readonly />`;
    cell4.innerHTML = 'erledigt <input type="checkbox" />';
    cell5.innerHTML = `<input type="text" value="${notizen}" readonly />`;
    cell6.innerHTML = `<button class="deleteRow" onclick="deleteRow(this)">Löschen</button>`;

    saveTableData();

    document.getElementById('inputFach').value = '';
    document.getElementById('inputAufgabe').value = '';
    document.getElementById('inputDatum').value = '';
    document.getElementById('inputNotizen').value = '';
}

function deleteRow(button) {
    let row = button.closest('tr');
    row.parentNode.removeChild(row);
    saveTableData();
}

function saveTableData() {
    let table = document.getElementById('hausaufgabenListe');
    let rows = table.rows;
    let data = [];

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].cells;
        let rowData = {
            fach: cells[0].querySelector('input').value,
            aufgabe: cells[1].querySelector('input').value,
            datum: cells[2].querySelector('input').value,
            notizen: cells[4].querySelector('input').value
        };
        data.push(rowData);
    }

    localStorage.setItem('hausaufgabenListe', JSON.stringify(data));
}

function loadTableData() {
    let data = JSON.parse(localStorage.getItem('hausaufgabenListe'));
    if (data) {
        let table = document.getElementById('hausaufgabenListe');
        data.forEach(rowData => {
            let newRow = table.insertRow();

            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);
            let cell3 = newRow.insertCell(2);
            let cell4 = newRow.insertCell(3);
            let cell5 = newRow.insertCell(4);
            let cell6 = newRow.insertCell(5);

            cell1.innerHTML = `<input type="text" value="${rowData.fach}" readonly />`;
            cell2.innerHTML = `<input type="text" value="${rowData.aufgabe}" readonly />`;
            cell3.innerHTML = `<input type="date" value="${rowData.datum}" readonly />`;
            cell4.innerHTML = 'erledigt <input type="checkbox" />';
            cell5.innerHTML = `<input type="text" value="${rowData.notizen}" readonly />`;
            cell6.innerHTML = `<button class="deleteRow" onclick="deleteRow(this)">Löschen</button>`;
        });
    }
}
