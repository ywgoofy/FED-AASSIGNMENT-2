//Creating player class
class Player extends Sprite {
    constructor({position, collisionblocks, platformcollisionblocks, imageSrc, frame_rate, sprite_animation, loop, camera_box_width})
    {
        super({imageSrc , frame_rate, loop})
        this.Collisionblocks = collisionblocks
        this.PlatformCollisionblocks = platformcollisionblocks
        this.position = position
        this.velocity = 
        {
            x:0,
            y:1
        }
        this.height = 25;
        this.width = 25;
        this.AtFloor = false;
        this.hitbox =
        {
            position: 
            {
                x:this.position.x,
                y:this.position.y,
            },
            width:10,
            height:10,
        } 

        this.camera_box_width = camera_box_width
        this.camera_box = 
        {
            position:
            {
                x:this.position.x,
                y:this.position.y,
            },
            width: camera_box_width,
            height:80,
        }

        this.sprite_animation = sprite_animation
        this.previous_direction = 'right' //By default player is facing to the right

        //Creating the images for the sprites
        for(let i in this.sprite_animation)
        {
            const image = new Image()
            image.src = this.sprite_animation[i].imageSrc
            this.sprite_animation[i].image = image
        }
        
    }
    /*draw()
    {
        c.fillStyle = "red";
        c.fillRect(this.position.x,this.position.y,this.width,this.height);
    }*/
    
    update()
    {
        this.if_PlayerCollindingWithHorizontalSidesOfCanvas()
        this.if_PlayerCollindingWithVerticalSidesOfCanvas()
        //this.update_HitBox(); gonna test this out ltr c if it works in the order
        this.updateCurrentFrame()
        this.update_HitBox()
        this.update_Camerabox()

        /*
        //Camera testing
        c.fillStyle = 'rgba(0,0,255,0.2)'
        c.fillRect(this.camera_box.position.x,this.camera_box.position.y,this.camera_box.width,this.camera_box.height)
        */
        /*
        //This rect represents the hit box
        c.fillStyle = 'rgba(0,0,255,0.2)'
        c.fillRect(this.hitbox.position.x,this.hitbox.position.y,this.hitbox.width,this.hitbox.height)

        //This rect represents the whole picture of the player
        c.fillStyle = 'rgba(0,255,0,0.2)'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)

        */
        this.draw() //This calls the parents draw method in the Sprite class
        this.position.x += this.velocity.x
        this.update_HitBox()
        this.IfHorizontalCollision();
        this.gravity();
        this.update_HitBox()
        this.IfVerticalCollision();
    }

    if_PlayerCollindingWithHorizontalSidesOfCanvas()
    {
        //If the hitbox of the player is colliding with the canvas
        if(this.hitbox.position.x + this.hitbox.width + this.velocity.x >= background.width -0.01 || this.hitbox.position.x + this.velocity.x <= 0) 
        {
            this.velocity.x =0;
        }
    }

    if_PlayerCollindingWithVerticalSidesOfCanvas()
    {
        //If the hitbox of the player is colliding with the canvas
        if(this.hitbox.position.y + this.velocity.y <= 0) 
        {
            this.velocity.y =0;
        }
    }

    when_to_MoveCameraToLeft({camera,canvas,background})
    {
        const RightSide_of_Camera = this.camera_box.position.x + this.camera_box.width

        //So that the character doesn't see what outside of the canvas
        if(RightSide_of_Camera + this.velocity.x>= background.image.width) //Using velocity to check one frame in advance
        {
            return
        }

        if(RightSide_of_Camera >= canvas.width/scale_amount + Math.abs(camera.position.x)) //Dividing by 4 as it is scaled by 4 times
        {
            //Moving the camera to the left based on the velocity of the player
            camera.position.x -= this.velocity.x //This is the offset value that was created between the canvas goal post and the camerabox that exceeded out of the goal post
        }
    }
    when_to_MoveCameraToRight({camera})
    {
        //So that the character doesn't see the left side of the canvas
        if(this.camera_box.position.x + this.velocity.x <=0)
        {
            return
        }
        if(this.camera_box.position.x <= Math.abs(camera.position.x))
        {
            //Since when we are moving to the left, our velocity is negative so the camera position will be positive and thus shifting to the right
            camera.position.x -= this.velocity.x 
        }
    }

    when_to_MoveCameraToDown({camera})
    {
         //So that the character doesn't see the top side of the canvas
         if(this.camera_box.position.y + this.velocity.y <=0)
         {
             return
         }
        if(this.camera_box.position.y <= Math.abs(camera.position.y))
        {
            //Since when we are moving to the left, our velocity is negative so the camera position will be positive and thus shifting to the right
            camera.position.y -= this.velocity.y 
        }
    }
    when_to_MoveCameraToUp({camera,canvas,background_height})
    {
         //So that the character doesn't see the bottom side of the canvas
         if(this.camera_box.position.y + this.camera_box.height + this.velocity.y >= background_height)
         {
             return
         }
        if(this.camera_box.position.y + this.camera_box.height >= Math.abs(camera.position.y) + canvas.height/scale_amount) //Dividing by 4 as it is the amount that is being translated by
        {
            //Since when we are moving to the left, our velocity is negative so the camera position will be positive and thus shifting to the right
            camera.position.y -= this.velocity.y 
        }
    }

