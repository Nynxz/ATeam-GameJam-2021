class HUDManager {
    static createMenu(buttons, visible){
        return new Menu(buttons, visible);
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