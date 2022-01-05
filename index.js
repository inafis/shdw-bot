/* eslint no-constant-condition: ["error", { "checkLoops": false }]*/
require('dotenv').config();
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { getPrice, getStakedShdw } = require('./reply-commands');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const token = process.env.token;
const changeStatus = async () => {
	const coinPrice = await getPrice();
	const sscTotal = await getStakedShdw();
	const priceString = '$SHDW - ' + coinPrice.data['genesysgo-shadow'].usd;
	console.log(priceString);
	client.user.setPresence({
		status: 'online',
		activities: [{
			name: priceString,
			type: 'WATCHING',
		}, {
			name:sscTotal.length.toString(),
			type: 'Watching',
		},
		],
	});
};
client.once('ready', () => {
	console.log('Shadow Bot operational');
	setInterval(changeStatus, 15000);
});
client.on('interactionCreate', async interaction => {
	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'shdw') {
		console.log('Shadow Command Ran');
		(async () => {
			const coinPrice = await getPrice();
			await interaction.reply('The price of $SHDW is: ' + coinPrice.data['genesysgo-shadow'].usd);
		})();
	}
	else if (commandName === 'staked') {
		console.log('Staked Command Ran');
		(async () => {
			const shdwTotal = await getStakedShdw();
			await interaction.reply('There are currently: ' + shdwTotal.length + ' Shadowy Super Coders staked.');
		})();
	}
});
// Login to Discord with your client's token
client.login(token);