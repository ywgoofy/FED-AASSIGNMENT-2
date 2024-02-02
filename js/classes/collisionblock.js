class CollisionBlock{
    constructor({position}){
        this.position = position
        //We use 16 for width and height because thats the width and height of the tileset
        this.width = 16
        this.height = 16
    }
    draw(){
        c.fillStyle = "rgba(255,0,0,0.5)"
        c.fillRect(this.position.x,this.position.y,this.width,this.height);
        
    }
    update(){
        this.draw();
    }

}