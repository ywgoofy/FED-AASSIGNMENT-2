


const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d")

//Setting the height and width of the canvas
canvas.width = 1024;
canvas.height = 576;



ResizeCanvas();
window.addEventListener('resize', ()=>
{
    ResizeCanvas();
})

//Scaling down our canvas dimensions base on the translated scale on the image
const scaledcanvas =  {
    width: canvas.width/4,
    height: canvas.height/4,

}
//Gravity
let gravity = 0.5;



const tile_map_width = 36
const tile_size = 16;
//Adding collisions (floor) to the map
const floorcollisions_2D = []
for(let i  = 0; i<floorcollisions.length; i+=tile_map_width)
{
    floorcollisions_2D.push(floorcollisions.slice(i,i+tile_map_width))
}

const collisionblocks = []
floorcollisions_2D.forEach((row, Y)=>{
    row.forEach((symbol, X) =>{ 
        if(symbol != 0 )
        {
            let collision_block = new CollisionBlock({
                position:{
                    x:X*16,
                    y:Y*16
                    },
                }) 
            //console.log(collision_block.position.x)
            collisionblocks.push(collision_block)  
        }
        
    })
})


//Creating of collision blocks (platform)
const platformcollisions_2D = []
for(let i  = 0; i<platformcollisions.length; i+=tile_map_width)
{
    platformcollisions_2D.push(platformcollisions.slice(i,i+tile_map_width))
}
const platform_collisionblocks = []
platformcollisions_2D.forEach((row, Y)=>{
    row.forEach((symbol, X) =>{ 
        if(symbol != 0)
        {
            let collision_block = new CollisionBlock(
                {
                    position:{
                        x:X*16,
                        y:Y*16
                        },
                    height: 4,

                }) 
                platform_collisionblocks.push(collision_block)  
        }
        
    })
})
//Creating of Sprite (Background)
const background = new Sprite(
    {
        position:{
            x:0,
            y:0,
        },
        //imageSrc:'./img/Background.png'
        //imageSrc : './img/Map.png'
        imageSrc: '/img/Map.png'
    }
)
//Height of the background
const background_height = 72*16

//Creating of player 
//let player_velocity_x =2.5
const player = new Player({
    position:
    {
        x:0,
        y:1050
    },
    collisionblocks : collisionblocks,
    platformcollisionblocks: platform_collisionblocks,
    imageSrc: '/img/character/Idle.png',
    frame_rate: 2,
    sprite_animation:
    {
        Idle:
        {
            imageSrc: '/img/character/Idle.png',
            frame_rate: 2,
            frame_count: 25,
        },
        IdleLeft:
        {
            imageSrc: '/img/character/Idle-Left.png',
            frame_rate: 2,
            frame_count: 25,
        },
        Run:
        {
            imageSrc: '/img/character/Running.png',
            frame_rate: 8,
            frame_count: 5,
        },
        RunLeft:
        {
            imageSrc: '/img/character/Running-Left.png',
            frame_rate: 8,
            frame_count: 5,
        },
        Jump:
        {
            imageSrc: '/img/character/Jump.png',
            frame_rate: 4,
            frame_count: 15,
        },
        JumpLeft:
        {
            imageSrc: '/img/character/Jump-Left.png',
            frame_rate: 4,
            frame_count: 15,
        },
        Fall:
        {
            imageSrc: '/img/character/Fall.png',
            frame_rate: 4,
            frame_count: 15,
        },
        FallLeft:
        {
            imageSrc: '/img/character/Fall-Left.png',
            frame_rate: 4,
            frame_count: 15,
        }
    },
    loop: true,
    
})

//Creating of chest
const chest = new Sprite(
    {
        position:
        {
            //Supposed location of the chest 
            //x:288,
            //y:112,
            //Testing location:
            x:0,
            y:1085,
        },
        imageSrc: '/img/chest/Idle.png',
        frame_rate: 5,
        frame_count: 10,
        sprite_animation:
        {
            Idle:
            {
                imageSrc: '/img/chest/Idle.png',
                frame_rate: 5,
                frame_count: 10,
            },
            Open:
            {
                imageSrc: '/img/chest/Open.png',
                frame_rate: 5,
                frame_count: 10,
            }
        },
        loop: false,
    }
)


//Checking for keys
const keys = {
    d:{
        pressed:false,
    },
    a:{
        pressed:false,
    },
    /*w:{
        pressed:false,
    }*/
}


const camera = 
{
    position:
    {
        x:0,
        y:-background_height + scaledcanvas.height,
    },
}


