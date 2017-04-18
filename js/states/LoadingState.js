var Phaser = Phaser || {};
var Platformer = Platformer || {};

Platformer.LoadingState = function () {
    "use strict";
    Phaser.State.call(this);
};

Platformer.prototype = Object.create(Phaser.State.prototype);
Platformer.prototype.constructor = Platformer.LoadingState;

Platformer.LoadingState.prototype.init = function (level_data) {
    "use strict";
    window.level_data = level_data;
};

Platformer.LoadingState.prototype.preload = function () {
    "use strict";
    var assets, asset_loader, asset_key, asset;
    assets = window.level_data.assets;
    for (asset_key in assets) { // load assets according to asset key
        if (assets.hasOwnProperty(asset_key)) {
            asset = assets[asset_key];
            switch (asset.type) {
            case "image":
                this.load.image(asset_key, asset.source);
                break;
            case "spritesheet":
                this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                break;
            case "tilemap":
                this.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
                break;
            }
        }
    }

    //LOAD RUNNER BACKGROUND
    this.load.image("runner_background1", '../../assets/images/background/bg_runner_1.jpg');
    this.load.image("runner_background2", '../../assets/images/background/bg_runner_2.jpg');
    this.load.image("runner_background3", '../../assets/images/background/bg_runner_3.jpg');
    this.load.image("runner_background4", '../../assets/images/background/bg_runner_4.jpg');
    this.load.image("runner_background5", '../../assets/images/background/bg_runner_5.jpg');

    //LOAD RUNNER SOUND

    this.load.audio("sound_runner", "../../assets/images/sound/Runer musique.mp3");
    this.load.audio("sound_panda", "../../assets/images/sound/runer_Cri du panda.mp3");


    //LOAD MAZE ASSETS
    // load SOUND
    game.load.audio('ambiance1', '../../assets/assets_maze/sound/ambiance_maze_1.mp3');
    game.load.audio('ambiance2', '../../assets/assets_maze/sound/ambiance_maze_2.mp3');
    game.load.audio('ambiance3', '../../assets/assets_maze/sound/ambiance_maze_3.mp3');
    game.load.audio('ambiance4', '../../assets/assets_maze/sound/ambiance_maze_4.mp3');
    game.load.audio('ambiance5', '../../assets/assets_maze/sound/ambiance_maze_5.mp3');
    game.load.audio('ambiance6', '../../assets/assets_maze/sound/ambiance_maze_6.mp3');

    game.load.audio('change_map', '../../assets/assets_maze/sound/change_map.mp3');
    game.load.audio('mind_kill', '../../assets/assets_maze/sound/mind_kill.mp3');
    game.load.audio('collect_bamboo', '../../assets/assets_maze/sound/collect_bamboo.mp3');

    // load EDITO TUTO
    this.load.image('edito_1', '../../assets/assets_maze/tuto/edito_1.png');// tuto 1
    this.load.image('edito_2', '../../assets/assets_maze/tuto/edito_2.png');// tuto 1
    this.load.image('edito_3', '../../assets/assets_maze/tuto/edito_3.png');// tuto 1
    this.load.image('edito_4', '../../assets/assets_maze/tuto/edito_4.png');// tuto 1
    this.load.image('edito_5', '../../assets/assets_maze/tuto/edito_5.png');// tuto 1


    // load BG
    this.load.image('bg', '../../assets/assets_maze/mapBackground.jpg'); //image BG

    // load MAP
    this.load.tilemap('map1', '../../assets/assets_maze/level/maze1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('map2', '../../assets/assets_maze/level/maze2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('map3', '../../assets/assets_maze/level/maze3.json', null, Phaser.Tilemap.TILED_JSON); 
    this.load.tilemap('map4', '../../assets/assets_maze/level/maze4.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('map5', '../../assets/assets_maze/level/maze5.json', null, Phaser.Tilemap.TILED_JSON);// fichier JSON                                                                                             
    this.load.image('tiles', '../../assets/assets_maze/tiles.png'); // Tiles MAP
      
    // load SPRIT PERSO
    this.load.spritesheet('player_maze_move', '../../assets/assets_maze/player_maze_move.png', 136, 106);// player_maze_move Map
    this.load.spritesheet('cloud', '../../assets/assets_maze/cloud.png', 472, 326);// cloud
    this.load.spritesheet('forest_mind_1', '../../assets/assets_maze/forest-mind_1.png', 161, 157);// forest_mind
    this.load.spritesheet('forest_mind_2', '../../assets/assets_maze/forest-mind_2.png', 161, 157);// forest_mind

    // load bamboo
    this.load.spritesheet('bamboo', '../../assets/assets_maze/bamboo.png', 70, 76, 5)  
};

Platformer.LoadingState.prototype.create = function () {
    "use strict";
    if (window.firstlvl){
        window.firstlvl = false;
        this.game.state.start('MazeLevel1', true, false, window.level_data);
    } else{
        this.game.state.start('GameState', true, false, window.level_data);
    }

};