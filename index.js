require('dotenv').config();
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { getPrice, getStakedShdw } = require('./reply-commands');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// const express = require('express');
// const path = require('path');
// const PORT = process.env.PORT || 8000;

const token = process.env.token;

client.once('ready', () => {
	console.log('Shadow Bot operational');
	// express()
	// 	.use(express.static(path.join(__dirname, 'public')))
	// 	.set('views', path.join(__dirname, 'views'))
	// 	.set('view engine', 'ejs')
	// 	.get('/', (req, res) => res.json({
	// 		message:'Shadow Bot is running',
	// 	}))
	// 	.listen(PORT, () => console.log(`Listening on ${ PORT }`));
});
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	const { commandName } = interaction;

	if (commandName === 'shdw') {
		console.log('Shadow Command Ran');
		(async () => {
			const coinPrice = await getPrice();
			await interaction.reply('The price of $SHDW is: ' + coinPrice.data['genesysgo-shadow'].usd);
		});
	}
	else if (commandName === 'staked') {
		console.log('Staked Command Ran');
		(async () => {
			const shdwTotal = await getStakedShdw();
			await interaction.reply('There are currently: ' + shdwTotal + 'Shadowy Super Coders staked.');
		});
		await interaction.reply('Server info.');
	}
});
// Login to Discord with your client's token
client.login(token);