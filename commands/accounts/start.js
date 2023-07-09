const { SlashCommandBuilder } = require('discord.js');

const { addUser } = require('../../utils/db.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Create a gambling account with 1000 points!'),
	async execute(interaction) {
		const userID = interaction.user.id;
		const username = interaction.user.username;
		const points = 1000;
		addUser(username, userID, points)
		    .then(message => {
		        interaction.reply(message);
		    }
		);
	},
};
