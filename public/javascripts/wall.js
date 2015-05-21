$(window).load(function () {
    jadge_game_is_start();
});

function jadge_game_is_start() {
    $.ajax({
        type:'GET',
        url:'/judge_game_is_start',
        success: function (data) {
            location.hash="#page_2";
            start_game();
        },
        timeout:5000,
        complete:function(data){
            jadge_game_is_start();
        }
    })
}

function start_game(){
    var game_panel_width = $('#show_game').width()*2;
    var start_time = new Date().getTime();

    var timer_id = setInterval(function () {
        var now_time = new Date().getTime();
        if(now_time-start_time > 20000){
            clearInterval(timer_id);
            return;
        }
        $('#panel_1').append(get_random_motion());
        $('#panel_1').children().animate({right:game_panel_width},10000);
    },1000);

    $('#action_1').animate({right:game_panel_width},10000);
    setInterval(function () {
        var motions = $('#panel_1').children();
        _.each(motions,function(e){
            if(parseInt($(e).css('right')) > 1000){
                $(e).remove();
            }
        });
    },1000);
//    $('#action_2').animate({right:game_panel_width},10000);
    clear_img();
}

var game_list = [];

function clear_img(){

    $.ajax({
        type:'GET',
        url:'/clear',
        success:function(motion){

            var motions = $('#panel_1').children();
            _.each(motions,function(e){
//                if(!(motion in game_list)){
//                    game_list[motion] = 0;
//                }
                if($(e).attr('id') == 'shaked'){
//                    score++;
                    $(e).remove();
                    console.log('===================')
                }
            });
        },
        complete:function(){
            clear_img();
        },
        timeout:2000
    })
}

function get_random_motion(){
    var random_num = (Math.random()).toFixed();
    if(random_num == 0){
        return "<div id='shaked' class='motion'>摇一摇</div>"
    }
    if(random_num == 1){
        return "<div id='circle' class='motion'>转一圈</div>"
    }
}

function show_game_list(){

}



