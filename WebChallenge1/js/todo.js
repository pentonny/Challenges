const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input"); 
const toDoList  = document.getElementById("todo-list");

const TODOS_KEY = "todos"

let toDos = [];

function saveTodos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deletToDo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveTodos();
}
function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const button = document.createElement("button");
    button.innerText = "X";
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    button.addEventListener("click", deletToDo);
    li.appendChild(button);
    li.appendChild(span);
    toDoList.appendChild(li);
}

function handleToDoSumit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value="";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveTodos();

}

toDoForm.addEventListener("submit", handleToDoSumit);

function sayHello(item){
    console.log("this is the turn of", item);
}

const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(savedToDos)
if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}