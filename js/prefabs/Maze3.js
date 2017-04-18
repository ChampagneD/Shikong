////// LABYRINTH //////
var Platformer = Platformer || {};

Platformer.MazeLevel3 = function () {};


Platformer.MazeLevel3.prototype = {

    // création map
    create: function() {

        //TUTO

        // this.edito = this.add.image(1100, 180, 'edito_2');
        // this.edito.scale.setTo(.85);
        // this.game.time.events.loop(10000, this.edito_destroy, this);


        // SOUND
        this.music_ambiance = this.add.audio('ambiance3');
        this.music_ambiance.play();

        this.sound_change_map = this.add.audio('change_map');
        this.sound_change_map.volume -= .5;
        this.sound_mind_kill = this.add.audio('mind_kill');
        this.sound_collect_bamboo = this.add.audio('collect_bamboo');
   

        // OPTION BG CANVAS
        this.scale.setGameSize(window.innerWidth, window.innerHeight);
            // bg color canvas → 
            this.stage.backgroundColor = '#04FFFC';
            // bg image fond → 
            this.add.image(0, 0, 'bg');
        // 


        // CREATION MAP LAYER 
            // Création map
            this.map = this.add.tilemap('map3');
            this.map.addTilesetImage('tiles', 'tiles', 52, 52, 0, 2);

            // Création map tile layer choix
            this.layer = this.map.createLayer('Tile Layer 1');
            this.layer.resizeWorld();

            // collision / effet / map
                this.map.setCollision(4, true, this.layer);
                this.map.setCollision(5, true, this.layer);
                this.map.setCollision(6, true, this.layer);
                this.map.setCollision(7, true, this.layer);
                this.map.setCollision(8, true, this.layer);
                this.map.setCollision(9, true, this.layer);
                this.map.setCollision(10, true, this.layer);
                this.map.setCollision(13, true, this.layer);


            // suis la map pour les mouvement de map labyrinth → 
            this.layer.fixedToCamera = false;
            this.layer.scrollFactorX = 0;
            this.layer.scrollFactorY = 0;

            // position map labyrint → 
            this.layer.position.set(237, 58);

            this.world.setBounds(0, 0, 2000, 2000);
        // 


        // CREATE BAMBOO

            // var bamboo = game.add.sprite(400, 800, 'bamboo');
            // var anim_bamboo = bamboo.animations.add('anim_bamboo');
            // this.bambooGroup.animations.play('anim_bamboo', 15, true);


            //Make Camera Follow Player
            this.camera.follow(this.sprite);

            this.bambooGroup = this.add.physicsGroup();

            var c = this.bambooGroup.create(377, 135, 'bamboo');

            c = this.bambooGroup.create(1470, 860, 'bamboo');

            c = this.bambooGroup.create(1420, 85, 'bamboo');

            c = this.bambooGroup.create(328, 450, 'bamboo');

            c = this.bambooGroup.create(648, 556, 'bamboo');

            c = this.bambooGroup.create(1320, 395, 'bamboo');

            c = this.bambooGroup.create(1115, 710, 'bamboo');

            c = this.bambooGroup.create(900, 865, 'bamboo');

        // CREATE PLAYER SPRITE  → 
            this.sprite = this.add.sprite(300, 500, 'player_maze_move');//postiton SPAWN PLAYER

            // Active phisics sprite
            this.physics.arcade.enable(this.sprite);

            //  Phisics Phaser
            this.sprite.body.collideWorldBounds = true;

            // Hit Marker
            this.sprite.body.setSize(36, 32, 49, 61);
            this.sprite.body.immovable = true;

            // Taille Sprite Player
            this.sprite.scale.setTo(.85);

            // READY ANIMATION PERSO
            this.sprite.animations.add('move_down', [0, 1, 2, 3], 21, true);
            this.sprite.animations.add('move_up', [4, 5, 6, 7], 21, true);
            this.sprite.animations.add('move_left', [8, 9, 10, 11], 21, true);
            this.sprite.animations.add('move_right', [12, 13, 14, 15], 21, true);

            // death
            this.death = this.sprite.animations.add('move_death', [16, 17, 18, 19, 20, 21, 22], 1, false);

            this.death.onComplete.add(this.restartLevel, this);

            // Option touche fleche → 
            this.cursors = this.game.input.keyboard.createCursorKeys();
        // 


        // CREATE ENEMIES
            this.enemiesGroup = this.add.group()
            Enemies(this, 315, 130, 800, 130);
            


        // CREATE CLOUD
            this.cloud = this.add.group();

            //  Create a cloud inside of the 'cloud' group
            for (var i = 0; i < 10; i++) {

                var random = this.rnd.between(1, 2);

                if (random == 1) {

                    var s = this.add.sprite(this.rnd.between(0, this.world.bounds.right), this.world.bounds.randomY - 100, 'cloud', 1, this.cloud);
                    s.alpha = .7;
                    this.physics.arcade.enable(s);
                    s.body.velocity.x = this.rnd.between(-25, -50);
                    s.autoCull = true;
                    s.checkWorldBounds = true;
                    s.events.onOutOfBounds.add(this.resetSpriteRight, this);

                } 
                else {
                    var s = this.add.sprite(this.rnd.between(0, this.world.bounds.right), this.world.bounds.randomY - 100, 'cloud', 1, this.cloud);
                    s.alpha = .7;
                    this.physics.arcade.enable(s);
                    s.body.velocity.x = this.rnd.between(25, 50);
                    s.autoCull = true;
                    s.checkWorldBounds = true;
                    s.events.onOutOfBounds.add(this.resetSpriteLeft, this);

                }
            }

            this.dead = false;

            window.j = 1;

            var tween = game.add.tween(this.bambooGroup).to( { y: +5}, 2000, "Linear", true, 0, -1, true);

            // Loop Set Timeout Phaser SainteMereDeDieux → 
            this.game.time.events.loop(1750, this.sainteMereDeDieux, this);

    },


    update: function() {

        // TUTO
        // this.edito.bringToTop();
        

        // BAMBOU
            // mode de phisycs → 
            this.physics.arcade.collide(this.sprite, this.layer);
            this.physics.arcade.overlap(this.bambooGroup, this.sprite, this.collectBamboo, null, this); 

             if (this.bambooGroup.countDead() == this.bambooGroup.length) {
                this.nextLevel();
             }

            
        // PLAYER MOUVEMENT
            // gravité = 0 → 
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;

            // mouvement player_waze → 
            move_speed = 350; //vitesse perso

            if (this.cursors.up.isDown && this.dead == false){
                this.sprite.body.velocity.y = -move_speed;
                this.sprite.animations.play('move_up');
            }
            else if (this.cursors.down.isDown && this.dead == false){
                this.sprite.body.velocity.y = move_speed;
                this.sprite.animations.play('move_down');
            }
            else if (this.cursors.left.isDown && this.dead == false){
                this.sprite.body.velocity.x = -move_speed;
                this.sprite.animations.play('move_left');

            }
            else if (this.cursors.right.isDown && this.dead == false){
                this.sprite.body.velocity.x = move_speed;
                this.sprite.animations.play('move_right');

            }else if (this.dead == false){
                this.sprite.animations.frame = 6;
            }



        // DEATH PERSO
            // If any ghost is within a certain distance of the mouse pointer, blow it up
            this.enemiesGroup.forEachAlive(function(m) {
                var distance = this.math.distance(m.x, m.y,
                this.sprite.x, this.sprite.y);

                if (distance < 50) {
                    this.dead = true;
                    this.enemiesGroup.destroy();
                    //this.getExplosion(m.x, m.y);
                    this.sprite.animations.play('move_death', 6); 

                    this.sound_mind_kill.play();
                                     
                }

            }, this);


        // console.log(this.enemiesGroup.total);
        if (this.enemiesGroup.total != 0) {
            Enemies.prototype.update(this);
        }

    },

    collectBamboo: function(sprite, bamboo){
                bamboo.kill();
                this.sound_collect_bamboo.play();

    },

    sainteMereDeDieux: function(){

        if (window.j == 4) {
            window.j = 1;
        }

            this.sound_change_map.play();

            //détruit layer pour éviter de recharge
            this.layer.kill(); //détruit layer pour éviter de recharge
            this.layer = this.map.createLayer('Tile Layer '+ window.j);


            // collision / effet / map
            this.map.setCollision(4, true, this.layer);
            this.map.setCollision(5, true, this.layer);
            this.map.setCollision(6, true, this.layer);
            this.map.setCollision(7, true, this.layer);
            this.map.setCollision(8, true, this.layer);
            this.map.setCollision(9, true, this.layer);
            this.map.setCollision(10, true, this.layer);
            this.map.setCollision(13, true, this.layer);

            // suis la map pour les mouvment de map labyrinth → 
            this.layer.fixedToCamera = false;
            this.layer.scrollFactorX = 0;
            this.layer.scrollFactorY = 0;

            // position map labyrint → 
            this.layer.position.set(237, 58);
            this.layer.moveDown();

        this.world.bringToTop(this.bambooGroup);
        this.sprite.bringToTop();
        this.world.bringToTop(this.enemiesGroup);
        this.world.bringToTop(this.cloud);

        window.j++;

    },

    // edito_destroy: function(){
    //     this.edito.destroy();
    // },

    //Pour que les nuages réparaissent de l'autre coté
    resetSpriteRight: function(sprite) {
        sprite.x = this.world.bounds.right;
    },

    resetSpriteLeft: function(sprite) {
        sprite.x = this.world.bounds.left - 200;
    },

    restartLevel: function(){
        this.music_ambiance.destroy();
        this.game.state.restart(true, false, window.level_data);
    },

    nextLevel:  function(){
        "use strict";
        this.music_ambiance.destroy();
        this.game.state.start("BootState", true, false, window.next_level);
    }
}

