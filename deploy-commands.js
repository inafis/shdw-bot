const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./static');

const commands = [
	new SlashCommandBuilder().setName('shdw').setDescription('Fetches the latest $SHDW price'),
	new SlashCommandBuilder().setName('staked').setDescription('Fetches the latest number of staked Super Coders'),
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
