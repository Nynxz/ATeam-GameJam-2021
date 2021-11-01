// Our Main Class, Never Instantiated, Call Static Methods as needed,   preload, setup, loop are called in main.js
// Add other static class method calls into here instead of dumping code into main.js
//p5.disableFriendlyErrors = true;
document.addEventListener('contextmenu', event => event.preventDefault());

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

    static inMapEditor = false;


    static preload() {
        AsssetManager.loadAssets()
        GameManager.settings = loadJSON('settings.json')
    }

    static setup() {
  

        let canvas = createCanvas(GameManager.settings.CONSTANTS.SCREEN_W, GameManager.settings.CONSTANTS.SCREEN_H)
        canvas.mouseWheel(Input.scrollEvent)
        frameRate(60)
        useQuadTree(true)
        noSmooth();

        LayerManager.setupGroups();
        HUDManager.setupMenus();

        camera.on()
    }


    static loop() {
        background(0)

        LayerManager.drawLayers();
        GameManager.debugFPS();

        if(GameManager.inMapEditor){
            MapEditor.loop();
        }

    }

    
    static debugFPS(){
        camera.off()
        // https://github.com/processing/p5.js/wiki/Optimizing-p5.js-Code-for-Performance#frames-per-second-fps
        let fps = frameRate();
        fill(0, 255, 0);
        stroke(0);
        text("FPS: " + fps.toFixed(2), 25, 25);
        camera.on()
    }
}