import Phaser from 'phaser'

export interface IGame{
    scene?:Phaser.Scene,
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys,
    player?: Phaser.Physics.Arcade.Sprite[],
    platforms?: Phaser.Physics.Arcade.StaticGroup,
    background?:Phaser.GameObjects.TileSprite,
    scale?: number,
    name?: string,
    NPCs?: Phaser.Physics.Arcade.Sprite[],
    map?: "Lava" | "Jungle" | "Sand",
    character?: "Rabbit" | "Cat" | "Dog" | "Panda"
    npc?: "Jungle_Blob" | "Lava_Blob" | "Sand_Blob" | "Fly"
}