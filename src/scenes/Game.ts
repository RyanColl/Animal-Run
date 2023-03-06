import Phaser from 'phaser';
import NPCController from '../Controllers/npcController';
import characterController from '../Controllers/characterController';
import MapController from '../Controllers/mapController';
import { IGame } from "../interfaces/interfaces";


export default class Game extends Phaser.Scene
{
    // Controllers

    private CharacterController: characterController = new characterController();   
    private map: MapController = new MapController();
    private NPC: NPCController = new NPCController();

    // World Objects
    
    private npcs: Phaser.Physics.Arcade.Sprite[] = [];
    public players: Phaser.Physics.Arcade.Sprite[] = [];
    private GameData: IGame = {scene: this, scale: 0.3, map: "Sand", background: this.map.background}
    
	constructor()
	{
        
		super('game')
	}

	preload()
    {

        // Background

        this.map.preloadMap({...{map: "Sand"}, ...this.GameData})

        // Player

        this.CharacterController.preloadCharacter({...{name: "player" ,character: "Panda"}, ...this.GameData});
        this.CharacterController.preloadCharacter({...{name: "player2" ,character: "Cat"}, ...this.GameData});

        // NPC

        this.NPC.preloadNPC({...{name: "Fly" ,npc:"Fly"}, ...this.GameData})

    }

    create()
    {

         // Map constructor

         this.map.createMap({...{map: "Sand"}, ...this.GameData});

         // Player

         this.players.push(this.CharacterController.createCharacter({...{character: "Rabbit", name: "player"}, ...this.GameData}));        

         // Player 2
 
         this.players.push(this.CharacterController.createCharacter({...{character: "Dog", name: "player2"}, ...this.GameData}));
        
         // NPC

         this.npcs.push(this.NPC.createNPC({...{name: "Fly" ,npc: "Fly", scale: 0.3}, ...this.GameData}))

         // Set World Colliders

         this.addColliders();
    }
    
    update(){

        let i = 0;
        
        if(this.CharacterController.cursors?.shift.isDown){
            if(i == 0){
                i = 1;
            }
            else if(i == 1){
                i = 0;
            }
        }

        if(i == 1){
            this.CharacterController.updateCharacters({scene:this, character: "Rabbit", background: this.map.background}, this.players[0]); 
        }else{
            this.CharacterController.updateCharacters({scene:this, character: "Dog", background: this.map.background},this.players[1],); 
        }

        this.NPC.updateNPC({scene:this, npc: "Fly", background: this.map.background, NPCs: this.npcs})
    }

        
  
    addColliders(){
        for (let i = 0; i < this.players!.length; i++) {
            this.physics.add.collider(this.players[i],this.map.Platforms.platforms!);
        }
        for (let i = 0; i < this.npcs!.length; i++) {

            this.physics.add.collider(this.npcs[i], this.map.Platforms.platforms!)
        }
    }
    

    
}
