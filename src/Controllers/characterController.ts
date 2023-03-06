import Phaser from 'phaser'
import {IGame} from '../interfaces/interfaces';

export default class CharacterController{ 

    private jumpCounter:number = 0;
    private newPlayer?: Phaser.Physics.Arcade.Sprite;
    public cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    preloadCharacter(charInfo:IGame){
        let path:string;
        switch(charInfo.character){
            case "Panda":
                path = "assets/Characters/Panda/Panda.png";
                break;
            case "Rabbit":
                path = "assets/Characters/Rabbit/rabbit.png";
                break;
            case "Dog":
                path = "assets/Characters/Dog/Dog.png";
                break;
            case "Cat":
                path = "assets/Characters/Cat/cat.png";
                break;
        }
        charInfo.scene!.load.spritesheet(charInfo.name! , path! , {
            frameWidth: 500, frameHeight: 500
        });
    }

    createCharacter(charInfo:IGame){

        this.newPlayer = charInfo.scene!.physics.add.sprite(0, 0,charInfo.name!).setScale(charInfo.scale!);
        this.newPlayer.setBounce(0.2);
        this.newPlayer.body.setSize(250, 500);
        
        charInfo.scene!.anims.create({
            key: `right-${charInfo.character!}`,
            frames: charInfo.scene!.anims.generateFrameNumbers(charInfo.name!,{
                start: 1, end: 5
            }),
            frameRate: 18,
            repeat: -1
        });

        charInfo.scene!.anims.create({
            key: `left-${charInfo.character!}`,
            frames: charInfo.scene!.anims.generateFrameNumbers(charInfo.name!,{
                start: 11, end: 7
            }),
            frameRate: 18,
            repeat: -1
        });

        charInfo.scene!.anims.create({
            key: `turn-${charInfo.character!}`,
            frames: [{key: charInfo.name!, frame: 0}],
            frameRate: 20,
        });

        charInfo.scene!.anims.create({
            key: `jump-right-${charInfo.character!}`,
            frames: [{key: charInfo.name!, frame: 6}],
            frameRate: 20,
        });

        charInfo.scene!.anims.create({
            key: `jump-left-${charInfo.character}`,
            frames: [{key: charInfo.name!, frame: 12}],
            frameRate: 20,
        });

        this.cursors = charInfo.scene?.input.keyboard.createCursorKeys();

         return this.newPlayer;
        
    }

    updateCharacters(charInfo:IGame, player:Phaser.Physics.Arcade.Sprite){

        //Character Animations

            if(!player.body.touching.none){

                if(this.cursors?.left?.isDown){
                    player.setVelocityX(-250);
                    player.anims.play(`left-${charInfo.character!}`,true);
                }
                else if(this.cursors?.right?.isDown){
                    player.setVelocityX(250);
                    player.anims.play(`right-${charInfo.character!}`, true);
                }
                else {
                    player.setVelocityX(0)
                    player.anims.play(`turn-${charInfo.character!}`);
                }
            }
        
            if(this.cursors?.up.isDown){
                
                if(this.cursors?.up?.isDown && this.cursors?.right?.isDown){
                    player.anims.play(`jump-right-${charInfo.character!}`);
                    player.setVelocityX(275);
                }
                else if(this.cursors?.up?.isDown && this.cursors?.left?.isDown){
                    player.anims.play(`jump-left-${charInfo.character!}`);
                    player.setVelocityX(-325);
                }
                else{
                    player.anims.play(`jump-right-${charInfo.character!}`);
                }
               
            }

            // Double Jump
    
            const isJumpJustDown = Phaser.Input.Keyboard.JustDown(this.cursors?.up!);
            const touchingGround = player.body.touching.down;

            if(((this.jumpCounter <= 1) || touchingGround ) && isJumpJustDown){
    
                if(touchingGround){
                    player.setVelocityY(-720);
                }else{
                    player.setVelocityY(-530);
                }
                this.jumpCounter++;
    
            }

            if(touchingGround && !isJumpJustDown){
                this.jumpCounter = 0;
            }
    
    
            // Sync background animation with character movement
    
            if(this.cursors?.right?.isDown && player.x > 900){
                charInfo.background!.tilePositionX += 0.65;
            }
            else if(this.cursors?.left?.isDown && player.x > 900){
                charInfo.background!.tilePositionX -= 0.30;
            }
            else {
                charInfo.background!.tilePositionX += 0.25;
            }
            
            if(player.x <= 0){
                player.x = 0.01;
                player.anims.play(`turn-${charInfo.character!}`)
            }
    
            if(player.x > 900){

                // Center Camera on the player
        
                charInfo.scene!.cameras.main.centerOnX(player.x);
    
                // Move background with the character
    
                charInfo.background!.x = player.x;
            }
       

        
    }
    
 } 
