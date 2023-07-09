const { SlashCommandBuilder } = require('discord.js');

const { getPoints } = require('../../utils/db.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('points')
		.setDescription('Check your points!'),
	async execute(interaction) {
		const userID = interaction.user.id;
		const points = getPoints(userID);
        await interaction.reply(`You have ${points} points!`);
	},
};
