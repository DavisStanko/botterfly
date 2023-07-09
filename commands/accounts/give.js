const { SlashCommandBuilder } = require('discord.js');

const { getPoints } = require('../../utils/db.js');
const { addPoints } = require('../../utils/db.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('give')
		.setDescription('Give points to another user!')
        .addUserOption(option => option.setName('user')
            .setDescription('The user to give points to')
            .setRequired(true))
        .addIntegerOption(option => option.setName('amount')
            .setDescription('The amount of points to give')
            .setRequired(true)),
	async execute(interaction) {
		const userID = interaction.user.id;
		const points = await getPoints(userID);
        // If the user doesn't exist, return
		if (!points) {
			await interaction.reply("You don't have an account! Please run the `start` command.");
			return;
		}
        // Get the user to give points to
        const user = interaction.options.getUser('user');
        // Get the amount of points to give
        const amount = interaction.options.getInteger('amount');
        // If the user doesn't exist, return
        if (!user) {
            await interaction.reply("That user doesn't have an account!");
            return;
        }
        // If the amount is less than 1, return
        if (amount < 1) {
            await interaction.reply("Please give at least 1 point!");
            return;
        }
        // If the user is the same as the giver, return
        if (user.id === userID) {
            await interaction.reply("You can't give points to yourself!");
            return;
        }
        // Give the points
        await addPoints(user.id, amount);
        await interaction.reply(`You gave ${amount} points to ${user.username}!`);
    },
};
