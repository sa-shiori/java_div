/*--------------------------------
 * index.html用JS
 --------------------------------*/
document.write('<script type="text/javascript" src="/js/jQuery.countdownTimer.js"></script>');

$(function(){
    $("#timerView").countdowntimer({
        minutes :50,
        seconds :00,
        displayFormat : "MS",
        size : "xl",
        timeUp : taskFinish
    });
    $("#timerView").countdowntimer("stop", "stop");
    stopbtnOn();
});

/*--------------------------------
 * タスクを開始
 --------------------------------*/
 $('#startButton').on('click', taskStart);
 function taskStart(){
    startbtnOn();
    $("#timerView").countdowntimer("stop", "start");

    var form = $('#TaskForm').serializeArray();
    var formdata = {};
    jQuery.each(form, function(i, e) {
        formdata[e.name] = e.value;
    });

    $.ajax({
        url:'/',
        type:'POST',
        contentType : 'application/json; charset=utf-8',
        data: JSON.stringify(formdata)
    }).done( (data) => {
        console.log("success");
        console.log(data);
        $('#taskId').val(data);
    }).fail( (data) => {
        console.log("fail");
        console.log(data);
    });
}

/*--------------------------------
 * タスクを停止
 --------------------------------*/
$('#stopButton').on('click', taskStop);
function taskStop(){
    stopbtnOn();
    $("#timerView").countdowntimer("stop", "stop");

    var form = $('#TaskForm').serializeArray();
    var formdata = {};
    jQuery.each(form, function(i, e) {
        formdata[e.name] = e.value;
    });

    $.ajax({
        url:'/stop',
        type:'POST',
        contentType : 'application/json; charset=utf-8',
        data: JSON.stringify(formdata)
    }).done( (data) => {
        console.log("success");
        console.log(data);
    }).fail( (data) => {
        console.log("fail");
        console.log(data);
    });
}

/*--------------------------------
 * タスクが完了
 --------------------------------*/
function taskFinish(){
    setTimeout(() => {
        taskStop();
        alert("Finish!!");
        $("#timerView").countdowntimer("stop", "stop");
        stopbtnOn();
    }, 1000);
}

/*--------------------------------
 * ボタン制御：startボタンONの時
 --------------------------------*/
function startbtnOn(){
    $('#startButton').prop("disabled", true);
    $('#stopButton').prop("disabled", false);
}

/*--------------------------------
 * ボタン制御：stopボタンONの時
 --------------------------------*/
function stopbtnOn(){
    $('#startButton').prop("disabled", false);
    $('#stopButton').prop("disabled", true);
}
