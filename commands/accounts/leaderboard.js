const { SlashCommandBuilder } = require('discord.js');

const { getLeaderboard } = require('../../utils/db.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Check the leaderboard!'),
	async execute(interaction) {
		try {
            const leaderboard = await getLeaderboard(10);
            await interaction.reply(leaderboard);
        } catch (error) {
            console.error(error);
        }
    },
};