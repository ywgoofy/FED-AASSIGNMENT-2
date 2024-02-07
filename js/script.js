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

//If user is in the SignUp page
if(window.location.pathname === '/html/SignUp.html')
{

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
    fetch("https://fedassignment2-e5a1.restdb.io/rest/userinfo  ", settings_Get)
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('Users',JSON.stringify(data));
            })
            let data = JSON.parse(localStorage.getItem('Users'))
        document.getElementById("submit_button").addEventListener("click",function(e){
            e.preventDefault();
            let dupe_email = false;
            let name = document.getElementById("name").value;
            let email = document.getElementById("email_sign_up").value;
            let password = document.getElementById("password_sign_up").value;

            document.getElementById("submit_button").disabled = true;
            document.getElementById("sign_up_form").reset();

            for(let i = 0; i<data.length; i++)
            {
                if(data[i].Email === email)
                {
                    window.alert("Duplicate email found, please enter a different one")
                    dupe_email = true;
                    document.getElementById("submit_button").disabled = false;
                    break;
                
                }
            }

            if(!dupe_email)
            {
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
                    res.json()
                    
                    })
                .then(data => {
                    console.log(data)
                    
                })
            }
        
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
}

//Log in

if(window.location.pathname === "/html/LogIn.html")
{
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

    
        document.getElementById("login_button").addEventListener("click",function(e){
            e.preventDefault();
            
            let email = document.getElementById("email_log_in").value;
            let password = document.getElementById("password_log_in").value;


            
            document.getElementById("login_button").disabled = true;
            document.getElementById("log_in_form").reset();
            
            localStorage.setItem('login',false);
            fetch("https://fedassignment2-e5a1.restdb.io/rest/userinfo", settings_Get)
            .then(res => {

                if(!res.ok)
                {
                    throw Error("Error occured")
                }
                return res.json()
                
                })
            .then(data => {
                localStorage.setItem('Users',JSON.stringify(data))
                //localStorage.setItem('Session_User',-1)
                for(let i = 0; i<data.length; i++)
                {
                    if(email === data[i].Email)
                    {
                        if(password === data[i].Password) //If password and email matches the account
                        {
                            window.alert("LogIn Successful")
                            localStorage.setItem('Session_User',i)
                            localStorage.setItem('login',true)
                            return;
                        }
                    }
                }
                //Else
                window.alert("LogIn Unsuccessful")
                document.getElementById("login_button").disabled = false;
                //console.log('LogIn Unsuccessful')
            })
            //let session_user = JSON.parse(localStorage.getItem('Session_user')) 
            //console.log(session_user)
            let login_success = localStorage.getItem('login')
            console.log(login_success)
            if(login_success)
            {
                let session_user_index = localStorage.getItem('Session_User')
                let data = JSON.parse(localStorage.getItem('Users'))
                console.log(session_user_index)
                if(session_user_index != -1)
                {
                    console.log(data[session_user_index])
                }
            }
            
            //console.log(data[session_user_index])

            
        })
        
        
    })
}




// Main Menu Page
//If user is in the MainMenu page
if(window.location.pathname === "/html/MainMenu.html")
{
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
}

//Win Page
document.addEventListener("DOMContentLoaded", function () {
    // Check if the current page is the Win Page
    if (document.body.classList.contains("Win-Page")) {
 
        // Load and play Lottie animation
        var animationContainer = document.getElementById("lottie-container");
        var animation = lottie.loadAnimation({
            container: animationContainer,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "C:\\Users\\tanye\\OneDrive - Ngee Ann Polytechnic\\SEM 2\\FED\\FED ASG 2\\FED-AASSIGNMENT-2-\\img\\LottieAnimations\\TrophyLottie.json", // Replace with the correct path to your Lottie animation JSON file
        });
    }
});
