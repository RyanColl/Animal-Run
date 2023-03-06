import { IGame } from "../interfaces/interfaces";

export default class PlatformGenerator{

    private lastY:number = 539;
    private lastX:number = 500;
    public platforms?: Phaser.Physics.Arcade.StaticGroup;


    preloadPlatforms(worldInfo: IGame){

        worldInfo.scene?.load.image("platformBig", "assets/Levels/Lava_Level/Platforms/StonePlatformBig.png");
    }
    createPlatforms(worldInfo: IGame){

        this.platforms = worldInfo.scene?.physics.add.staticGroup();
        
        for(let i = 1800; i > 0; i-- ){
            this.platforms?.create(i * 190, 1080, 'platformBig')
        }

        for(let i = 0; i < 100; i++){
            let rowHeight:number;


            let column = this.lastX + 285 + Math.floor(Math.random() * 100);
            //console.log(column);

            
            if(this.lastY <= 400){
                rowHeight = this.lastY + 175 + Math.floor(Math.random() * 200);
                //console.log(`Last Y:${this.lastY} Last X:${this.lastX} | new height : ${rowHeight} | if`)

            }else if(this.lastY >= 680){
                rowHeight = this.lastY - 175 - Math.floor(Math.random() * 200);
                //console.log(`Last Y:${this.lastY} Last X:${this.lastX} | new height : ${rowHeight} | else if`)
            }
            else{
                if(Math.floor(Math.random() * 3) == 1){
                    rowHeight = this.lastY - 150 - (Math.floor((Math.random() * 150)));
                }else{
                    rowHeight = this.lastY + 150 + Math.floor((Math.random() * 150));

                }
                //console.log(`Last Y:${this.lastY} Last X:${this.lastX} | new height : ${rowHeight} | else`)
                
            }
            

            this.platforms?.create(column, rowHeight, 'platformBig')

            this.lastX = column;
            this.lastY = rowHeight;
        }
       

    }
}