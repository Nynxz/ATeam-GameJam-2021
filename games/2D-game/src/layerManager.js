// Class to Handle p5play's Groups of Sprites

// .isEnabled is added onto the groups as a way to decide which layers to draw in our drawLayers method

class LayerManager{

    // The Order Of This Matters
    static layers = {
        environment: null,
        player: null,
        hud: null
    }

    static setupGroups() {
        LayerManager.layers.environment = new Group();
        LayerManager.layers.environment.isEnabled = true;

        LayerManager.layers.player = new Group();
        LayerManager.layers.player.isEnabled = true;

        LayerManager.layers.hud = new Group();
        LayerManager.layers.hud.isEnabled = true;
    }
    
    
    static drawLayers() {
        for(let layer of Object.values(LayerManager.layers)){
            if(layer != null && layer.isEnabled) {
                drawSprites(layer)
            }
        }
    }

}