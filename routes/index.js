var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('===================')
  res.render('wall.ejs', { title: 'Express' });
});

router.get('/join_game', function (req,res,next) {
    var player_name = '';
    var id = req.session.id;
    var l = global.game_players.length;
    var p = global.game_players;
    var is_new_player = false;

    for(var i=0;i < l;i++){
        if(p[i] == id){
            is_new_player = true;
            break;
        }
    }

    if(is_new_player){
        player_name = 'player_'+(global.game_players.length+1);
        req.session.play_name = player_name;
        global.game_players.push(id);
    }else{
        player_name = req.session.play_name;
    }



    res.render('join_game.ejs',{'player_name':player_name});
});

module.exports = router;
