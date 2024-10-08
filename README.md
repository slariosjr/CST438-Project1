# Bun-dle
<hr>
Bun-dle is a app to view your video game collection locally! 


You can use this app on Android, and on IOS!

Video: https://youtu.be/wLAYqZgOwAE

<hr>

## Running the project:

### Prequesites:

- Node.js and npm: Ensure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from https://nodejs.org/en/download/package-manager.  
- Expo CLI: Install the Expo CLI globally: 

#### Installation Directions:
1. Change directories into ../Project_1
   ```bash
   cd Project_1
   ```
2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
    npx expo start
   ```
# Project 01 Retrospective and overview
[Video Walkthrough]()
[Github Repo](https://github.com/slariosjr/CST438-Project1)
## Overview
This is an app called Bun-dle that allows you to save your video game collection.
#### Introduction:
* Communication was managed through Slack.
* Initially we had considered 12 stories.
* We completed 6 stories.

## Team Retrospective

### Alexander Betancourt
1. Alex's pull requests are [here](https://github.com/slariosjr/CST438-Project1/pulls?q=is%3Aopen%2Fclosed+is%3Apr+author%3AXOR-SABER)
1. Alex's Github issues are [here](https://github.com/slariosjr/CST438-Project1/issues?q=is%3Aopen%2Fclosed+is%3Aissue+author%3AXOR-SABER)

#### What was your role / which stories did you work on

+ What was the biggest challenge? 
  + READING DOCUMENTATION, and learning react native. 
+ Why was it a challenge?
   +  I spent like 30+ hours reading documentation, to ether get a non answer. React native makes me really understand why Developers hate the Facebook ecosystem.
  + How was the challenge addressed?.
     + I read lot of documentation, asked alot of questions to some of my friends in class. I managed to get alot done. 
+ Favorite / most interesting part of this project
   + I actually liked the database portion of the project, Database design is actually really mentally stimulating. 
+ If you could do it over, what would you change?
   + Not use react native, but keep SQLite and maybe use something else for the application, like tauri native. 
+ What is the most valuable thing you learned?
   + How to properly use github issues, to mark difficulty and to show progress. I think the next project I do am gonna stay away from design roles for abit since am feeling the burnout. 

### Kyla Usi
1. Kyla's pull requests are [here](https://github.com/slariosjr/CST438-Project1/pulls?q=is%3Aopen%2Fclosed+is%3Apr+author%3Akylamusi)
2. Kyla's Github issues are [here](https://github.com/slariosjr/CST438-Project1/issues?q=is%3Aopen%2Fclosed+is%3Aissue+author%3Akylamusi+)

#### What was your role / which stories did you work on
My role was integrating the IGDB video game API to the app. I worked on the home page to display all the games and the game details page. 

+ What was the biggest challenge?
   + The biggest challenge was getting the game details page to work and figuring out the navigation with React Native. 
+ Why was it a challenge?
   + It was a challenge because when clicking on a game that didn't have an image, it would not let me navigate to the game details page. The navigation was also very weird and we had to have some imports like useNavigation to get it to work properly.
   + How was the challenge addressed?
      + I fixed the query to ensure that the games being displayed all had a cover image, name, and description. 
+ Favorite / most interesting part of this project
   + My favorite part of this project was seeing the app work on my phone when using the ExpoGo app and actively seeing the changes being made live, like seeing the API data show up on the home page.
+ If you could do it over, what would you change?
   + I would work more on the design of the home page and game details page so that it looks nicer and cleaner. I would also do unit tests first and communicate with my team members more when I was having trouble. 
+ What is the most valuable thing you learned?
   + I learned that it is important to ask for help and go to the teacher if needed and to always update your team on what you're doing or what you're stuck on.

### Silvia Pineda Jimenez
1. Silvia's pull requests are [here](https://github.com/slariosjr/CST438-Project1/pulls?q=is%3Aopen%2Fclosed+is%3Apr+author%3Aspineda12)
1. Silvia's Github issues are [here](https://github.com/slariosjr/CST438-Project1/issues?q=is%3Aopen%2Fclosed+is%3Aissue+author%3Aspineda12)

#### What was your role / which stories did you work on
My role on this project was creating the Login and create Account pages.
+ What was the biggest challenge? 
  + My Biggest challenges were getting react to work and getting all the dependencies to make it work and also
  + learning to use the react navigation.
+ Why was it a challenge?
   +  It was a challenge for me because I had never worked on React and had to learn a lot of things it was a bit confusing at the begining.  
  + How was the challenge addressed?.
     + I got help from my team mates when I got stuck on something and that always seemed to help out a lot.
+ Favorite / most interesting part of this project
   + My favorite part was definitely when all the project parts were put together and getting to see your work has paid off.
+ If you could do it over, what would you change?
   + If I were do redo it I would be more creative with the designs of my pages.
+ What is the most valuable thing you learned?
   + Definitely getting a whole new understanding on how github works for projects.
### Sergio Larios
1. Sergio's pull requests are [here](https://github.com/slariosjr/CST438-Project1/pulls?q=is%3Aopen%2Fclosed+is%3Apr+author%3Aslariosjr)
1. Sergio's Github issues are [here](https://github.com/slariosjr/CST438-Project1/issues?q=is%3Aopen%2Fclosed+is%3Aissue+author%3Aslariosjr2)

#### What was your role / which stories did you work on

+ What was the biggest challenge? 
  + The biggest challenge was fixing all the errors my code had along the way.
+ Why was it a challenge?
   +    It was a challenge becuase half of the time I had no idea how to fix the error and when I went online for help, I got more confused and lost.
  + How was the challenge addressed?.
     + The challenge was addressed but doing a lot of reading through the web.
+ Favorite / most interesting part of this project
   + Favorite part of the project was seeing everything come together at the end.
+ If you could do it over, what would you change?
   + Spend more time learning React before diving in right away.
+ What is the most valuable thing you learned?
   + How to use git in a team based environment.

## Conclusion
- How successful was the project?
   - Alex: The full project minus some features, that aren't really needed for MVP goal.  
   - Kyla: We were able to have a login, home, and settings tab.
   - Silvia: With the time frame it was very successfull in my eyes we got a lot of things done.
   - Sergio: I belive the project was successfull even with all the errors along the way.
- Think in terms of what did you set out to do and what actually got done?
  - Alex: I wore many hats, dependng on the weather. Am actually really happy for how the database turned out, and doing the last round of polish before its due is satisifing. 
  - Kyla: I was set out to work on the home page and API integration and I was able to get the home page done.
  - Silvia: Was able to accomplish the login and create account to work with the login screen.
  - Sergio: I was set out to do the database, unit testing, and game libray. Out of thoes I was able to get the library down.
- What was the largest victory?
   - Alex: When The database was programmed in one day, and the last features was programed in a drunken all nigher. Fundamentally proving the blamer peak is not a myth but the truth. Its going to be a fun story am gonna randomly pull out of nowhere. I remember logging into warframe after pushing my last PR, and it was well earned. 
   - Kyla: I thought the largest victory was when the database was integrated into the project. 
   - Silvia: Getting the database integrated with the project shoutout to Alex! 
   - Sergio: Getting the database to work properly. My version of the database was way off to the current database used in the application.
- Final assessment of the project
