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
        disableEditing(textbox, taskId, taskName) {
            this.isEditing = false;

            var value = JSON.parse(localStorage.getItem("todos"));
            var tasks = value.filter(function (data) {
                return data.id == taskId;
            });
            var task = tasks[0].text;
            textbox.addEventListener("blur", function (event) {
                if (textbox.value.trim() === "") {

                    textbox.parentNode.previousElementSibling.innerText = task;
                    textbox.value = task;
                }
            });
            localStorage.setItem("todos", JSON.stringify(this.todos));
        },
    };
}
function changeStatus(checkbox, taskId) {
    todos = JSON.parse(localStorage.getItem("todos"));
    if (checkbox.checked) {
        var value = this.todos.filter(function (todo) {
            return todo.id == taskId;
        });
        value[0].completed = true;
    } else {
        var value = this.todos.filter(function (todo) {
            return todo.id == taskId;
        });
        value[0].completed = false;
    }
    localStorage.setItem("todos", JSON.stringify(this.todos));
}
function getAll() {
    const all = JSON.parse(localStorage.getItem("todos"));
    this.todos = all;
}
function getActive() {
    const active = JSON.parse(localStorage.getItem("todos"));
    this.todos = active.filter((todo) => todo.completed != true);
}
function getCompleted() {
    const active = JSON.parse(localStorage.getItem("todos"));
    this.todos = active.filter((todo) => todo.completed != false);
}
function checkAll() {
    var checkboxes = document.querySelectorAll('.checkbox');
    var check = document.getElementById('btn_check');
    var labels = document.querySelectorAll('.task_name');
    var check = document.getElementById('btn_check');
    if (check.innerHTML == "Check All") {
        if (checkboxes.length > 0) {
            check.innerHTML = "Uncheck All";
        }
        for ($i = 0; $i < this.todos.length; $i++) {
            this.todos[$i].completed = true;
            checkboxes[$i].checked = true;
            labels[$i].classList.add('completed');
        }
    }
    else if (check.innerHTML == "Uncheck All") {
        check.innerHTML = "Check All";
        for ($i = 0; $i < this.todos.length; $i++) {
            this.todos[$i].completed = false;
            checkboxes[$i].checked = false;
            labels[$i].classList.remove('completed');
        }
    }
    localStorage.setItem("todos", JSON.stringify(this.todos));
}
function delteCompleted() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    this.todos = todos.filter(t => t.completed !== true);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    var check = document.getElementById('btn_check');
    check.innerHTML = "Check All";
}
