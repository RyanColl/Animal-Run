import Phaser from 'phaser'
import Game from './Game'

export default class MainMenu extends Phaser.Scene
{
    private background!: Phaser.GameObjects.Image;

	constructor()
	{
		super('main-menu')
	}

	preload()
    {
        //Background
        this.load.image('background', 'assets/Levels/Jungle_Level/Background_Objects/Jungle_Square.png')
        
        //Logo
        this.load.image('Title', 'assets/GUI/Buttons/Title00.png')

        //Buttons
        this.load.image('Multiplayer', 'assets/GUI/Buttons/Multiplayer01.png')
        this.load.image('Singleplayer', 'assets/GUI/Buttons/SinglePlayer01.png')
        this.load.image('Profile', 'assets/GUI/Buttons/Profile01.png')
        this.load.image('Options', 'assets/GUI/Buttons/BigOptions01.png')
        this.load.image('Quit', 'assets/GUI/Buttons/Quit01.png')
        
    }

    create()
    {
        //Background
        this.background = this.add.image(0, 0, "background").setOrigin(0, 0);
        this.background.displayWidth = this.sys.canvas.width;
        this.background.displayHeight = this.sys.canvas.height;

        //Title
        this.add.image(0, 0, "Title").setOrigin(-0.15, -0.2).setScale(0.5);

        //Buttons
        const multiplayer = this.add.image(0, 0, "Multiplayer").setOrigin(0.05, -5).setScale(0.7);
        this.add.image(0, 0, "Singleplayer").setOrigin(0.05, -6.2).setScale(0.7);
        this.add.image(0, 0, "Profile").setOrigin(0.05, -7.3).setScale(0.7);
        this.add.image(0, 0, "Options").setOrigin(0.05, -8.4).setScale(0.7);
        this.add.image(0, 0, "Quit").setOrigin(0.05, -9.5).setScale(0.7);

        //Interactions
        multiplayer.setInteractive();
        multiplayer.on("pointerdown", this.loadMultiplayer.bind(this));
        
    }

    loadMultiplayer(){
        this.scene.start("Game");
    }
}
