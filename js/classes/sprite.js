//Creating Sprite 
class Sprite{
    constructor({position,imageSrc,frame_rate = 1 , frame_count = 30}) //Default framerate = 1 and frame_count = 3
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
        

        this.frame = 0 //Count
        this.frame_count = frame_count //Speed
        
    }

    draw()
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
    }
    update()
    {
        this.draw()
        this.updateCurrentFrame()
    }
    updateCurrentFrame()
    {
        this.frame ++ ;
        if(this.frame % this.frame_count === 0)
        {
            if(this.current_frame < this.frame_rate - 1)
            {
                this.current_frame ++;
            }
            else
            {
                this.current_frame = 0;
            }
        }
        
    }
}