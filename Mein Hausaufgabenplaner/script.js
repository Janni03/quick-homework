function addRow() {
 
    let fach = document.getElementById('inputFach').value;
    let aufgabe = document.getElementById('inputAufgabe').value;
    let datum = document.getElementById('inputDatum').value;


    if (fach === '' || aufgabe === '' || datum === '') {
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

    cell1.innerHTML = `<input type="text" value="${fach}" />`;
    cell2.innerHTML = `<input type="text" value="${aufgabe}" />`;
    cell3.innerHTML = `<input type="date" value="${datum}" />`;
    cell4.innerHTML = 'erledigt <input type="checkbox" />';
    cell5.innerHTML = `<input type="text" />`;

    document.getElementById('inputFach').value = '';
    document.getElementById('inputAufgabe').value = '';
    document.getElementById('inputDatum').value = '';
}

function deleteLastRow() {
    let table = document.getElementById('hausaufgabenListe');
    let rowCount = table.rows.length;
    if (rowCount > 0) {
        table.deleteRow(rowCount - 1);
    } else {
        alert('Keine Zeilen zum Löschen vorhanden.');
    }
}