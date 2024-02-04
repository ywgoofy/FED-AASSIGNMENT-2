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