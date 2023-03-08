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

function checkAll() {
    var checkboxes = document.querySelectorAll('.checkbox');
    var check = document.getElementById('btn_check');
    var labels = document.querySelectorAll('.task_name');
    var todos = JSON.parse(localStorage.getItem("todos"));
    var check = document.getElementById('btn_check');
    if (check.innerHTML == "Check All") {
        if (!checkboxes.length > 0) {
            alert("There is no task to check");
        }
        else {
            check.innerHTML = "Uncheck All";
        }
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
function delteCompleted() {
    todos = todos.filter(myTask => myTask.completed != true);
    localStorage.setItem("todos", JSON.stringify(todos));
}
