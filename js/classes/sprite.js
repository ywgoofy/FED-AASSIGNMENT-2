//Creating Sprite 
class Sprite{
    constructor({position,imageSrc,frame_rate = 1 , frame_count = 30, sprite_animation = {} , loop}) //Default framerate = 1 and frame_count = 3
    {
        this.position = position;
        this.image = new Image()
        this.loading = true;
        this.image.onload = () =>
        {
            this.loading = false;
            this.width = this.image.width / this.frame_rate
            this.height = this.image.height
        }
        this.image.src = imageSrc
        this.frame_rate = frame_rate
        this.current_frame = 0;
        this.loop = loop
        
        //Count
        this.frame = 0 
        //Speed
        this.frame_count = frame_count 

        this.sprite_animation = sprite_animation
        //Creating image objects using a loop and passing through our animations animations
        if(sprite_animation != {})
        {
            for(let i in this.sprite_animation)
            {
                const image = new Image()
                image.src = this.sprite_animation[i].imageSrc
                this.sprite_animation[i].image = image
            }
        }
    }

    draw() //Drawing out the player/chest/map
    {

        if(!this.image)
        {
            return;
        }

        const cropbox = 
        {
            position:
            {
                x: this.current_frame * (this.image.width/this.frame_rate),
                y:0,
            },
            width: this.image.width/ this.frame_rate,
            height: this.image.height,
        }

        c.drawImage(this.image, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, this.position.x, this.position.y,this.width,this.height)

        /*
        c.fillStyle = 'rgba(0,0,255,0.2)'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
        */
        
    }
    update()
    {
        this.draw()
        this.updateCurrentFrame()
    }
    updateCurrentFrame() //Allows for animations to run
    {
        this.frame ++ ;
        if(this.frame % this.frame_count === 0)
        {
            if(this.current_frame < this.frame_rate - 1)
            {
                this.current_frame ++;
            }
            else if(this.loop)
            {
                this.current_frame = 0;
            }
        }
        
    }
    swapSprite(value) //Switching of animations depending on the actions taken by the user
    {
        if(this.image === this.sprite_animation[value].image || this.loading)
        {
            return
        }
        this.image = this.sprite_animation[value].image
        this.frame_rate = this.sprite_animation[value].frame_rate 
        this.frame_count = this.sprite_animation[value].frame_count
        this.current_frame = 0
    }

    
    
}