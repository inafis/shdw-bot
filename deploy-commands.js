const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./static');

const commands = [
	new SlashCommandBuilder()
		.setName('price')
		.setDescription('Fetches the latest $SHDW price')
		.addStringOption(option => option.setName('Coin').setDescription('Coin to fetch price data for')),
	new SlashCommandBuilder()
		.setName('staked')
		.setDescription('Fetches the latest number of staked, Super Coders'),
	new SlashCommandBuilder()
		.setName('rarity')
		.setDescription('Get Rarity for a given NFT from HowRareIs')
		.addStringOption(option => option.setName('Collection').setDescription('Enter the name of the collection'))
		.addIntegerOption(option => option.setName('ID').setDescription('Enter the ID of the NFT')),
	new SlashCommandBuilder()
		.setName('drops')
		.setDescription('Get upcoming drops from HowRareIS'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);
(async () => {
	try {
		console.log('Started refresh of (/) commands.');

		await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
			.then(() => console.log('Successfully registered application commands.'))
			.catch(console.error);

		console.log('Successfully reloaded application (/) commands.');
	}
	catch (error) {
		console.log(error);
	}
})();
