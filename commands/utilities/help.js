const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies with a list of commands!'),
	async execute(interaction) {
		// Get the commands
        const commands = interaction.client.commands;
        // Create an array of command names
        const commandNames = commands.map(command => command.data.name);
        // Alphabatize the array
        commandNames.sort();
        // Create a string with the command names
        const commandList = commandNames.join('\n');
        // Reply with the command list
        await interaction.reply(`Available commands:\n${commandList}`);
	},
};
