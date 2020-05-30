const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners(); 

function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteToDo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

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
    e.preventDefault();
}

function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);
    
    setTimeout(function(){
        alert.remove();
    },3000);
}

function addTodoToUI(newToDo){  

    // List Item Oluşturma
   const listItem=document.createElement("li");
   listItem.className="list-group-item d-flex justify-content-between";

   //link Oluşturma
   const link= document.createElement("a");
   link.href="#";
   link.className="delete-item";
   link.innerHTML="<i class = 'fa fa-remove'></i>";
   
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
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
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

function deleteToDo(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi.");
    }
   }

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo===deletetodo){
            todos.splice(index,1); //arrayden kaç adet değer silme
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function clearAllTodos(e){
    if(confirm("Tümünü silmek istediğine emin misiniz?")){
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    //geçiyorsa block geçmiyorsa none yapcaz
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text=listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)=== -1){
            listItem.setAttribute("style","display:none !important");
        }
        else{
            listItem.setAttribute("style","display:block");
        }
    })
}