class MapEditor {
    static toolTab = {
        sprite: null
    }

    static panel = null
    static currentMap

    static setupMapEditor(){
        MapEditor.setupHUD()
        GameManager.inMapEditor = true;
        MapEditor.currentMap = new Map()
        //MapEditor.toolTab.sprite = createSprite()
        //MapEditor.toolTab.sprite.addImage(AsssetManager.assets.mapEditor.toolTab)
        //LayerManager.layers.hud.add(MapEditor.toolTab.sprite)
    }

    static loop(){     
        
        // Get Mouse Pos
        let mPos = MapEditor.getMouseWorldPosition()
        // Shorthand TileSize
        let tS = GameManager.settings.CONSTANTS.TILESIZE

        //#region CAMERA OFF
        camera.off()

        // Tool Change Panel
        drawSprite(MapEditor.panel) 
        // Current Tool Panel
        image(AsssetManager.assets.mapEditor.currentPanel, width-AsssetManager.assets.mapEditor.currentPanel.width, height-AsssetManager.assets.mapEditor.currentPanel.height)


        // Mouse Click
        if(mouseWentUp(LEFT) || (keyDown(16) && mouseDown(LEFT))){ // Create Tile
            console.log("Detecting Click")
            if(!MapEditor.clicked){
                console.log(allSprites.length)
                MapEditor.testDrawTile()
               MapEditor.clicked = false
            }
        }

        if(mouseWentUp(RIGHT) || (keyDown(16) && mouseDown(RIGHT))){ // Delete Tile
            let mPos = MapEditor.getMouseWorldPosition()
            let tS = GameManager.settings.CONSTANTS.TILESIZE
            let x = Math.floor(mPos.x/(tS/2)) * tS/2 + tS/4
            let y =  Math.floor(mPos.y/(tS/2)) * tS/2 + tS/4
            MapEditor.currentMap.removeTileAtXY(x, y)
        }

        if(keyWentDown(27)){ // ESC Key - SAVE
            MapEditor.currentMap.saveMap()
            console.log("ESC")
        }
        
        if((keyDown(17) && keyWentDown(90)) || (keyDown(17) && keyDown(90) && keyDown(16))){ // Ctrl Z - UNDO
            MapEditor.currentMap.removeLastTile()
        }

        // Mouse Coords
        text(`${Math.floor(mPos.x)} ${Math.floor(mPos.y)}`, mouseX + 25, mouseY- 25)

        camera.on()
        //#endregion CAMERA ON


        MapEditor.tileOutline(mPos, tS);
        MapEditor.cameraMovement();
        MapEditor.clicked = false
    }

    static tileOutline(mPos, tS) {
        rectMode(CENTER)
        fill(0,0,0,0)
        stroke(0,255,0)
        rect(            
            Math.floor(mPos.x/(tS/2)) * tS/2 + tS/4,
            Math.floor(mPos.y/(tS/2)) * tS/2 + tS/4,
            32,
            32
        )


    }
    
    static cameraMovement() {

        let inputV = Input.GetMovementVector2()
        camera.position.add(inputV.mult(10))
        
        // Scroll Camera
        let scrollV = Input.getScroll()
        camera.zoom = constrain(camera.zoom+scrollV, 0.2, 2)

    }

    static getMouseWorldPosition() {
        return createVector(
            (camera.mouseX + ((camera.mouseX-camera.position.x) * (1/camera.zoom)) - (camera.mouseX-camera.position.x)),
            (camera.mouseY + ((camera.mouseY-camera.position.y) * (1/camera.zoom)) - (camera.mouseY-camera.position.y))
        )
    }

    static testDrawTile(){
        if(!MapEditor.clicked){
            console.log("Clicked: true")
            MapEditor.clicked = true
            let mPos = MapEditor.getMouseWorldPosition()
            let tS = GameManager.settings.CONSTANTS.TILESIZE
            let x = Math.floor(mPos.x/(tS/2)) * tS/2 + tS/4
            let y =  Math.floor(mPos.y/(tS/2)) * tS/2 + tS/4

            MapEditor.currentMap.createTile(x, y)

        }
    }

    static setupHUD() {
        camera.off()
        MapEditor.panel = createSprite(width/2, height+100, 0, 0)
        MapEditor.panel.addImage(AsssetManager.assets.mapEditor.toolTab)
        MapEditor.panel.setCollider("rectangle",0, -100, 200, 50)
        MapEditor.panel.modifier = 0
        MapEditor.panel.debug = true

        MapEditor.panel.onMouseReleased  = () => {
            if(!MapEditor.clicked){
                console.log("Clicked");
                console.log("Clicked: true")
                MapEditor.clicked = true;
                if(MapEditor.panel.modifier == 200){
                    MapEditor.panel.modifier = 0
                } else {
                    MapEditor.panel.modifier = 200
                }
                MapEditor.panel.position.y = height+100 - MapEditor.panel.modifier
            }
        }

        camera.on()
    }

}


class Map{

    constructor( ) {
        this.tileIndex = 0
        this.tiles = []
        this.tileMap = {}
    }


    createTile(x, y){
        let sprite = createSprite(
            x,
            y,
        32, 32)

        sprite.addImage("ground", AsssetManager.assets.map.ground)
        sprite.scale = 0.5

        LayerManager.layers.environment.add(sprite)
        MapEditor.currentMap.addTile(sprite, x, y)
    }

    addTile(sprite, x, y){
        let tileXY = `_${x}${y}`
        this.removeTileAtXY(x, y)
        this.tileMap[tileXY] = sprite
        this.tileMap[tileXY].saveInfo = new Tile(Tile.types.CONCRETE, x, y)
    }

    saveMap(name){
        let toSave = {}
        Object.values(this.tileMap).forEach(tile => {
            let tileXY = `_${tile.saveInfo.x}${tile.saveInfo.y}`
            toSave[tileXY] = tile.saveInfo
        })

        saveJSON(toSave, "testMap.json")
    }

    loadMap(json){
        Object.values(json).forEach(tile => {
            this.createTile(tile.x, tile.y)
        })
    }

    removeLastTile(){
        let vals = Object.values(this.tileMap)
        if(vals.length > 0){
            let lastTile = vals[vals.length - 1]
            this.removeTileAtXY(lastTile.saveInfo.x, lastTile.saveInfo.y)
        }
    }

    removeTileAtXY(x, y){
        let tileXY = `_${x}${y}`
        if(this.tileMap[tileXY] != undefined) {
            removeSprite(this.tileMap[tileXY])
            delete this.tileMap[tileXY]
        }
    }

}


class Tile {
    
    static types = {
        CONCRETE: "concrete",
    }

    constructor(type, x, y){
        this.type = type
        this.x = x
        this.y = y
    }
}