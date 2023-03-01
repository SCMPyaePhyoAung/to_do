const textInput = document.querySelector('.form-blk input');
const actionText = document.querySelector('.btn-group button');
filters = document.querySelectorAll(".filter-blk span");
taskBox = document.querySelector(".resultList");
var list = JSON.parse(localStorage.getItem("todo-list"));
var editId;
var isEditedTask = false;

// add data 
textInput.addEventListener("keyup", e => {
    var todoList = textInput.value.trim();
    if (e.key == "Enter" && todoList) {
        if (!isEditedTask) {
            if (!list) {
                list = [];
            }
            var task = { task: todoList, status: "pending" };
            list.push(task);
        } else {
            isEditedTask = false;
            list[editId].task = todoList;
        }

        textInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(list));
        showToDo("all");
        total();
    }
});
// to filt status 
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showToDo(btn.id);
    });
});
// to show list 
function showToDo(filter) {
    var li = "";
    var list = JSON.parse(localStorage.getItem("todo-list"));
    if (list) {
        list.forEach((todo, id) => {
            var isCompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                li += `<li class="clearfix">
                            <p class="list-blk">
                                <label for="${id}">
                                    <input type="checkbox" class="checkbox" id="${id}"  onclick="updateStatus(this)" ${isCompleted}>
                                    <span class="todo_list ${isCompleted}">${todo.task}</span>
                                </label>
                                <small class="edit" onclick="editTask(${id},'${todo.task}')">(edit)</small>
                                <b class="delete" onclick="deleteTask(${id})">x</b>
                            </p>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = li;
    total();
}

showToDo("all");
total();
// edit task list 
function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    textInput.value = taskName;

}
// delete task 
function deleteTask(taskId) {
    list.splice(taskId, 1);
    localStorage.setItem("todo-list", JSON.stringify(list));
    showToDo("all");
    total();
}
// check all
function checkAll() {
    const checkboxes = document.getElementsByClassName("checkbox");
    const task_list = document.getElementsByClassName("todo_list");

    var len = task_list.length;

    if (actionText.innerText == "Check All") {
        actionText.innerHTML = "Uncheck All";
        for ($i = 0; $i < len; $i++) {
            task_list[$i].classList.add("checked");
            checkboxes[$i].checked = true;
            list[$i].status = "completed";
        }
    }
    else {
        actionText.innerHTML = "Check All";
        for ($i = 0; $i < len; $i++) {
            task_list[$i].classList.remove("checked");
            checkboxes[$i].checked = false;
            list[$i].status = "pending";
        }
    }
    localStorage.setItem("todo-list", JSON.stringify(list));
    total();
}

// delete all complete task 
function deleteAllComplete() {
    var todelete = list.filter(todo => todo.status == "completed");
    list.splice(todelete, todelete.length);
    localStorage.setItem("todo-list", JSON.stringify(list));
    showToDo("all");
    total();
}
// update status 
function updateStatus(selectedTask) {
    var todoTask = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        todoTask.classList.add("checked");
        list[selectedTask.id].status = "completed";
    }
    else {
        todoTask.classList.remove("checked");
        list[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(list));
    total();
}
// to show complete total task list
function total() {
    var total_active = list.filter(todo => todo.status == "pending");
    var total = total_active.length;
    document.getElementById("total").innerText = total;
}
showToDo("all");
total();
