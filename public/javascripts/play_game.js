window.onload = function () {
    if(window.DeviceMotionEvent){
        window.addEventListener('devicemotion',deviceMotionHandler,false);
    }
}

var last_time = 0, shaked = 2000;
var x = y = z = last_x = last_y = last_z = 0;

function deviceMotionHandler(eventData) {
    var acceleration = eventData.accelerationIncludingGravity;
    var curent_time = new Date().getTime();
    var diff_time = curent_time-last_time;

    if(diff_time > 100){
        last_time = curent_time;

        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;

        var speed = Math.abs(x+y+z-last_x-last_y-last_z)/diff_time*10000;

        if(speed > shaked){
//            alert('shaked');
            send_motion(curent_time,'shaked')
        }

        last_x = x;
        last_y = y;
        last_z = z;

    }
}

function send_motion(current_time,motion){
    var player_name = $('#player').text();

    $.ajax({
        type:'POST',
        url:'/judge_player_motion',
        data:{current_time:current_time,motion:motion,player:player_name},
        dataType:"json"
    })
}

