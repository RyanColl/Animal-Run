import Phaser from 'phaser'

import MainMenu from './scenes/MainMenu'
import Game from './scenes/Game'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1080,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 980 },
			debug: true
		}
	},
	scene: [Game]
}


export default new Phaser.Game(config)