var Phaser = Phaser || {};
var Platformer = Platformer || {};

var LevelMaze = true;

var game = new Phaser.Game("100%", "100%", Phaser.CANVAS);
game.state.add("BootState", new Platformer.BootState());
game.state.add("LoadingState", new Platformer.LoadingState());
game.state.add("MazeLevel1", new Platformer.MazeLevel1());
game.state.add("MazeLevel2", new Platformer.MazeLevel2());
game.state.add("MazeLevel3", new Platformer.MazeLevel3());
game.state.add("MazeLevel4", new Platformer.MazeLevel4());
game.state.add("MazeLevel5", new Platformer.MazeLevel5());
game.state.add("GameState", new Platformer.TiledState());
game.state.start("BootState", true, false, "assets/levels/level1.json");