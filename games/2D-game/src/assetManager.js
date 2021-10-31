class AsssetManager {
    static assets = {
        buttons: {
            start: null,
            mapEditor: null,
            newMapButton: null,
            loadMapButton: null,
            exitButton: null,
            back: null
        }
    }

    static loadAssets() {
        AsssetManager.assets.buttons.start = loadImage("assets/buttons/startButton.png")
        AsssetManager.assets.buttons.mapEditor = loadImage("assets/buttons/mapEditorButton.png")
        AsssetManager.assets.buttons.newMapButton = loadImage("assets/buttons/newMapButton.png")
        AsssetManager.assets.buttons.loadMapButton = loadImage("assets/buttons/loadMapButton.png")
        AsssetManager.assets.buttons.exitButton = loadImage("assets/buttons/exitButton.png")
        AsssetManager.assets.buttons.back = loadImage("assets/buttons/backButton.png")
        
    }
}