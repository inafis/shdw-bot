require('dotenv').config();
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const token = process.env.token;
const { getPrice, getStakedShdw } = require('./reply-commands');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
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