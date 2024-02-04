// //Database for the users

// const APIKEY = "65b1ebaf7307823ba86708aa"
// // Settings for getting the user info
// let settings_Get =
//  {
//     method: "GET", //[cher] we will use GET to retrieve info
//     headers: 
//     {
//         "Content-Type": "application/json",
//         "x-apikey": APIKEY,
//         "Cache-Control": "no-cache"
//     },
// }

// //Settings for posting the user info, in the future will use dom to add user info dynamically
// let settings_Post = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "x-apikey": APIKEY,
//             "Cache-Control": "no-cache"
//         },
//         //TESTING MANUALLY ADDING DATA INTO DATABASE
//         body: JSON.stringify({
//             Email: "hello3@gmail.com",
//             Password: " 78394",
//             Name: "helloo"
    
//         })
//     }


//  //Posting the user info to the database   
// fetch("https://fedassignment2-e5a1.restdb.io/rest/userinfo", settings_Post)
// .then(res => {
//     if(!res.ok)
//     {
//         throw Error("Error occured")
//     }
//     res.json()
    
//     })
// .then(data => {
//     console.log(data)
// })


// //Getting the info from the database
// fetch("https://fedassignment2-e5a1.restdb.io/rest/userinfo  ", settings_Get)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//     })

document.addEventListener("DOMContentLoaded",function(){
    const APIKEY = "65b1ebaf7307823ba86708aa"
    //Submit
let settings_Get =
 {
    method: "GET", //[cher] we will use GET to retrieve info
    headers: 
    {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
    },
}
    document.getElementById("submit_button").addEventListener("click",function(e){
        e.preventDefault();
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;


        let settings_Post = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify({
            Email: email,
            Password: password,
            Name: name
    
            })
        }
        document.getElementById("submit_button").disabled = true;
        document.getElementById("sign_up_form").reset();
        fetch("https://fedassignment2-e5a1.restdb.io/rest/userinfo", settings_Post)
        .then(res => {

            if(!res.ok)
            {
                throw Error("Error occured")
            }
            return res.json()
            
            })
        .then(data => {
            console.log(data)
        })
        
    })
    document.getElementById("database").addEventListener("click",function(e){
        e.preventDefault()
        
        fetch("https://fedassignment2-e5a1.restdb.io/rest/userinfo  ", settings_Get)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    })
})


// Main Menu Page

document.addEventListener("DOMContentLoaded", function () {
    // Get all buttons
    var playButton = document.getElementById("play-button");
    var optionsButton = document.getElementById("options-button");
    var loginButton = document.getElementById("login-button");
    var signupButton = document.getElementById("signup-button");

    // Add event listeners for hover effect
    playButton.addEventListener("mouseover", function () {
        enlargeButton(playButton);
    });

    playButton.addEventListener("mouseout", function () {
        resetButtonSize(playButton);
    });

    optionsButton.addEventListener("mouseover", function () {
        enlargeButton(optionsButton);
    });

    optionsButton.addEventListener("mouseout", function () {
        resetButtonSize(optionsButton);
    });

    loginButton.addEventListener("mouseover", function () {
        enlargeButton(loginButton);
    });

    loginButton.addEventListener("mouseout", function () {
        resetButtonSize(loginButton);
    });

    signupButton.addEventListener("mouseover", function () {
        enlargeButton(signupButton);
    });

    signupButton.addEventListener("mouseout", function () {
        resetButtonSize(signupButton);
    });
});

// Function to enlarge the button
function enlargeButton(button) {
    button.style.transform = "scale(1.2)"; // Adjust the scale factor as needed
}

// Function to reset the button size
function resetButtonSize(button) {
    button.style.transform = "scale(1)";
}
