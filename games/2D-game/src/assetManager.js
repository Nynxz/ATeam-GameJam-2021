class AsssetManager {
    static assets = {
        buttons: {
            start: null,
            mapEditor: null,
            newMapButton: null,
            loadMapButton: null,
            exitButton: null,
            back: null
        },
        rune: {
            on: null,
            off: null
        },
        mapEditor: {
            currentPanel: null,
            toolTab: null
        },
        map: {
            ground: null
        }
    }

    static loadAssets() {
        AsssetManager.assets.buttons.start = loadImage("assets/buttons/startButton.png")
        AsssetManager.assets.buttons.mapEditor = loadImage("assets/buttons/mapEditorButton.png")
        AsssetManager.assets.buttons.newMapButton = loadImage("assets/buttons/newMapButton.png")
        AsssetManager.assets.buttons.loadMapButton = loadImage("assets/buttons/loadMapButton.png")
        AsssetManager.assets.buttons.exitButton = loadImage("assets/buttons/exitButton.png")
        AsssetManager.assets.buttons.back = loadImage("assets/buttons/backButton.png")
        
        AsssetManager.assets.rune.on = loadImage("assets/runeOn.png")
        AsssetManager.assets.rune.off = loadImage("assets/runeOff.png")

        AsssetManager.assets.mapEditor.currentPanel = loadImage("assets/currentMapTool.png")
        AsssetManager.assets.mapEditor.toolTab = loadImage("assets/mapEditorToolTab.png")

        AsssetManager.assets.map.ground = loadImage("assets/ground.png")

    }
}