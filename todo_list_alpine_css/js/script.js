function data() {
    return {
        text: "Example text. Double click to edit",
        isEditing: false,
        updateTask() {
            this.isEditing = !this.isEditing;
            if (this.isEditing) {
                this.$nextTick(() => {
                    this.$refs.input.focus();
                });
            }
        },
        disableEditing() {
            this.isEditing = false;
        }
    };
}
function changeStatus(id){
    var todos = JSON.parse(localStorage.getItem("todos"));
    if(todos[id-1].completed == false){
        todos[id-1].completed = true;
    }
    else{
        todos[id-1].completed = false;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getAll(){
    const all = JSON.parse(localStorage.getItem("todos"));
    this.todos = all;
}
function getActive(){
    const active = JSON.parse(localStorage.getItem("todos"));
    this.todos = active.filter((todo) => todo.completed != true);
}
function getCompleted(){
    const active = JSON.parse(localStorage.getItem("todos"));
    this.todos = active.filter((todo) => todo.completed != false);
}
function checkAll() {
    var checkboxes = document.querySelectorAll('.checkbox');
    var check = document.getElementById('btn_check');
    var labels = document.querySelectorAll('.task_name');
    var todos = JSON.parse(localStorage.getItem("todos"));
    var check = document.getElementById('btn_check');
    if (check.innerHTML == "Check All") {
        if (checkboxes.length > 0) {
            check.innerHTML = "Uncheck All";
        }
        for ($i = 0; $i < todos.length; $i++) {
            todos[$i].completed = true;
            checkboxes[$i].checked = true;
            labels[$i].classList.add('completed');
        }
    }
    else if(check.innerHTML == "Uncheck All"){
        check.innerHTML = "Check All";
        for ($i = 0; $i < todos.length; $i++) {
            todos[$i].completed = false;
            checkboxes[$i].checked = false;
            labels[$i].classList.remove('completed');
        }
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}
function delteCompleted() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    this.todos = todos.filter(t => t.completed !== true);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    var check = document.getElementById('btn_check');
    check.innerHTML = "Check All";
}
