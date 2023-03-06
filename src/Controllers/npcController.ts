import Phaser from 'phaser'
import { IGame } from '../interfaces/interfaces';
export default class NPCController{ 

    public newNPC?: Phaser.Physics.Arcade.Sprite;

    preloadNPC(NPCInfo:IGame){
        let path:string;
        switch(NPCInfo.npc){
            case "Jungle_Blob":
               /* path = "assets/Characters/Panda/Panda.png"; */ /* path is currently a dud */
                break;
            case "Lava_Blob":
               /* path = "assets/Characters/Rabbit/rabbit.png"; */ /* path is currently a dud */
                break;
            case "Sand_Blob":
               /* path = "assets/Characters/Dog/Dog.png"; */ /* path is currently a dud */
                break;
            case "Fly":
                path = "assets/Enemies/Jungle_Level/Fly-sprite.png";
                break;
        }
        NPCInfo.scene!.load.spritesheet(NPCInfo.name! , path! , {
            frameWidth: 450, frameHeight: 250
        });
    }

    createNPC(NPCInfo:IGame){


        this.newNPC = NPCInfo.scene!.physics.add.sprite(400, 50, NPCInfo.name!).setScale(NPCInfo.scale!);
        this.newNPC.setBounce(0.05);


        NPCInfo.scene!.anims.create({
            key: `right-${NPCInfo.npc!}`,
            frames: NPCInfo.scene!.anims.generateFrameNumbers(NPCInfo.name!,{
                start: 0, end: 1
            }),
            frameRate: 18,
            repeat: -1
        });

        NPCInfo.scene!.anims.create({
            key: `left-${NPCInfo.npc!}`,
            frames: NPCInfo.scene!.anims.generateFrameNumbers(NPCInfo.name!,{
                start: 2, end: 3
            }),
            frameRate: 18,
            repeat: -1
        });

        NPCInfo.scene!.anims.create({
            key: `dead-${NPCInfo.npc!}`,
            frames: [{key: NPCInfo.name!, frame: 4}],
            frameRate: 20,
        });

        
        
        return this.newNPC;
        /* return {
            scene: NPCInfo.scene!,
            npc : NPCInfo.nPC,  
        }
         */
    }

    updateNPC(NPCInfo: IGame){


        //NPC Animations
        NPCInfo.NPCs?.forEach((NPC)=>{
            let past = new Date()
            let pres = past.getSeconds()
            if (pres % 2 == 0) {
            NPC.setVelocityX(-250);
            NPC.anims.play(`left-${NPCInfo.npc!}`, true);
            }
            else {
            NPC.setVelocityX(250);
            NPC.anims.play(`right-${NPCInfo.npc!}`, true);
            }
        })
            
        

    }
    
 } 
