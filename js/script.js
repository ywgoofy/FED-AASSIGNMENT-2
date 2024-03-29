

//If user is in the SignUp page
if(window.location.pathname === '/html/SignUp.html')
{

    document.addEventListener("DOMContentLoaded",function(){

    const APIKEY = "65c49b555eab383b979cb9e7"
    //Submit
    let settings_Get =
    {
        method: "GET",
        headers: 
        {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
    }
    fetch("https://fedassignment2-b208.restdb.io/rest/userinfo", settings_Get)
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
            let valid_email = false
            //Checking if the email is vlaid
            for(let i = 0; i<email.length; i++)
            {
                if(email[i] === "@")
                {
                    for(let j = 0; j<email.length; j++)
                    {
                        if(email[j] === ".")
                        {
                            valid_email = true
                            
                        }
                    }
                    
                }
            }
            if(!valid_email)
            {
                window.alert('Please enter a valid email')
                return
            }
            //Checking if the user has entered all the fieds required
            if(name === "" || email === "" || password === "")
            {
                window.alert('Please fill up all fields')
                return;
            }

            document.getElementById("submit_button").disabled = true;
            document.getElementById("sign_up_form").reset();

            //Checking if the email entered is a duplicate one from the database
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

            //Posting of data to the restdb API
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
                    Name: name,
                    ChestOpened: 0
            
                    })
                }
                document.getElementById("submit_button").disabled = true;
                document.getElementById("sign_up_form").reset();
                fetch("https://fedassignment2-b208.restdb.io/rest/userinfo", settings_Post)
                .then(res => {
                    res.json()
                    
                    })
                .then(data => {
                    window.alert('Successfully Signed Up')
                    console.log(data)
                    
                })
            }
        
        })
    })
}

//Log in
if(localStorage.getItem('Login') === true)
{
    localStorage.setItem('Login',false)
}
if(window.location.pathname === "/html/LogIn.html")
{
    
    document.addEventListener("DOMContentLoaded",function(){
        const APIKEY = "65c49b555eab383b979cb9e7"
        //Submit
    let settings_Get =
    {
        method: "GET", 
        headers: 
        {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
    }
    let session_user = '';
    document.getElementById("login_button").addEventListener("click",function(e){
        e.preventDefault();
        
        let email = document.getElementById("email_log_in").value;
        let password = document.getElementById("password_log_in").value;
        //Checking for empty fields
        if(email === "" || password === "")
        {
            window.alert('Please fill in both field')
            return
        }
        
        document.getElementById("login_button").disabled = true;
        document.getElementById("log_in_form").reset();
        
        //localStorage.setItem('login',false);
        fetch("https://fedassignment2-b208.restdb.io/rest/userinfo", settings_Get)
        .then(res => {

            if(!res.ok)
            {
                throw Error("Error occured")
            }
            return res.json()
            
            })
        .then(data => {
            let login_success = false
            for(let i = 0; i<data.length; i++)
            {
                if(email === data[i].Email)
                {
                    if(password === data[i].Password) //If password and email matches the account
                    {
                        window.alert("LogIn Successful")
                        localStorage.setItem('Session_User',[data[i].Email, data[i].Name, data[i].Password,data[i]._id])
                        login_success = true
                        login = true;
                        localStorage.setItem('Login',true)
                    }
                }
            }
            //Else
            if(!login_success)
            {
                window.alert("LogIn Unsuccessful")
                document.getElementById("login_button").disabled = false;
            }
            
        })
        //Setting localstorage for the user
        session_user = localStorage.getItem('Session_User')
        session_user = session_user.split(',')
        console.log(session_user)
            
        })
        
    })
}

/*
//Testing
session_user = localStorage.getItem('Session_User')
        session_user = session_user.split(',')
        //let data = JSON.parse(localStorage.getItem('Users'))
        //user = data[session_user_index]
        console.log(session_user)
*/

//LeaderBoard
if(window.location.pathname === "/html/leaderboard.html")
{
    document.addEventListener("DOMContentLoaded",function()
    {
        const APIKEY = "65c49b555eab383b979cb9e7"
        limit = 5;
        let settings_Get =
        {
            method: "GET",
            headers: 
            {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
        }
        fetch("https://fedassignment2-b208.restdb.io/rest/userinfo", settings_Get)
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => b.ChestOpened - a.ChestOpened);
            let content = "";
            let count = 1;
            //Adding on the content from the restdb API
            for (var i = 0; i < data.length && i < limit; i++) {
            content = `${content}<tr id='${data[i]._id}'>
            <td>${count}</td>
            <td>${data[i].Name}</td>
            <td>${data[i].Email}</td>
            <td>${data[i].ChestOpened}
            `
            count++;
            }
            document.getElementById("contact-list").getElementsByTagName("tbody")[0].innerHTML = content;
        })
        
    })
    
}


// Main Menu Page
// If the user is on the MainMenu page
if (window.location.pathname === "/html/MainMenu.html") {
    document.addEventListener("DOMContentLoaded", function () {

        //For pop up
        const openbtn = document.getElementById("openControls");
        const closebtn = document.getElementById("closeControls");
        const popup = document.getElementById("popup");

        openbtn.addEventListener("click", () => {
            popup.classList.add("open");
        });

        closebtn.addEventListener("click", () => {
            popup.classList.remove("open");
        });

        // Get all buttons
        var playButton = document.getElementById("play-button");
        var controlsButton = document.getElementById("openControls");
        var leaderboardButton = document.getElementById("leaderboard-button");
        var loginButton = document.getElementById("login-button");
        var signupButton = document.getElementById("signup-button");

        // Add event listeners for hover effect
        playButton.addEventListener("mouseover", function () {
            enlargeButton(playButton);
        });

        playButton.addEventListener("mouseout", function () {
            resetButtonSize(playButton);
        });

        controlsButton.addEventListener("mouseover", function () {
            enlargeButton(controlsButton);
        });

        controlsButton.addEventListener("mouseout", function () {
            resetButtonSize(controlsButton);
        });

        leaderboardButton.addEventListener("mouseover", function () {
            enlargeButton(leaderboardButton);
        });

        leaderboardButton.addEventListener("mouseout", function () {
            resetButtonSize(leaderboardButton);
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

        // Stop the player from playing the game if they have not logged in
        playButton.addEventListener("click", function () {
            if (localStorage.getItem('Login') === false) {
                window.alert('Please log in first.');
            } else {
                window.location.href = '/html/loading.html';
            }
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
            path: "/img/LottieAnimations/TrophyLottie.json",
        });
    }
});

//Loading page
if(window.location.pathname === "/html/loading.html")
{
    window.setTimeout(()=>
    {
        console.log('Loading')
        window.location.href = 'game.html'
    },3000)
}
