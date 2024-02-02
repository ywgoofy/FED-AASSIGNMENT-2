const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d")

//Setting the height and width of the canvas
canvas.width = 1024;
canvas.height = 576;

//Scaling down our canvas dimensions base on the translated scale on the image
const scaledcanvas =  {
    width: canvas.width/4,
    height: canvas.height/4,

}
//Gravity
const gravity = 0.5;



const tile_map_width = 36
const floorcollisions_2D = []
for(let i  = 0; i<floorcollisions.length; i+=tile_map_width)
{
    floorcollisions_2D.push(floorcollisions.slice(i,i+tile_map_width))
}

//Creating of collision blocks  
const collisionblocks = []
const tile_size = 16;
floorcollisions_2D.forEach((row, Y)=>{
    row.forEach((symbol, X) =>{
        if(symbol == 181)
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

//Creating of player 
const player = new Player({
    x:0,
    y:0
})

//Creating of Sprite (Background)
const background = new Sprite(
    {
        position:{
            x:0,
            y:0,
        },
        //imageSrc:'./img/Background.png'
        imageSrc : './img/Map.png'
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


let y = 100;

function animate()
{
    window.requestAnimationFrame(animate);
    c.fillStyle = "white"
    c.fillRect(0,0,canvas.width,canvas.height);

    //Scaling the background up by 4 times
    c.save();
    c.scale(4,4)
    c.translate(0,-background.image.height + scaledcanvas.height)
    background.update();
    //Collision blocks

    collisionblocks.forEach((collisionBlock)=>{
        collisionBlock.update()
        
    })
    c.restore()

    player.update();
    player.velocity.x = 0
    if(keys.d.pressed)
    {
        player.velocity.x = 5;
    }
    else if(keys.a.pressed)
    {
        player.velocity.x = -5;
    }

    //this statement forces the player to not be able to jump until they landed
    /*if(player.position.y + player.height + player.velocity.y>= canvas.height)
    {
        keys.w.pressed = false;
    }*/
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
            /*if(keys.w.pressed)
            {
                break;
            }*/
            if(player.velocity.y === 0) //When they landed or when they reach the very peak of the jump
            {
                player.velocity.y = -15;
            }

            
            //keys.w.pressed = true;
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





