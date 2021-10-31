class Rune {
    constructor(x, y, tS){
        // tS is defined in the gameManager.js file where we initialise the game.
        this.sprite = createSprite(x, y, tS, tS);
        this.sprite.addImage("Disabled", AsssetManager.assets.runes);
        this.status = false;
        // Define a number for sequence on initialisation
        this.number = null;
        this.superDraw = this.sprite.draw;
        this.sprite.draw = this.draw.bind(this);
        this.sprite.debug = true;
        LayerManager.layers.environment.add(this.sprite);
    }

    getNumber(){
        return this.number;
    }

    getStatus(){
        return this.status;
    }

    draw(){
        this.superDraw();
    }
}