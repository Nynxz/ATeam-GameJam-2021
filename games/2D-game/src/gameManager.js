// Our Main Class, Never Instantiated, Call Static Methods as needed,   preload, setup, loop are called in main.js
// Add other static class method calls into here instead of dumping code into main.js

class GameManager{
    static settings = {
        CONSTANTS: {
            DEBUG: null,
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
        AsssetManager.loadAssets()
        GameManager.settings = loadJSON('settings.json')
    }

    static setup() {
        frameRate(60)

        createCanvas(GameManager.settings.CONSTANTS.SCREEN_W, GameManager.settings.CONSTANTS.SCREEN_H)
        background(0)
        noSmooth();
        LayerManager.setupGroups();


        let startMenu = HUDManager.createMenu([
            new Button(width/2, 100, 600, 120, () => {
                console.log("1"); 
                startMenu.switchTo(secondMenu)
            }, AsssetManager.assets.buttons.start),
            new Button(width/2, 300, 600, 120, () => console.log("2"), AsssetManager.assets.buttons.mapEditor),
            new Button(width/2, 700, 600, 120, () => window.location.reload(), AsssetManager.assets.buttons.back)
        ], true)
        
        let secondMenu = HUDManager.createMenu([
            new Button(width/2, 100, 900, 120, () => { 
                console.log("4"); 
                GameManager.setupLevel(0); 
                secondMenu.disableAll(); 
                LayerManager.layers.hud.isEnabled = false
            }, AsssetManager.assets.buttons.start),
            new Button(width/2, 700, 900, 120, () => {                
                console.log("5"); 
                secondMenu.switchTo(startMenu)
            }, AsssetManager.assets.buttons.back),
        ])

    }


    static loop() {
        background(0)
        LayerManager.drawLayers();
        GameManager.debugFPS();
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
                if(letter == "R"){
                    // Create a Rune
                    GameManager.rune = new Rune( ( x * tS + (tS / 2) ), ( y * tS + (tS / 2) ), GameManager.settings.CONSTANTS.TILESIZE);
                }
            })
        })
    }


    static debugFPS(){
        // https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance#frames-per-second-fps
        let fps = frameRate();
        fill(0, 255, 0);
        stroke(0);
        text("FPS: " + fps.toFixed(2), camera.position.x - width/2 + 25, camera.position.y + height/2 - 25);
    }
}