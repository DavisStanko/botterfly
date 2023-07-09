const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with the bot\'s ping!'),
	async execute(interaction) {
        await interaction.reply(`Ping: ${Date.now() - interaction.createdTimestamp}ms. API Latency: ${Math.round(interaction.client.ws.ping)}ms`);
	},
};
