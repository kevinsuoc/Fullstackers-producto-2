// Source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event
import { changeTaskColumn } from './querisFr.js';
// HTML DOM Element, a task
let draggedTask = null;

// ondragstart event listener: sets dragged if a "task" is being drag
ondragstart = (event) => {  
    if (event.target.classList.contains("task"))
        draggedTask = event.target;
};

// ondragover event listener. If not present, the browser will default to doing nothing
ondragover = (event) => {
    event.preventDefault();
};

// ondrop event listener.
ondrop = (event) => {
    // Necessary to override browser default
    event.preventDefault();

    // DOM element variable
    let dropTarget = event.target;

    // Searchs the tree upwards until it finds a "task" or tasks column, "tasks".
    while (dropTarget && !(dropTarget.classList.contains("tasks") || dropTarget.classList.contains("task"))) {
        dropTarget = dropTarget.parentNode;
    }

    // If not found or it's the dragged element, exits
    if (!dropTarget || dropTarget === draggedTask) {
        return ;
    }

    // Remove from source and append above a task or at the end of the task list
    if (dropTarget.classList.contains("tasks")) {
        draggedTask.parentNode.removeChild(draggedTask);
        dropTarget.appendChild(draggedTask);
    } else if (dropTarget.classList.contains("task")) {
        draggedTask.parentNode.removeChild(draggedTask);
        dropTarget.insertAdjacentElement("beforebegin", draggedTask);
    }
    // console.log(dropTarget);
    const parentId = dropTarget.id;
    // console.log('ID del elemento padre:', parentId); 
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    // console.log(draggedTask);
    // console.log(dropTarget.id);

    moverLS(draggedTask.id, parentId);

    
    draggedTask = null;
};

async function moverLS(taskId, idColumnaTxt){
    const para = new URLSearchParams(window.location.search);
    const urlId = para.get('id');
    let idColumna=0;
    console.log('ID del tablero:', urlId);
    console.log('ID de la tarea:', taskId);
    
    if(idColumnaTxt=="todo-tasks"){
        idColumna=1;
    }else if(idColumnaTxt=="doing-tasks"){
        idColumna=2;
    }else if(idColumnaTxt=="done-tasks"){
        idColumna=3;
    }
    
    const result = await changeTaskColumn(urlId, taskId, idColumna);
    console.log(result);
    //se debe comprobar si devuelve un boolean o algo asi
}   