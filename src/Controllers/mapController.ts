import Phaser from 'phaser'
import PlatformGenerator from '../generators/platformGenerator';
import { IGame } from '../interfaces/interfaces';

export default class MapController{ 

    public Platforms: PlatformGenerator = new PlatformGenerator(); 
    public background!: Phaser.GameObjects.TileSprite;

    preloadMap(mapInfo:IGame){
        let path:string;
        switch(mapInfo.map){
            case "Lava":
                path = "assets/Levels/Lava_Level/Background_Objects/Lava_Square.png";
                break;
            case "Jungle":
                path = "assets/Levels/Jungle_Level/Background_Objects/Jungle_Square.png";
                break;
            case "Sand":
                path = "assets/Levels/Sand_Level/Background_Objects/Sand_Level.png";
                break;
        }
        mapInfo.scene!.load.image('background', path!)

        // Preload Platforms

        this.Platforms.preloadPlatforms({ scene: mapInfo.scene });
    }

    createMap(mapInfo:IGame){

        this.background = mapInfo.scene!.add.tileSprite(400, 200, 2100, 1880, 'background');
        
        // Start Camera & Background postion
        
        mapInfo.scene!.cameras.main.centerOnX(900);
        mapInfo.scene!.cameras.main.setViewport(0,0,1920,1080);
        this.background.x = 900;

        // Create Platforms

        this.Platforms.createPlatforms({scene: mapInfo.scene , player: mapInfo.player})

    }
 } 
