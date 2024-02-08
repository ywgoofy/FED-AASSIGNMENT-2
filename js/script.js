

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
                    Name: name,
                    ChestOpened: 0
            
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
    let session_user = '';
    document.getElementById("login_button").addEventListener("click",function(e){
        e.preventDefault();
        
        let email = document.getElementById("email_log_in").value;
        let password = document.getElementById("password_log_in").value;


        
        document.getElementById("login_button").disabled = true;
        document.getElementById("log_in_form").reset();
        
        //localStorage.setItem('login',false);
        fetch("https://fedassignment2-e5a1.restdb.io/rest/userinfo", settings_Get)
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
                localStorage.setItem('Session_User',null)
            }
            
            //console.log('LogIn Unsuccessful')
        })

        session_user = localStorage.getItem('Session_User')
        session_user = session_user.split(',')
        //let data = JSON.parse(localStorage.getItem('Users'))
        //user = data[session_user_index]
        console.log(session_user)
            
        })
        
    })
}

//Testing
session_user = localStorage.getItem('Session_User')
        session_user = session_user.split(',')
        //let data = JSON.parse(localStorage.getItem('Users'))
        //user = data[session_user_index]
        console.log(session_user)


//LeaderBoard
if(window.location.pathname === "/html/leaderboard.html")
{
    document.addEventListener("DOMContentLoaded",function()
    {
        const APIKEY = "65b1ebaf7307823ba86708aa"
        limit = 5;
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
        fetch("https://fedassignment2-e5a1.restdb.io/rest/userinfo", settings_Get)
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => b.ChestOpened - a.ChestOpened);
            let content = "";
            let count = 1;

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
                window.location.href = '/html/game.html';
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


