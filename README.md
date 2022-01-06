# Floor Watchers Discord Bot

This project is a lightweight Discord bot for the Floor Watchers DAO. Allowing community members to:
- Check brice of any coin
- Check # of tokens in a given token account
- Display brice in presence (alternating)
- Display Total staked super codes (alternating)


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
stakeAccount={Token account to retrieve token counts from}
presenceId={ID of the token to update price in presence}
```
- PresenceIds correspond to the coin ID on coingecko. Please check https://www.coingecko.com/en/api/documentation for the list of valid IDs.
  
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

- Note that you'll need to run deploy-command.js once time to add the slash commands to your discord.
