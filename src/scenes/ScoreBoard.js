import { Scene } from 'phaser';

export class ScoreBoard extends Scene {
    constructor() {
        super('ScoreBoard');
    }

    create() {
        this.scores = JSON.parse(localStorage.getItem('scores')) || [];
        console.log(this.scores)
        this.cameras.main.setBackgroundColor(0xff0000);

        this.add.image(480, 384, 'background').setAlpha(0.5);

        // Render the high scores
        this.add.text(480, 100, 'High Scores', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.scores.forEach((score, index) => {
            this.add.text(480, 200 + (index * 50), `${index + 1}. Score: ${score.score} - WPM: ${score.wpm}`, {
                fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'center'
            }).setOrigin(0.5);
        });

        const mainMenuButtonImage = this.add.image(480, 600, 'wood').setOrigin(0.5).setScale(0.7, 0.2).setInteractive({ useHandCursor: true });
        const mainMenuButtonText = this.add.text(480, 600, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff', stroke: '#000000', strokeThickness: 6,
        }).setOrigin(0.5);

        // Button hover effects
        mainMenuButtonImage.on('pointerover', () => {
            mainMenuButtonImage.setScale(.8, 0.3); // Tint the button image
            mainMenuButtonText.setScale(1.1);
        });

        mainMenuButtonImage.on('pointerout', () => {
            mainMenuButtonImage.setScale(.7, 0.2); // Tint the button image
            mainMenuButtonText.setScale(1);
        });
        mainMenuButtonImage.on('pointerdown', () => {
            this.mainMenu();
        });
    }


    mainMenu() {
        this.scene.start('MainMenu');
    }
}
