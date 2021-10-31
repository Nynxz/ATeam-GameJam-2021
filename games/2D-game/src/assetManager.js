class AsssetManager {
    static assets = {
        buttons: {
            start: null,
            mapEditor: null,
            back: null
        }
    }

    static loadAssets() {
        AsssetManager.assets.buttons.start = loadImage("assets/buttons/startButton.png")
        AsssetManager.assets.buttons.mapEditor = loadImage("assets/buttons/mapEditorButton.png")
        AsssetManager.assets.buttons.back = loadImage("assets/buttons/backButton.png")
    }
}