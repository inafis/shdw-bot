# Shadowy Super Coder Bot

This project is a lightweight Discord bot for the Shadowy Super Coder DAO. Allowing community members to:
- Check brice
- Check # of staked Shadowy Super Coders


# Getting Started

- Clone this repository
 ```
 $ git clone https://github.com/inafis/shdw-bot.git
 ```

## Environment Setup

- Create .env file with the following keys:
```
token={Your Discord Bot Token}
clientId={oAuth clientID of the Discord application associated to your bot}
guildId={ServerId where you plan to Deploy}
```

## Running Locally

- ``` npm install```
- ``` npm start```
- Verify that the server is running by navigating to ``` http://localhost:8000```
- If the Webserver started successfully the Discord client also connected successfully.  

## Setup Discord Bot

To configure this bot to work with your discord you will need to:
- Create a Discord application and bot by following these instructions: 
	- https://discordjs.guide/preparations/setting-up-a-bot-application.html
- Invite your bot to the server:
	-https://discordjs.guide/preparations/adding-your-bot-to-servers.html 

## Deploy

Finally, to enable your bot to run for your community you will need to deploy and host this application on your infrastructure provider of choice. A quick option would be to use Heroku. 
