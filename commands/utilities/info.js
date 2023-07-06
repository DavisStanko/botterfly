const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Replies with the bot\'s GitHub repository!'),
	async execute(interaction) {
		await interaction.reply('https://github.com/DavisStanko/botterfly');
	},
};
