/*
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

    // Daten an das Backend senden
    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fach, aufgabe, datum, notizen })
    })
    .then(response => response.json())
    .then(data => {
        // Die neue Aufgabe zur Tabelle hinzufügen
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

        document.getElementById('inputFach').value = '';
        document.getElementById('inputAufgabe').value = '';
        document.getElementById('inputDatum').value = '';
        document.getElementById('inputNotizen').value = '';
    })
    .catch(error => console.error('Error:', error));
}


function deleteRow(button) {
    let row = button.closest('tr');
    let cells = row.cells;
    let fach = cells[0].querySelector('input').value;
    let aufgabe = cells[1].querySelector('input').value;
    let datum = cells[2].querySelector('input').value;
    let notizen = cells[4].querySelector('input').value;

    // Daten an das Backend senden zum Löschen
    fetch('/tasks', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fach, aufgabe, datum, notizen })
    })
    .then(response => response.json())
    .then(data => {
        // Die Zeile aus der Tabelle entfernen
        row.parentNode.removeChild(row);
    })
    .catch(error => console.error('Error:', error));
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
    fetch('/tasks')
        .then(response => response.json())
        .then(data => {
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
        })
        .catch(error => console.error('Error:', error));
}
*/
document.addEventListener('DOMContentLoaded', () => {
    loadTableData();
});

async function loadTableData() {
    try {
        const response = await fetch('/tasks');
        const tasks = await response.json();
        const table = document.getElementById('hausaufgabenListe');
        tasks.forEach(task => {
            const newRow = table.insertRow();
            newRow.innerHTML = `
                <td><input type="text" value="${task.fach}" readonly /></td>
                <td><input type="text" value="${task.aufgabe}" readonly /></td>
                <td><input type="date" value="${task.datum}" readonly /></td>
                <td>erledigt <input type="checkbox" /></td>
                <td><input type="text" value="${task.notizen}" readonly /></td>
                <td><button class="deleteRow" onclick="deleteRow(this)">Löschen</button></td>
            `;
        });
    } catch (error) {
        console.error('Fehler beim Laden der Aufgaben:', error);
    }
}

async function addRow() {
    const fach = document.getElementById('inputFach').value;
    const aufgabe = document.getElementById('inputAufgabe').value;
    const datum = document.getElementById('inputDatum').value;
    const notizen = document.getElementById('inputNotizen').value;

    if (!fach || !aufgabe || !datum || !notizen) {
        alert('Bitte fülle alle Felder aus.');
        return;
    }

    const newTask = { fach, aufgabe, datum, notizen };

    try {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        });

        if (!response.ok) {
            throw new Error('Fehler beim Hinzufügen der Aufgabe');
        }

        const addedTask = await response.json();
        const table = document.getElementById('hausaufgabenListe');
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td><input type="text" value="${addedTask.fach}" readonly /></td>
            <td><input type="text" value="${addedTask.aufgabe}" readonly /></td>
            <td><input type="date" value="${addedTask.datum}" readonly /></td>
            <td>erledigt <input type="checkbox" /></td>
            <td><input type="text" value="${addedTask.notizen}" readonly /></td>
            <td><button class="deleteRow" onclick="deleteRow(this)">Löschen</button></td>
        `;

        document.getElementById('inputFach').value = '';
        document.getElementById('inputAufgabe').value = '';
        document.getElementById('inputDatum').value = '';
        document.getElementById('inputNotizen').value = '';
    } catch (error) {
        console.error('Fehler beim Hinzufügen der Aufgabe:', error);
    }
}

function deleteRow(button) {
    const row = button.closest('tr');
    row.parentNode.removeChild(row);
    // Hier kann auch ein Fetch-Aufruf hinzugefügt werden, um die Aufgabe auf dem Server zu löschen
}


