class HUDManager {
    static createMenu(buttons, visible){
        return new Menu(buttons, visible);
    }

    static setupMenus(){
        let startMenu = HUDManager.createMenu([
            new Button(width/2, 100, 600, 120, () => {
                console.log("Start"); 
                startMenu.switchTo(secondMenu)
            }, AsssetManager.assets.buttons.start),
            new Button(width/2, 300, 600, 120, () => {
                console.log("Map Editor")
                startMenu.switchTo(mapEditorStart)
            }, AsssetManager.assets.buttons.mapEditor),
            new Button(width/2, 700, 600, 120, () => window.location.reload(), AsssetManager.assets.buttons.exitButton)
        ], true)
        
        let secondMenu = HUDManager.createMenu([
            new Button(width/2, 100, 600, 120, () => { 
                console.log("Start Game"); 
                GameManager.setupLevel(0); 
                secondMenu.disableAll(); 
                LayerManager.layers.hud.isEnabled = false
            }, AsssetManager.assets.buttons.start),
            new Button(width/2, 700, 600, 120, () => {                
                console.log("Back"); 
                secondMenu.switchTo(startMenu)
            }, AsssetManager.assets.buttons.back),
        ])

        let mapEditorStart = HUDManager.createMenu([
            new Button(width/2, 100, 600, 120, () => { 
                console.log("New Map"); 
                mapEditorStart.disableAll()
                MapEditor.setupMapEditor()
                GameManager.inMapEditor = true;

            }, AsssetManager.assets.buttons.newMapButton),
            new Button(width/2, 400, 600, 120, () => { 
                
                console.log("Load Map"); 
                loadJSON("testMap.json", (json) => {
                    mapEditorStart.disableAll()
                    MapEditor.setupMapEditor()
                    MapEditor.currentMap.loadMap(json)
                    GameManager.inMapEditor = true;
                })

            }, AsssetManager.assets.buttons.loadMapButton),
            new Button(width/2, 700, 600, 120, () => {                
                console.log("Load Map"); 
                mapEditorStart.switchTo(startMenu)
            }, AsssetManager.assets.buttons.back),
        ])
    }

}

class Button{
    constructor(x, y, width, height, callback, image=null){
        this.sprite = createSprite(x, y, width, height);
        this.sprite.onMouseReleased = callback
        this._setup(image);
        return this.sprite
    }

    _setup(image){
        LayerManager.layers.hud.add(this.sprite)
        if(image!=null){
            this.sprite.addImage("base", this._resizeImage(image, this.sprite.width, this.sprite.height))
        }

        this.sprite.setDefaultCollider()
        this.sprite.visible = false
        this.sprite.removed = true
        this.sprite.debug = GameManager.settings.CONSTANTS.DEBUG
    }

    _resizeImage(image, width, height){
        let img = image.get()
        img.resize(width, height)
        return img
    }
}


class Menu{
    buttons;
    
    constructor(buttons, visible=false){
        this.buttons = buttons

        if(visible){
            this.enableAll()
        } else {
            this.disableAll();
        }
        
    }

    disableAll() {
        this.buttons.forEach(button => {
            button.visible = false;
            button.removed = true
        });
    }

    
    enableAll() {
        this.buttons.forEach(button => {
            button.visible = true;
            button.removed = false
        });
    }
    

    switchTo(menu){
        this.disableAll()
        menu.enableAll()
    }
}