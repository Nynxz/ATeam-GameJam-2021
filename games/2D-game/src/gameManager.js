// Our Main Class, Never Instantiated, Call Static Methods as needed,   preload, setup, loop are called in main.js
// Add other static class method calls into here instead of dumping code into main.js

class GameManager{
    static settings = {
        CONSTANTS: {
            SCREEN_W: null,
            SCREEN_H: null,
            TILESIZE: null
        },
        MAPS: {
            LEVEL_0: null
        }
    };

    static groups = {
        ENVIRONMENT: null
    }

    static player;

    static preload() {
        GameManager.settings = loadJSON('settings.json')
    }

    static setup() {
        createCanvas(GameManager.settings.CONSTANTS.SCREEN_W, GameManager.settings.CONSTANTS.SCREEN_H)
        background(0)
        noSmooth();
        LayerManager.setupGroups();
        GameManager.setupLevel(0)
    }

    static loop() {
        background(0)
        LayerManager.drawLayers();
        camera.position = GameManager.player.sprite.position
        //drawSprites();
    }

    static setupLevel(index) {
        let level = GameManager.settings.MAPS[`LEVEL_${index.toString()}`]
        let tS = GameManager.settings.CONSTANTS.TILESIZE;

        // Loop Through Each Letter of Our STRING Map
        level.forEach((line, y) => {
            // Spread the string into an array, and loop through
            [...line].forEach((letter, x) => {
                if(letter == "X"){
                    // Create A Block          
                    let sprite = createSprite(x * tS + (tS / 2), y * tS + (tS / 2), tS, tS)
                    //sprite.shapeColor = color(70, 70, 70)
                    sprite.setDefaultCollider();
                    sprite.debug = true;
                    sprite.immovable = true
                    LayerManager.layers.environment.add(sprite);
                }
                if(letter == "P"){
                    // Create A Block          
                    GameManager.player = new Player(x * tS + (tS / 2), y * tS + (tS / 2), GameManager.settings.CONSTANTS.TILESIZE);
                }
            })
        })
    }
}