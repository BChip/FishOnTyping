import { Scene } from 'phaser';

// grey, blue, purple, orange, no tint
const TINTS = [0x808080, 0x800080, 0xffa500, 0xffffff];

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    update(time, delta) {
        // Ensure colors are defined before proceeding
        if (this.currentColor && this.nextColor) {
            if (this.colorBlend.step < 1) {
                this.colorBlend.step += delta / this.colorBlend.duration;
                const interpolatedColor = Phaser.Display.Color.Interpolate.ColorWithColor(
                    this.currentColor,
                    this.nextColor,
                    100,
                    this.colorBlend.step * 100
                );

                // Apply the new tint
                const newTintColor = Phaser.Display.Color.GetColor(interpolatedColor.r, interpolatedColor.g, interpolatedColor.b);
                this.background.setTint(newTintColor);
            }
        }
    }

    setCurrentAndNextColors(currentIndex, nextIndex) {
        this.currentTintIndex = currentIndex;
        this.nextTintIndex = nextIndex;
        this.currentColor = Phaser.Display.Color.ValueToColor(TINTS[currentIndex]);
        this.nextColor = Phaser.Display.Color.ValueToColor(TINTS[nextIndex]);
    }

    create() {
        const background = this.add.image(480, 480, 'background');
        this.background = background; // Store background in the scene for access in update

        // Initialize color blend for interpolation
        this.colorBlend = { step: 0, duration: 5000 }; // Duration for color transition
        this.setCurrentAndNextColors(0, 1); // Initialize with the first color transition

        // Setup timed event for color transition
        this.time.addEvent({
            delay: this.colorBlend.duration,
            callback: () => {
                // Prepare the next color transition
                this.colorBlend.step = 0; // Reset blend step for the next transition
                const nextIndex = (this.nextTintIndex + 1) % TINTS.length;
                this.setCurrentAndNextColors(this.nextTintIndex, nextIndex);
            },
            callbackScope: this,
            loop: true
        });

        const titleText = this.add.text(480, 50, 'Fish On Typing', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5);

        const insturctionButtonImage = this.add.image(480, 800, 'wood').setOrigin(0.5).setScale(1.3, 0.6);
        const instructionText = this.add.text(480, 800, 'Instructions:\nDo not make one mistake!\nType as fast as you can!', {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5);

        // Create an image for the start game button
        const startButtonImage = this.add.image(480, 250, 'wood').setOrigin(0.5).setScale(.7, 0.2).setInteractive({ useHandCursor: true });
        const startButtonText = this.add.text(480, 250, 'Start Game', {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff', stroke: '#000000', strokeThickness: 6,
        }).setOrigin(0.5);

        // Button hover effects
        startButtonImage.on('pointerover', () => {
            startButtonImage.setScale(.8, 0.3); // Tint the button image
            startButtonText.setScale(1.1);
        });

        startButtonImage.on('pointerout', () => {
            startButtonImage.setScale(.7, 0.2); // Tint the button image
            startButtonText.setScale(1);
        });

        // Start the game on button click
        startButtonImage.on('pointerdown', () => {
            this.startGame();
        });

        // Create an image for the high scores button
        const highScoreButtonImage = this.add.image(480, 400, 'wood').setOrigin(0.5).setScale(.7, 0.2).setInteractive({ useHandCursor: true });
        const highScoreButtonText = this.add.text(480, 400, 'High Scores', {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff', stroke: '#000000', strokeThickness: 6,
        }).setOrigin(0.5);

        // Button hover effects
        highScoreButtonImage.on('pointerover', () => {
            highScoreButtonImage.setScale(.8, 0.3); // Tint the button image
            highScoreButtonText.setScale(1.1);
        });

        highScoreButtonImage.on('pointerout', () => {
            highScoreButtonImage.setScale(.7, 0.2); // Tint the button image
            highScoreButtonText.setScale(1);
        });

        // Show high scores on button click
        highScoreButtonImage.on('pointerdown', () => {
            this.highScore();
        });

        // Add keyboard listener for SPACE - start the game
        this.input.keyboard.on('keydown-SPACE', () => {
            this.startGame();
        });
    }

    highScore() {
        this.scene.start('ScoreBoard');
    }

    startGame() {
        this.scene.start('Game');
    }
}
