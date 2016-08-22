var request = require('request');

exports.getPlayByPlay = function(id, callback) {
    var data = {};
    var baseUrl = 'http://cdn.espn.com/core/college-football/playbyplay';
    var queryParams = {
        gameId: id,
        xhr: 1,
        render: 'false',
        userab: 18
    };

    request({
        url: baseUrl,
        qs: queryParams
    }, function(error, response, body) {
        if (!error) {
            var data = JSON.parse(body);

            var game = {
                scoringPlays: data.gamepackageJSON.scoringPlays,
                videos: data.gamepackageJSON.videos,
                drives: data.gamepackageJSON.drives,
                teams: data.gamepackageJSON.header.competitions[0].competitors
            };

            callback(game);
        } else {
            console.log(error);
        }
    });
};

exports.getBoxScore = function(id, callback){
    var baseUrl = 'http://cdn.espn.com/core/college-football/boxscore';
    var queryParams = {
        gameId: id,
        xhr: 1,
        render: false,
        device: 'desktop',
        userab: 18
    };

    request({
        url: baseUrl,
        qs: queryParams
    }, function(error, response, body) {
        if (!error){
            var data = JSON.parse(body);

            callback(data.gamepackageJSON.boxscore);
        } else {
            console.log(error);
        }
    });
};