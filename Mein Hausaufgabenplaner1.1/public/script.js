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

    let task = {
        fach,
        aufgabe,
        datum,
        notizen,
        erledigt: false // Initialer Erledigt-Status ist false
    };

    fetch('/tasks/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Aufgabe hinzugefügt:', data);
        addTaskToTable(data); // Funktion zum Hinzufügen der Aufgabe zur Tabelle aufrufen
    })
    .catch(error => {
        console.error('Fehler beim Hinzufügen der Aufgabe:', error);
    });

    document.getElementById('inputFach').value = '';
    document.getElementById('inputAufgabe').value = '';
    document.getElementById('inputDatum').value = '';
    document.getElementById('inputNotizen').value = '';
}

function addTaskToTable(task) {
    let table = document.getElementById('hausaufgabenListe');
    let newRow = table.insertRow();

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    let cell6 = newRow.insertCell(5);

    cell1.innerHTML = `<input type="text" value="${task.fach}" readonly />`;
    cell2.innerHTML = `<input type="text" value="${task.aufgabe}" readonly />`;
    cell3.innerHTML = `<input type="date" value="${task.datum}" readonly />`;
    cell4.innerHTML = `<input type="checkbox" onchange="toggleComplete(this)" data-fach="${task.fach}" data-aufgabe="${task.aufgabe}" ${task.erledigt ? 'checked' : ''} />`;
    cell5.innerHTML = `<input type="text" value="${task.notizen}" readonly />`;
    cell6.innerHTML = `<button class="deleteRow" onclick="deleteRow(this)" data-fach="${task.fach}" data-aufgabe="${task.aufgabe}">Löschen</button>`;
}

function toggleComplete(checkbox) {
    let fach = checkbox.dataset.fach;
    let aufgabe = checkbox.dataset.aufgabe;
    let erledigt = checkbox.checked;

    let task = {
        fach,
        aufgabe,
        erledigt
    };

    fetch('/tasks/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Aufgabe aktualisiert:', data);
    })
    .catch(error => {
        console.error('Fehler beim Aktualisieren der Aufgabe:', error);
    });
}

function deleteRow(button) {
    let fach = button.dataset.fach;
    let aufgabe = button.dataset.aufgabe;

    fetch(`/tasks/delete?fach=${encodeURIComponent(fach)}&aufgabe=${encodeURIComponent(aufgabe)}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        button.closest('tr').remove();
        console.log('Aufgabe gelöscht:', data);
    })
    .catch(error => {
        console.error('Fehler beim Löschen der Aufgabe:', error);
    });
}

function loadTableData() {
    fetch('/tasks/all')
    .then(response => response.json())
    .then(data => {
        data.forEach(task => addTaskToTable(task));
    })
    .catch(error => {
        console.error('Fehler beim Laden der Aufgaben:', error);
    });
}
