const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Replies with the bot\'s invite link!'),
	async execute(interaction) {
		await interaction.reply('https://discord.com/api/oauth2/authorize?client_id=1126575982216757269&permissions=2147502080&scope=bot');
	},
};
