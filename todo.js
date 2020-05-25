const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function addTodo(e){
    const newToDo = todoInput.value.trim();

    if(newToDo===""){
        showAlert("danger","Lütfen bir ToDo giriniz.");
    }
    else{
        addTodoToUI(newToDo);
        addToDoStorage(newToDo);
        showAlert("success","ToDo başarıyla eklendi.");
    }
    addTodoToUI(newToDo);

    e.preventDefault();
}

function showAlert(type,message){
    const alert=document.createElement("div");

    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);
    
    //setTimeout
    setTimeout(function(){
        alert.remove();
    },3000);

}

function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteToDo);
}

 // string değeri list item olarak UI(arayüzüne) ekleyecek
function addTodoToUI(newToDo){  

    // List Item Oluşturma
   const listItem=document.createElement("li");

   //link Oluşturma
   const link= document.createElement("a");
   link.href="#";
   link.className="delete-item";
   link.innerHTML="<i class = 'fa fa-remove'></i>";

   listItem.className="list-group-item d-flex justify-content-between";


   // Text Node Ekleme

   listItem.appendChild(document.createTextNode(newToDo));
   listItem.appendChild(link);

   // Todo List'e ListItem'i ekleme
   todoList.appendChild(listItem);
   todoInput.value="";
}

function addToDoStorage(newToDo){
    let todos=getTodosFromStorage();
    todos.push(newToDo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

//Sayfa yenilense bile kayıtların tekrar arayüzde oluşması
function loadAllTodosToUI(){  
    let todos=getTodosFromStorage();
    todos.foreach(function(todo){
        addTodoToUI(todo);
    })
}

function deleteToDo(e){
 /*   console.log(e.target); //nereye bastığını gösterir */
 if(e.target.className==="fa fa-remove"){
     e.target.parentElement.parentElement.remove();
     deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
     showAlert("success","Todo başarıyla silindi.");
 }
}

function deleteTodoFromStorage(todo){
    let todos = getTodosFromStorage();
    todos.foreach(function(deletetodo){
        if(todo===deletetodo){
            todos.splice(index,1); //arrayden değer silme
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodosFromStorage(){ //Storages'mızdan bütün todoları alır
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}



