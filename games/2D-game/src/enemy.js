class Enemy {
    constructor(x, y, stats){
        this.sprite = createSprite(x, y);
        this.sprite.debug = true;
        
        this.stats = stats;
        this.hp = this.stats.maxHp;
        
        this.sprite.setCollider("rectangle", 0, 0, 32, 32);

        LayerManager.layers.enemy.add(this.sprite);

        this.superDraw = this.sprite.draw;
        this.sprite.draw = this.draw.bind(this);
        this.extra = null;
    }
    
    draw() {
        this.superDraw()
        if(this.extra != null){
            this.extra();
        }
    }
}

class EnemyStats {
    constructor(stats){
        this.stats = stats
    }
    
    static BlobEnemy(scaled=false) {
        return new EnemyStats({
            maxHp: scaled ? 10 * GameManager.player.level : 100,
            speed: 1,
            damage: 10
        })
    }
    
}

class BlobEnemy extends Enemy{
    constructor(x, y) {
        super(x, y, EnemyStats.BlobEnemy(true));
        this.extra = this.special;
        //Specific to the Blob Enemy
        this.name = 'Blob';
        this.sprite.addImage("Blob", AsssetManager.assets.enemy.blob);
        this.sprite.velocity.x = 1;
    }
    
    special(){
        this.movement();
        this.applyGravity();
    }

    movement(){
        //Layer manager . layers. environments is the group of sprites for walls,floor,ceiling etc. This checks for collisions.
        if (this.sprite.collide(LayerManager.layers.environment)){
            if (this.sprite.touching.right){
                this.sprite.velocity.x = -1;
            }else if (this.sprite.touching.left){
                this.sprite.velocity.x = 1;
            }
        }
    }

    applyGravity(){
        this.sprite.friction = 0.0001;
        this.sprite.velocity.y = 0.01;
    }
}