var Enemies = function(game, x1, y1, x2, y2) {

    // --------  DEPLACEMENT ENNEMIE 1
        game.enemies1 = game.add.sprite(x1, y1, 'forest_mind_1', 4, game.enemiesGroup);

        // Taille Ennemis Forest Mind
        game.enemies1.scale.setTo(0.45);

        // Set the pivot point for this sprite to the center
        game.enemies1.anchor.setTo(0.5, 0.5);

        // Enable physics on the missile
        game.game.physics.enable(game.enemies1, Phaser.Physics.ARCADE);

        // Define constants that affect motion
        game.enemies1.SPEED = 75; // missile speed pixels/second
        game.enemies1.TURN_RATE = 5; // turn rate in degrees/frame
        game.enemies1.WOBBLE_LIMIT = 15; // degrees
        game.enemies1.WOBBLE_SPEED = 250; // milliseconds
        game.enemies1.SMOKE_LIFETIME = 3000; // milliseconds
        game.enemies1.AVOID_DISTANCE = 30; // pixels

        // Create a variable called wobble that tweens back and forth between
        // -this.WOBBLE_LIMIT and +this.WOBBLE_LIMIT forever
        game.enemies1.wobble = game.enemies1.WOBBLE_LIMIT;
        game.game.add.tween(game.enemies1)
            .to(
                { wobble: -game.enemies1.WOBBLE_LIMIT },
                game.enemies1.WOBBLE_SPEED, Phaser.Easing.Sinusoidal.InOut, true, 0,
                Number.POSITIVE_INFINITY, true
            );


    // --------  DEPLACEMENT ENNEMIE 2
        game.enemies2 = game.add.sprite(x2, y2, 'forest_mind_1', 4, game.enemiesGroup);

        // Taille Ennemis Forest Mind
        game.enemies2.scale.setTo(0.5);

        // Set the pivot point for this sprite to the center
        game.enemies2.anchor.setTo(0.5, 0.5);

        // Enable physics on the missile
        game.game.physics.enable(game.enemies2, Phaser.Physics.ARCADE);

        // Define constants that affect motion
        game.enemies2.SPEED = 75; // missile speed pixels/second
        game.enemies2.TURN_RATE = 5; // turn rate in degrees/frame
        game.enemies2.WOBBLE_LIMIT = 15; // degrees
        game.enemies2.WOBBLE_SPEED = 250; // milliseconds
        game.enemies2.SMOKE_LIFETIME = 3000; // milliseconds
        game.enemies2.AVOID_DISTANCE = 30; // pixels

        // Create a variable called wobble that tweens back and forth between
        // -this.WOBBLE_LIMIT and +this.WOBBLE_LIMIT forever
        game.enemies2.wobble = game.enemies2.WOBBLE_LIMIT;
        game.game.add.tween(game.enemies2)
            .to(
                { wobble: -game.enemies2.WOBBLE_LIMIT },
                game.enemies2.WOBBLE_SPEED, Phaser.Easing.Sinusoidal.InOut, true, 0,
                Number.POSITIVE_INFINITY, true
            );
        };





    // Enemies are a type of Phaser.Sprite
    Enemies.prototype = Object.create(Phaser.Sprite.prototype);
    Enemies.prototype.constructor = Enemies;

    Enemies.prototype.update = function(game) {

        // Calculate the angle from the missile to the mouse cursor game.input.x
        // and game.input.y are the mouse position; substitute with whatever
        // target coordinates you need.
        var targetAngle = game.math.angleBetween(
            game.enemies1.x, game.enemies1.y,
            game.sprite.x, game.sprite.y
        );

        // Add our "wobble" factor to the targetAngle to make the missile wobble
        // Remember that this.wobble is tweening (above)
        targetAngle += game.math.degToRad(game.enemies1.wobble);


        // Make each missile steer away from other missiles.
        // Each missile knows the group that it belongs to (missileGroup).
        // It can calculate its distance from all other missiles in the group and
        // steer away from any that are too close. This avoidance behavior prevents
        // all of the missiles from bunching up too tightly and following the
        // same track.
        var avoidAngle = 0;
        game.enemies1.parent.forEachAlive(function(m) {
            // Don't calculate anything if the other missile is me
            if (this == m) return;

            // Already found an avoidAngle so skip the rest
            if (avoidAngle !== 0) return;

            // Calculate the distance between me and the other missile
            var distance = game.math.distance(game.enemies1.x, game.enemies1.y, m.x, m.y);

            // If the missile is too close...
            if (distance < game.enemies1.AVOID_DISTANCE) {
                // Chose an avoidance angle of 90 or -90 (in radians)
                avoidAngle = Math.PI/2; // zig
                if (Phaser.Utils.chanceRoll(50)) avoidAngle *= -1; // zag
            }
        }, game.enemies1);

        // Add the avoidance angle to steer clear of other missiles
        targetAngle += avoidAngle;

        // Gradually (this.TURN_RATE) aim the missile towards the target angle
        if (game.enemies1.rotation !== targetAngle) {
            // Calculate difference between the current angle and targetAngle
            var delta = targetAngle - game.enemies1.rotation;

            // Keep it in range from -180 to 180 to make the most efficient turns.
            if (delta > Math.PI) delta -= Math.PI * 2;
            if (delta < -Math.PI) delta += Math.PI * 2;

            if (delta > 0) {
                // Turn clockwise
                game.enemies1.angle += game.enemies1.TURN_RATE;
            } else {
                // Turn counter-clockwise
                game.enemies1.angle -= game.enemies1.TURN_RATE;
            }

            // Just set angle to target angle if they are close
            if (Math.abs(delta) < game.math.degToRad(game.enemies1.TURN_RATE)) {
                game.enemies1.rotation = targetAngle;
            }
        }

        // Calculate velocity vector based on this.rotation and this.SPEED
        game.enemies1.body.velocity.x = Math.cos(game.enemies1.rotation) * game.enemies1.SPEED;
        game.enemies1.body.velocity.y = Math.sin(game.enemies1.rotation) * game.enemies1.SPEED;




    // Calculate the angle from the missile to the mouse cursor game.input.x
    // and game.input.y are the mouse position; substitute with whatever
    // target coordinates you need.
    var targetAngle = game.math.angleBetween(
        game.enemies2.x, game.enemies2.y,
        game.sprite.x, game.sprite.y
    );

    // Add our "wobble" factor to the targetAngle to make the missile wobble
    // Remember that this.wobble is tweening (above)
    targetAngle += game.math.degToRad(game.enemies2.wobble);


    // Make each missile steer away from other missiles.
    // Each missile knows the group that it belongs to (missileGroup).
    // It can calculate its distance from all other missiles in the group and
    // steer away from any that are too close. This avoidance behavior prevents
    // all of the missiles from bunching up too tightly and following the
    // same track.
    var avoidAngle = 0;
    game.enemies2.parent.forEachAlive(function(m) {
        // Don't calculate anything if the other missile is me
        if (this == m) return;

        // Already found an avoidAngle so skip the rest
        if (avoidAngle !== 0) return;

        // Calculate the distance between me and the other missile
        var distance = game.math.distance(game.enemies2.x, game.enemies2.y, m.x, m.y);

        // If the missile is too close...
        if (distance < game.enemies2.AVOID_DISTANCE) {
            // Chose an avoidance angle of 90 or -90 (in radians)
            avoidAngle = Math.PI/2; // zig
            if (Phaser.Utils.chanceRoll(50)) avoidAngle *= -1; // zag
        }
    }, game.enemies2);

    // Add the avoidance angle to steer clear of other missiles
    targetAngle += avoidAngle;

    // Gradually (this.TURN_RATE) aim the missile towards the target angle
    if (game.enemies2.rotation !== targetAngle) {
        // Calculate difference between the current angle and targetAngle
        var delta = targetAngle - game.enemies2.rotation;

        // Keep it in range from -180 to 180 to make the most efficient turns.
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        if (delta > 0) {
            // Turn clockwise
            game.enemies2.angle += game.enemies2.TURN_RATE;
        } else {
            // Turn counter-clockwise
            game.enemies2.angle -= game.enemies2.TURN_RATE;
        }

        // Just set angle to target angle if they are close
        if (Math.abs(delta) < game.math.degToRad(game.enemies2.TURN_RATE)) {
            game.enemies2.rotation = targetAngle;
        }
    }

    // Calculate velocity vector based on this.rotation and this.SPEED
    game.enemies2.body.velocity.x = Math.cos(game.enemies2.rotation) * game.enemies2.SPEED;
    game.enemies2.body.velocity.y = Math.sin(game.enemies2.rotation) * game.enemies2.SPEED;
};




