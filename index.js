/* eslint no-constant-condition: ["error", { "checkLoops": false }]*/
require('dotenv').config();
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { getPrice, getStakedTokens, getRarity, getDrops } = require('./reply-commands');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = process.env.token;
const presenceId = process.env.presenceId;
let presence = 0;
const changeStatus = async () => {
	switch (presence) {
	case 0: {
		presence = 1;
		const coin = await getPrice(presenceId);
		const priceString = '$' + coin.data.tickers[0].base + '@ $' + coin.data.market_data.current_price.usd;
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
		const sscTotal = await getStakedTokens();
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

	if (commandName === 'price') {
		const coin = interaction.options.getString('Coin');
		(async () => {
			const coinData = await getPrice(coin);
			await interaction.reply('The price of $' + coinData.data.tickers[0].base + 'is: ' + coin.market_data.current_price.usd + ', the ATH was ' + coinData.data.ath.usd + ' on ' + coinData.data.ath_date.usd + '. \n The ATL was ' + coinData.data.atl.usd + ' on ' + coinData.data.atl_date.usd + '. \n FDV: ' + coinData.data.fully_diluted_valuation.usd + '\n 24hr price change: ' + coinData.data.price_change_percentage_24h.toFixed(2) + '% ');
		})();
	}
	else if (commandName === 'staked') {
		(async () => {
			const shdwTotal = await getStakedTokens();
			await interaction.reply('There are currently: ' + shdwTotal.length + ' Shadowy Super Coders staked.');
		})();
	}
	else if (commandName === 'rarity') {
		let collection = interaction.options.getString('collection');
		collection = collection.trim();
		const id = interaction.options.getInteger('id');
		(async () => {
			try {
				const rarity = await getRarity(collection);
				const nft = rarity.data.items.filter((item) => {
					return item.id == id;
				});
				console.log(nft);
				await interaction.reply(nft.toString());
			}
			catch (error) {
				console.log(error);
				await interaction.reply('Unable to fetch rarity, HowRareIs API is down');
			}
		})();
	}
	else if (commandName == 'drops') {
		(async () => {
			const drops = await getDrops();
			let channelAnnouncement = '';
			// eslint-disable-next-line no-unused-vars
			for (const [key, value] of Object.entries(drops)) {
				value.each((collection) => {
					channelAnnouncement += '\n' + collection.name + ' is dropping on ' + collection.date + ' at a mint price of ' + collection.price + ' and a total supply of ' + collection.nft_count;
				});
			}
			await interaction.reply(channelAnnouncement);
		})();
	}
});
// Login to Discord with your client's token
client.login(token);