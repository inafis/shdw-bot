require('dotenv').config();
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { getPrice, getStakedShdw } = require('./reply-commands');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const http = require('http');
const host = 'localhost';
const port = 8000;

const requestListener = function(req, res) {
	res.writeHead(200);
	res.end('{"status":"Shdw-Bot is running"}');
};
const server = http.createServer(requestListener);
const token = process.env.token;

client.once('ready', () => {
	server.listen(port, host, () => {
		console.log(`Server is running on http://${host}:${port}`);
	});
});
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === '$shdw') {
		(async () => {
			const coinPrice = await getPrice();
			await interaction.reply('The price of $SHDW is: ' + coinPrice.data['genesysgo-shadow'].usd);
		});
	}
	else if (commandName === 'staked') {
		(async () => {
			const shdwTotal = await getStakedShdw();
			await interaction.reply('There are currently: ' + shdwTotal + 'Shadowy Super Coders staked.');
		});
		await interaction.reply('Server info.');
	}
});
// Login to Discord with your client's token
client.login(token);