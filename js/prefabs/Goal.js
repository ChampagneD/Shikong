var Platformer = Platformer || {};

Platformer.Goal = function (game_state, position, properties) {
    "use strict";
    Platformer.Prefab.call(this, game_state, position, properties);
    
    window.next_level = properties.next_level;
    
    this.game_state.game.physics.arcade.enable(this);
    
    this.anchor.setTo(0.5);

    this.music_fond = this.game_state.music_fond;

    //this.music_panda = this.game_state.add.audio('sound_panda');
};

Platformer.Goal.prototype = Object.create(Platformer.Prefab.prototype);
Platformer.Goal.prototype.constructor = Platformer.Goal;

Platformer.Goal.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.reach_goal, null, this);
};

Platformer.Goal.prototype.reach_goal = function () {
    "use strict";
    // start the next level

    this.music_fond.destroy();
    this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    this.scale.pageAlignHorizontally = false;
    this.scale.pageAlignVertically = false;

    if (window.i == 5) {
        location.reload();
    }

    window.i++;
    
    // start physics system
    this.game.physics.startSystem(null);
    this.game.physics.arcade.gravity.y = 0;
    this.game_state.game.state.start("MazeLevel"+ i, true, false, window.next_level);
};

