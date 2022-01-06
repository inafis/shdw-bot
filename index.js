/* eslint no-constant-condition: ["error", { "checkLoops": false }]*/
require('dotenv').config();
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { getPrice, getStakedShdw, getRarity } = require('./reply-commands');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = process.env.token;

let presence = 0;
const changeStatus = async () => {
	switch (presence) {
	case 0: {
		presence = 1;
		const coinPrice = await getPrice();
		const priceString = '$SHDW - $' + coinPrice.data['genesysgo-shadow'].usd;
		client.user.setPresence({
			status: 'online',
			activities: [{
				name: priceString,
				type: 'WATCHING',
			}],
		});
		return;
	}
	case 1:{
		presence = 0;
		const sscTotal = await getStakedShdw();
		const stakedString = 'Total Staked ' + sscTotal.length.toString();
		client.user.setPresence({
			status: 'online',
			activities: [{
				name: stakedString,
				type: 'WATCHING',
			}],
		});
		return;
	}
	}
};
client.once('ready', () => {
	console.log('Shadow Bot operational');
	setInterval(changeStatus, 15000);
});
client.on('interactionCreate', async interaction => {
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
	else if (commandName === 'rarity') {
		console.log('Rarity triggered');
		let collection = interaction.options.get('input');
		collection = collection.trim();
		const id = interaction.options.get('int');
		(async () => {
			const rarity = await getRarity(collection);
			const nft = rarity.data.items.filter((item) => {
				return item.id == id;
			});
			console.log(nft);
			await interaction.reply(nft.toString());
		})();
	}
});
// Login to Discord with your client's token
client.login(token);