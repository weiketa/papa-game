var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('wall', { title: 'Express' });
});

router.get('/join_game', function (req,res,next) {
    var player_name = '';
    var id = req.session.id;
    var l = global.game_players.length;
    var p = global.game_players;
    var is_new_player = true;

    for(var i=0;i<l;i++){
        if(id == p[i]){
            is_new_player = false;
        }
    }

    if(is_new_player){
        player_name = 'player_'+(global.game_players.length+1);
        req.session.play_name = player_name;
        global.game_players.push(id);
        global.game_players_name.push(player_name);
    }else{
        player_name = req.session.play_name || 'player_0';
    }

    res.render('join_game',{'player_name':player_name});
});

router.get('/judge_game_is_start', function (req,res,next) {
        setTimeout(function () {
            if(global.game_players.length >= 2){
                res.end();
            }
        },4000)
});

router.post('/judge_player_motion', function (req,res,next) {
    var last_time = 0;
    var now_time = new Date().getTime();
    var diff_time = now_time-last_time;
    if(diff_time > 2000){
        if(req.body.motion === 'shaked'){
            global.motions.push(req.body);
        }
    }
    res.end();
});

router.get('/clear', function (req,res,next) {
    setTimeout(function () {
        if(global.motions.length > 0){
            var motion = global.motions.shift();
            res.send(motion);
        }
    },1000)
})


module.exports = router;
