const { SlashCommandBuilder } = require('discord.js');

const { getPoints } = require('../../utils/db.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('points')
		.setDescription('Check your points!'),
	async execute(interaction) {
		const userID = interaction.user.id;
		const points = await getPoints(userID);
        // If the user doesn't exist, return
		if (!points) {
			await interaction.reply("You don't have an account! Please run the `start` command.");
			return;
		}
		await interaction.reply(`You have ${points} points!`);
	},
};
