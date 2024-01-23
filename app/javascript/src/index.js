import $ from 'jquery';

import {
  indexTasks,
  postTask,
  destroyTask,
  completeTask,
  activateTask
} from "./requests.js";

function refreshTasks () {
indexTasks(function (response) {
  var htmlString = response.tasks.map(function(task) {
    return "<div class='col-10 mb-3 p-2 pe-0 border rounded task' data-id='" + task.id + "'> \
      " + task.content + "\
      </div><div class='col-2'><input type='checkbox' class='mark-complete' data-id='" + task.id + "'></input><button class='delete btn' data-id='" + task.id + "'>Delete</button></div>";
    });

    $("#tasks").html(htmlString);
  });

  $(document).on('change', ".mark-complete", function() {
    var theID = $(this).data("id");
    if($(this).is(":checked")) {
      completeTask($(this).data('id'), function() {
      $("div[data-id= "+theID+"]").addClass("completed");
    });
  } else {
    activateTask($(this).data('id'), function() {
      $("div[data-id= "+theID+"]").removeClass("completed");
    });
  }
});
}

$(document).ready(function () {
  refreshTasks();

  $(document).on("click", ".delete", function () {
    destroyTask($(this).data("id"), function() {
      refreshTasks();
    });
  });



  $(document).on('submit', '#create-task', function(e) {
    e.preventDefault();
    const content = $("#new-task-content").val();
    postTask(content, function() {
      refreshTasks();
      $("#new-task-content").val("");
    });
  });
});