const perfectFrameTime = 1000 / 60;
let deltaTime = 0;
let lastTimestamp = 0;
let count = 1
function start() {
    requestAnimationFrame(update);
}
let player_velocity_x = 2.5
let player_velocity_y = 8

function animate(timestamp)
{
    
    window.requestAnimationFrame(animate)
    //Testing
    deltaTime = (timestamp - lastTimestamp) / perfectFrameTime;
    lastTimestamp = timestamp;

    if(deltaTime <0.5)
    {
        player_velocity_x = 2.5
        player_velocity_y = 7
        player_velocity_x = player_velocity_x*(deltaTime+0.2)
        player_velocity_y = player_velocity_y*(deltaTime+0.3)
        gravity = 0.20
        //console.log(player_velocity_x)
        //console.log(player.velocity.y)
    }
    count++
    //Testing
    c.fillStyle = "white"   
    c.fillRect(0,0,canvas.width,canvas.height);
    //Scaling the background up by 4 times
    c.save();
    c.scale(4,4)
    c.translate(camera.position.x,camera.position.y)
    background.update();


    //Collision blocks/ Displaying the rectangles of the collision blocks
    //For testing
    /*collisionblocks.forEach((collisionBlock)=>{
        collisionBlock.update()
        
    })

    platform_collisionblocks.forEach((collisionBlock)=>{
        collisionBlock.update()
        
    })*/

    player.update();
    chest.update();
    //IfColliding()
    player.velocity.x = 0
    if(keys.d.pressed)
    {
        player.previous_direction = 'right'
        player.swapSprite("Run")
        player.velocity.x = player_velocity_x;
        player.when_to_MoveCameraToLeft({camera,canvas,background})
    }
    else if(keys.a.pressed)
    {
        player.previous_direction = 'left'
        player.swapSprite('RunLeft')
        player.velocity.x = -player_velocity_x;
        player.when_to_MoveCameraToRight({camera})
    }
    else if(player.AtFloor) //Not jumping/falling, not moving left and right
    {
        if(player.previous_direction === 'right')
        {
            player.swapSprite('Idle')
        }
        else
        {
            player.swapSprite('IdleLeft')
        }
        
    }

    if(player.velocity.y <0) //Jumping
    {
        player.when_to_MoveCameraToDown({camera})
        if(player.previous_direction === 'right')
        {
            player.swapSprite("Jump")
        }
        else
        {
            player.swapSprite('JumpLeft')
        }
    }
    else if(player.velocity.y >0) //Falling
    {
        player.when_to_MoveCameraToUp({camera,canvas,background_height})
        if(player.previous_direction === 'right')
        {
            player.swapSprite('Fall')
        }
        else
        {
            player.swapSprite('FallLeft')
        }
        
    }
    c.restore()
}

animate()




//Player movements
window.addEventListener("keydown",(event)=>
{
    switch(event.key)
    {
        case "d":
            keys.d.pressed = true
            break;

        case "a":
            keys.a.pressed = true            
            break;
        case "w":
            if(IfColliding())
            {
                chest.swapSprite('Open');
                window.setTimeout(()=>
                {
                    window.location.href = '/html/win.html'
                },1500)
                
            }
            //player.velocity.y = -8;
            else if(player.velocity.y > 0) //If player is falling, they won't be able to jump
            {
                player.AtFloor = false;
            }
            else if(player.AtFloor)
            {
                player.velocity.y = -(player_velocity_y);

                player.AtFloor = false;
            }
            break;
    }
})



window.addEventListener("keyup",(event)=>
{
    switch(event.key)
    {
        case "d":
            keys.d.pressed = false;
            break;

        case "a":
            keys.a.pressed = false;            
            break;

    }
})

function ResizeCanvas()
{
    const width = window.innerWidth *0.97;
    const height = window.innerHeight *0.95;
    canvas.width = width;
    canvas.height = height;
}

function IfColliding()
{
    //If the bottom of the player is touching the top of the collision block
    let bottom_touching_block = player.hitbox.position.y + player.hitbox.height >= chest.position.y
    //If the top of the player is touching the bottom of the collision block
    let top_touching_block = player.hitbox.position.y <= chest.position.y + chest.height

    //If the left side of the player is touching the right side of the collision block
    let left_touching_block = player.hitbox.position.x <= chest.position.x + chest.width

    //If the right side of the player is touching the left side of the collision block
    let right_touching_block = player.hitbox.position.x + player.hitbox.width >= chest.position.x

    return (bottom_touching_block && top_touching_block && left_touching_block && right_touching_block)
    
}



