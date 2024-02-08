# FED-AASSIGNMENT-2-
Team 8: Yew Wren & Ze Yu
Theme 5: Gamer Crazy

Your Project's Name:
Don't Fall

Design Process
We made this website such that users of all ages are able to enjoy this game called Don't Fall. Don't Fall is a vertical platform game where the player controls a character and tries to climb as high as possible and try to reach the end.
If the player falls however, he would have to restart from where he fell off which can be frustrating. But this is also how we plan to hook our users.
We made the game a overall pixel game art theme such that it will best fit the game's atmosphere and vibes.


Existing Features:
Main Menu:
Collections of buttons for the entire website in order for it to function and stay neat.
The main menu will not allow the user to play the game until they have actually logged in.

Sign Up: Allows user to sign up using their username, email and password. The sign up page checks for data validation which include, email validation checking, checking whether it has '@' and '.' syntax. It also checks if the user fills up all the field. Lastly it will check if the user's email has already been inserted into the database. If any of these 3 has anything thats not right, it will alert the user in a obvious way regarding the issue.

Log In: Allows the user to log in using the information they used for sign up which will then locate their imfornmation in a local storage

Leaderboard: Allows the user to be competetive and compete among other plays to see who has opened up the most chest.
Attempted to completely resolve the responsive issue. It is not responsive when the screen gets too small at ard 200~280px width

Game:
Allows the user to move around using 'W', 'A', 'D' keys to move either up, left or right. 
The user is also able to jump up on blocks either on collision blocks or a platform block which behaves differently in a sense that players can jump through platforms while players are not able to jump through collision blocks.
The user can interact with the chest to update and increase their chest opened count by 1 which allows them to remain competetive in the game.
The game has a custom made map which allows for different viartions for traps and parkour to try to reach the top and if the player do fall, they suffer some progress to make it to the top.
The game is also responsive and allows mobile player to play using buttons at the bottoms that functions the same as the keys WAD.
The game has tried to normalize speed to be universal due to devices with different refresh rate. The game has normalize the speed for 60hz screens and 144hz screen.
The game has animation that swaps depending on the actions you take. E.g, The character goes into jump animation when the user press W or the jump button on mobile.
The game also has black borders that normalizes responsiveness throughout all devices to prevent scrollbars.
The game has a weird bug where sometimes it will show a white background outside of the map but upon moving the camera and going back to the same area, the white area dissapears, it seems to be having this issue when testing for responsiveness, it will resolve the issue upon either moving your character out and back into the area or perhaps refreshing can also help.
The game has the ability to exit of the game by pressing either 'ESC' on computers or the Exit button on mobile.
The game doesn't allow infinte jumping or even double jumps. Only allows the player to jump when they have landed on a block.

Win:
After opening the chest at the top of the map of the game, the user will be brought to the win page where it will display a lottie trophy playing on repeat and interactive javascript buttons that can either allow the user to replay the game or exit to the main manu.



Features Left to Implement
Features that could be implemented could be a shop where the user gains coins upon clearing the game and opening the chest and based on the amount of coins they have, allow them to purchase different characters or different maps.
The game could make use of weather API that allows the game to change the map based on the weather.


Techinologies Used:
HTML,CSS,JS
Tiled
BootStrap

Testing
User can try to submit a empty form or form that are part empty and the program will alert a error alerting the user that the user should fill up the form
User can try to submit a invalid email where the email does not contain both '@','.'. The program will alert them saying the email is invalid.
User can try to submit a duplicatie email where the email matches with a registered email in the databse. The program will alert them saying that the email is duplicate and please enter a new one.
If user does not cross any alerts, it will alert the user saying that they have signed up successfully.

User can try logging in with a incorrect password or incorrect email and the program will alert them with a log in unsuccessful.
User can try logging in with the correct password and correct email and the program will alert them with a log in success.



Credits
    Media:
    https://iconduck.com/icons/68200/settings (settings image link)
    https://penzilla.itch.io/hooded-protagonist (Sprite, Main Character)
    https://admurin.itch.io/free-chest-animations (Chest Sprite)
    https://trixelized.itch.io/starstring-fields (Game background tileset)
    https://i.pinimg.com/originals/2c/dd/2b/2cdd2b6c9faa5bef201dd2b6b3d9e861.gif (Main Menu Background Animation)
    https://i.pinimg.com/originals/a0/ca/f1/a0caf1d530dd5bc3302e6053921c7281.gif (Win Page Background Animation)
    https://lottie.host/efb2bbe0-50b8-4eea-b98d-3d6a674c4e8a/zgydVvm3it.json (Lottie Trophy Animation)
    https://www.deviantart.com/forheksed/art/countryside-898779255 (Leaderboard Background Image)
    https://stock.adobe.com/sg/images/id/296615597 (Controls Image)
    https://i.pinimg.com/originals/52/5f/c0/525fc07e5485ae167416b179bbbdf6b5.gif (LogIn Background Animation)
    https://i.pinimg.com/originals/b2/58/85/b258854e249c5d4673a5938b90b6bbf5.gif (SignUp Background Animation)


