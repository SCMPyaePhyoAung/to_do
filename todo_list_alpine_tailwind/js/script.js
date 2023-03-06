function badId() {
    return (Math.random() * 100).toFixed(0);
}
function data() {
    return {
        isEditing: false,
        updateTask() {
            this.isEditing = !this.isEditing;
        },
        disableEditing() {
            this.isEditing = false;
        }
    };
}
var all = document.getElementById('all');
var active = document.getElementById('active');
var completed = document.getElementById('completed');
function showAll() {
    all.classList.remove('hide');
    active.classList.add('hide');
    completed.classList.add('hide');
}
function showActive() {
    all.classList.add('hide');
    active.classList.remove('hide');
    completed.classList.add('hide');
}
function showCompleted() {
    all.classList.add('hide');
    active.classList.add('hide');
    completed.classList.remove('hide');
}
function checkAll() {
    var checkboxes = document.querySelectorAll('.checkbox');
    var check = document.getElementById('btn_check');
    var labels = document.querySelectorAll('.task_name');
    var todos = JSON.parse(localStorage.getItem("todos"));
    var check = document.getElementById('btn_check');
    if (check.innerHTML == "Check All") {
        check.innerHTML = "Uncheck All";
        for ($i = 0; $i < todos.length; $i++) {
            todos[$i].completed = true;
            checkboxes[$i].checked = true;
            labels[$i].classList.add('completed');
        }
    }
    else {
        check.innerHTML = "Check All";
        for ($i = 0; $i < todos.length; $i++) {
            todos[$i].completed = false;
            checkboxes[$i].checked = false;
            labels[$i].classList.remove('completed');
        }
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}
