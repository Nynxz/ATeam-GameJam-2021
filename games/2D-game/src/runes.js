class Rune {
    constructor(x, y, tS){
        // tS is defined in the gameManager.js file where we initialise the game.
        this.sprite = createSprite(x, y, tS, tS);
        this.sprite.addImage("Disabled", AsssetManager.assets.rune.off);
        this.sprite.addImage("Enabled", AsssetManager.assets.rune.on);
        this.sprite.scale = 2;
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

        if (dist(this.sprite.position.x, this.sprite.position.y, GameManager.player.sprite.position.x, GameManager.player.sprite.position.y) < 180){
            this.sprite.changeImage("Enabled");
        }else {
            this.sprite.changeImage("Disabled");
        }
    }
}