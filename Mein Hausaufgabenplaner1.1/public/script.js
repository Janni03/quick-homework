
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
 
}