    update_Camerabox()
    {
        if(window.innerWidth<600)
        {
            this.camera_box = 
            {
                position:
                {
                    x:this.position.x -48,
                    y:this.position.y -20,
                },
                width: this.camera_box_width -70,
                height:80,
            }
            return
        }
        this.camera_box = 
        {
            position:
            {
                x:this.position.x -78,
                y:this.position.y -20,
            },
            width: this.camera_box_width,
            height:80,
        }
    }
    swapSprite(value)
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
    update_HitBox()
    {
        this.hitbox =
        {
            position: 
            {
                x:this.position.x + 7,
                y:this.position.y + 4,
            },
            width:10 + 7,
            height:10 + 18,
        } 
    }
    IfHorizontalCollision()
    {
        for(let i = 0; i < this.Collisionblocks.length; i++)
        {   
            const collisionblock = this.Collisionblocks[i]

            //If the bottom of the player is touching the top of the collision block
            let bottom_touching_block = this.hitbox.position.y + this.hitbox.height >= collisionblock.position.y
            //If the top of the player is touching the bottom of the collision block
            let top_touching_block = this.hitbox.position.y <= collisionblock.position.y + collisionblock.height

            //If the left side of the player is touching the right side of the collision block
            let left_touching_block = this.hitbox.position.x <= collisionblock.position.x + collisionblock.width

            //If the right side of the player is touching the left side of the collision block
            let right_touching_block = this.hitbox.position.x + this.hitbox.width >= collisionblock.position.x

            if(bottom_touching_block && top_touching_block && left_touching_block && right_touching_block)
            {
                if(this.velocity.x > 0)
                {
                    //Gap refers the to gap between the right of the hitbox and the right of the image
                    const gap = this.hitbox.position.x +this.hitbox.width - this.position.x
                    this.velocity.x = 0;
                    this.position.x = collisionblock.position.x - gap - 0.01
                    break;
                }

                if(this.velocity.x < 0)
                {
                    //Gap refers the to gap between the left of the hitbox and the left of the image
                    const gap = this.hitbox.position.x - this.position.x
                    this.velocity.x = 0;
                    this.position.x = collisionblock.position.x + collisionblock.width -gap+ 0.01
                    break;
                }
            }
            
        }
    }


    gravity(){
        //Accelerating 
        if(this.velocity.y < 4) //Max acceleration = 4.5
        {
            this.velocity.y += gravity; 
        }
        
        this.position.y += this.velocity.y;
        
        
    }
    IfVerticalCollision(){
        for(let i = 0; i < this.Collisionblocks.length; i++)
        {   

            const collisionblock = this.Collisionblocks[i]
            //If the bottom of the player is touching the top of the collision block
            let bottom_touching_block = this.hitbox.position.y + this.hitbox.height >= collisionblock.position.y
            //If the top of the player is touching the bottom of the collision block
            let top_touching_block = this.hitbox.position.y <= collisionblock.position.y + collisionblock.height

            //If the left side of the player is touching the right side of the collision block
            let left_touching_block = this.hitbox.position.x <= collisionblock.position.x + collisionblock.width

            //If the right side of the player is touching the left side of the collision block
            let right_touching_block = this.hitbox.position.x + this.hitbox.width >= collisionblock.position.x
            if(bottom_touching_block && top_touching_block && left_touching_block && right_touching_block)
            {
                if(this.velocity.y > 0) // Falling
                {
                    //Gap refers the to gap between the bottom of the hitbox and the bottom of the image
                    const gap = this.hitbox.position.y +this.hitbox.height- this.position.y
                    this.AtFloor = true;
                    this.velocity.y = 0;
                    this.position.y = collisionblock.position.y - gap - 0.01 //0.01 affects the jumping
                    break;
                }

                if(this.velocity.y < 0) //Jumping
                {
                    //Gap refers the to gap between the top of the hitbox and the top of the image
                    const gap = this.hitbox.position.y- this.position.y
                    this.AtFloor = true;
                    this.velocity.y = 0;
                    this.position.y = collisionblock.position.y + collisionblock.height - gap+ 0.01
                    break;
                }
            }
            
        }

        //Platform detection
        for(let i = 0; i < this.PlatformCollisionblocks.length; i++)
        {   

            const collisionblock = this.PlatformCollisionblocks[i]
            //If the bottom of the player is touching the top of the collision block
            let bottom_touching_block = this.hitbox.position.y + this.hitbox.height >= collisionblock.position.y

            //If the bottom of the player is touching the bottom of the collision block
            let bottom2_touching_block = this.hitbox.position.y + this.hitbox.height <= collisionblock.position.y + collisionblock.height

            //If the left side of the player is touching the right side of the collision block
            let left_touching_block = this.hitbox.position.x <= collisionblock.position.x + collisionblock.width

            //If the right side of the player is touching the left side of the collision block
            let right_touching_block = this.hitbox.position.x + this.hitbox.width >= collisionblock.position.x

            if(bottom_touching_block && bottom2_touching_block && left_touching_block && right_touching_block)
            {             
                if(this.velocity.y > 0) // Falling
                {
                    //Gap refers the to gap between the bottom of the hitbox and the bottom of the image
                    const gap = this.hitbox.position.y +this.hitbox.height- this.position.y
                    this.AtFloor = true;
                    this.velocity.y = 0;
                    this.position.y = collisionblock.position.y - gap - 0.01 //0.01 affects the jumping
                    break;
                }

                /*if(this.velocity.y < 0) //Jumping
                {
                    //Gap refers the to gap between the top of the hitbox and the top of the image
                    const gap = this.hitbox.position.y- this.position.y
                    this.AtFloor = true;
                    this.velocity.y = 0;
                    this.position.y = collisionblock.position.y + collisionblock.height - gap+ 0.01
                    break;
                }*/
            }
            
        }

        
    }
}