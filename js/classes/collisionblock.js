class CollisionBlock{
    constructor({position , height = 16}) //Default collision block height = 16
    {
        this.position = position
        //We use 16 for width and height because thats the width and height of the tileset
        this.width = 16
        this.height = height
    }
    draw(){ //To debug
        c.fillStyle = "rgba(255,0,0,0.5)"
        c.fillRect(this.position.x,this.position.y,this.width,this.height);
        
    }
    update(){
        this.draw();
    }

}