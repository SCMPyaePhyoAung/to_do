$(document).ready(function () {
    var list = JSON.parse(localStorage.getItem("task"));
    filters = document.querySelectorAll(".filter-blk span");
    // add list
    $("#todo-form").on("submit", function (e) {
        e.preventDefault();
        var input = $("#input").val();
        if (!list) {
            list = [];
        }
        var task = { task: input, status: "active" };
        list.push(task);
        localStorage.setItem("task", JSON.stringify(list));
        $("#input").val("");
        total();
    });
    // make complete
    $("ul").on("click", ".checkbox", function () {
        $(this).closest("li").find(".task_name").toggleClass("checked");
        $(this).closest("label").toggleClass("checked");

        var id = $(this).attr('id');
        if ($(this).closest("li").find("label").hasClass('checked')) {
            list[id].status = "completed";
        }
        else {
            list[id].status = "active";
        }
        localStorage.setItem("task", JSON.stringify(list));
        total();
    });
    // delete task list
    $("ul").on("click", ".delete", function () {
        $(this).closest("li").fadeOut(200);
        var taskId = $(this).val();
        list.splice(taskId, 1);
        localStorage.setItem("task", JSON.stringify(list));
        total();
    });
    // edit task list name
    $("ul").on("dblclick", ".task_name", function () {
        $(this).closest("li").find("input").attr("type", "text");
        $(this).closest("li").find("input").removeClass("checkbox");
        $(this).closest("li").find("input").addClass("edit_checkbox");
        $(this).hide();
        $(this).closest("li").find("button").hide();
    });
    // update task list name
    $("ul").on("blur", ".edit_checkbox", function () {
        $(this).closest("li").find("input").attr("type", "checkbox");
        $(this).closest("li").find("input").removeClass("edit_checkbox");
        $(this).closest("li").find("input").addClass("checkbox");
        $(this).closest("li").find("label").show();
        $(this).closest("li").find("button").show();
        var id = $(this).attr('id');
        list[id].task = $(this).val();
        localStorage.setItem("task", JSON.stringify(list));
    });
    // check all task list
    $("#btn-checkall").click(function () {
        $(".task_name").toggleClass("checked");
        var len = $('.task_name').length;
        if ($(this).text() == "Check All") {
            $(this).text("Uncheck All");
            for ($i = 0; $i < len; $i++) {
                $(".checkbox").attr("checked", true);
                list[$i].status = "completed";
            }
        }
        else {
            for ($i = 0; $i < len; $i++) {
                $(this).text("Check All");
                $(".checkbox").attr("checked", false);
                list[$i].status = "active";
            }
        }
        localStorage.setItem("task", JSON.stringify(list));
        total();
    });
    //delete all
    $("#btn-deleteall").click(function () {
        var list = JSON.parse(localStorage.getItem("task"));
        var todelete = list.filter(todo => todo.status == "completed");
        list.splice(todelete, todelete.length);
        localStorage.setItem("task", JSON.stringify(list));
        total();
    });
    // to filt status 
    $.each(filters, function (btn, btn) {
        btn.addEventListener("click", () => {
            document.querySelector("span.active").classList.remove("active");
            btn.classList.add("active");
            showData(btn.id);
        });
    });
    // show data function 
    function showData(filter) {
        var li = "";
        var list = JSON.parse(localStorage.getItem("task"));
        if (list) {
            $.each(list, function (id, todo) {
                var isCompleted = todo.status == "completed" ? "checked" : "";
                if (filter == todo.status || filter == "all") {
                    li += `<li class="clearfix">
                                    <p class="list-blk">
                                        <input type="checkbox" class="checkbox"  value="${todo.task}" id="${id}" ${isCompleted}><label class="${isCompleted} task_name">${todo.task}</label>
                                        <button class="delete" value="${id}">x</button>
                                    </p>
                                </li>`;
                }
            });
        }
        $('.resultList').append(li);
    }
    // to show complete total task list
    function total() {
        var todelete = list.filter(todo => todo.status == "active");
        var total = todelete.length;
        $('#total').text(total);
    }
    showData("all");
    total();
});
