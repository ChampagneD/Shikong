var Platformer = Platformer || {};

Platformer.Player = function (game_state, position, properties) {
    "use strict";
    Platformer.Prefab.call(this, game_state, position, properties);
    
    this.walking_speed = +properties.walking_speed;
    this.jumping_speed = +properties.jumping_speed;
    this.bouncing = +properties.bouncing;
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.gravity.y = +properties.gravity;
    this.body.collideWorldBounds = true;
    
    this.animations.add("walking", [7, 8, 9, 10, 11], 6, true);
    this.animations.add("jumping", [1, 2, 3, 4, 5, 6],6, false);
    
    this.body.setSize(this.width/2, this.height);
    this.anchor.setTo(0.5);
    this.scale.setTo(2);

    this.game_state.music_fond = this.game_state.add.audio('sound_runner');

    this.music_fond = this.game_state.music_fond;

    console.log(this);

    this.music_fond.loopFull();

    this.game.camera.follow(this);
    
    this.cursors = this.game_state.game.input.keyboard.createCursorKeys();
};

Platformer.Player.prototype = Object.create(Platformer.Prefab.prototype);
Platformer.Player.prototype.constructor = Platformer.Player;

Platformer.Player.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game_state.game.physics.arcade.collide(this, this.game_state.groups.enemies, this.hit_enemy, null, this);

    this.body.velocity.x = this.walking_speed;  

    // jump only if touching a tile
    if (this.cursors.up.isDown && this.body.blocked.down) {
        this.body.velocity.y -= this.jumping_speed;
        this.animations.play("jumping");
    } else if (this.body.blocked.down) {
        this.animations.play("walking");
    }

    if (!this.body.blocked.down) {
        this.frame = 6;
    }

    if (this.body.blocked.right) {
        this.music_fond.destroy();
        this.game_state.restart_level();
    }
    
    // dies if touches the end of the screen
    if (this.bottom >= this.game_state.game.world.height) {
        this.music_fond.destroy();
        this.game_state.restart_level();
    }
};

Platformer.Player.prototype.hit_enemy = function (player, enemy) {
    "use strict";
    // if the player is above the enemy, the enemy is killed, otherwise the player dies
    if (enemy.body.touching.up) {
        enemy.kill();
        player.y -= this.bouncing;
    } else {
        this.music_fond.destroy();
        this.game_state.restart_level();
    }
};