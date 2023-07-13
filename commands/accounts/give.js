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
        const recipient = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');
        // Check if recipient has an account
        if (!await getPoints(recipient.id)) {
            return interaction.reply({ content: 'That user does not have an account!', ephemeral: true });
        }
        // Check if user has enough points
        if (points < amount) {
            return interaction.reply({ content: 'You do not have enough points!', ephemeral: true });
        }
        // Check if amount is positive
        if (amount <= 0) {
            return interaction.reply({ content: 'You must give a positive amount of points!', ephemeral: true });
        }
        // Give points
        await addPoints(userID, -amount);
        await addPoints(recipient.id, amount);
        return interaction.reply({ content: `You gave ${recipient.username} ${amount} points!`, ephemeral: true });
    },
};