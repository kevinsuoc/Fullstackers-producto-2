// INTERFAZ 3: Drag & Drop de tareas entre columnas
// INTERFAZ 3: Modificación dinámica de subelementos


import { updateTask } from './querisFr.js';
// Esta variable almacenará la tarea a editar
let taskToEdit = '';

function editTask(taskId) {
    
    taskToEdit = taskId;
    console.log("----------------------------------------------------")
    const taskElement = document.getElementById(taskId);
    
    // Rellenar el modal con los datos de la tarea
    document.getElementById('editTaskTitle').value = taskElement.querySelector('h5').innerText;
    document.getElementById('editTaskDescription').value = taskElement.querySelector('p').innerText;
    console.log(taskElement.querySelectorAll('p')[1].innerText);
    console.log(taskElement.querySelectorAll('p')[1].innerText.split(': ')[1])
    const rawDate = taskElement.querySelectorAll('p')[1].innerText.split(': ')[1];
    const [year, month, day] = rawDate.split('-');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    document.getElementById('editTaskDueDate').value = formattedDate;

    // document.getElementById('editTaskDueDate').value = taskElement.querySelectorAll('p')[1].innerText.split(': ')[1];
    document.getElementById('editTaskAssignee').value = taskElement.querySelectorAll('p')[2].innerText.split(': ')[1];
    
    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('editTaskModal'));
    modal.show();
}

window.editTask = editTask;
// // Evento para manejar la edición de la tarea
document.getElementById('editTaskForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir envío por defecto
    
    const taskElement = document.getElementById(taskToEdit);
    if (taskElement) {
        // Actualizar los valores de la tarea
        taskElement.querySelector('h5').innerText = document.getElementById('editTaskTitle').value;
        taskElement.querySelector('p').innerText = document.getElementById('editTaskDescription').value;
        taskElement.querySelectorAll('p')[1].innerText = `Fecha límite: ${document.getElementById('editTaskDueDate').value}`;
        taskElement.querySelectorAll('p')[2].innerText = `Responsable: ${document.getElementById('editTaskAssignee').value}`;
    }
    const para = new URLSearchParams(window.location.search);
    const urlId = para.get('id');
    updateTask(taskToEdit, urlId, document.getElementById('editTaskTitle').value, document.getElementById('editTaskDescription').value, document.getElementById('editTaskAssignee').value, document.getElementById('editTaskDueDate').value);

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editTaskModal'));
    modal.hide();
});
