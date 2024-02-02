//Creating player class
class Player{
    constructor(position)
    {
        this.position = position
        this.velocity = 
        {
            x:0,
            y:1
        }
        this.height = 100;
        
    }
    draw()
    {
        c.fillStyle = "red";
        c.fillRect(this.position.x,this.position.y,100,this.height);
    }
    update()
    {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y;
        //Checking if the player touches the bottom of canvas 
        if(this.position.y + this.height + this.velocity.y< canvas.height)
        {
            this.velocity.y += gravity;
        }
        else //Gravity set to 0
        {
            this.velocity.y =0;
        }
    }
}