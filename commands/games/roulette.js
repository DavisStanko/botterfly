const { SlashCommandBuilder } = require('discord.js');
const { getPoints } = require('../../utils/db.js');
const { addPoints } = require('../../utils/db.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roulette')
        .setDescription('Play roulette!')
        .addIntegerOption(option =>
            option.setName('points')
                .setDescription('The amount of points to bet')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('color')
                .setDescription('The color to bet on (red, black, or green)')
                .setRequired(true)
                .addChoices(
                    { name: 'Red', value: 'red' },
                    { name: 'Black', value: 'black' },
                    { name: 'Green', value: 'green' },
                )),
    async execute(interaction) {
        const userID = interaction.user.id;
        const points = interaction.options.getInteger('points');
        const color = interaction.options.getString('color');
        const userPoints = await getPoints(userID);
        if (points > userPoints) {
            await interaction.reply({ content: 'You don\'t have enough points!', ephemeral: true });
        } else if (points <= 0) {
            await interaction.reply({ content: 'Please bet a positive amount of points!', ephemeral: true });
        } else {
            const randomNumber = Math.floor(Math.random() * 37);
            if (randomNumber === 0) {
                // Green
                if (color === 'green') {
                    await interaction.reply(`The ball landed on green!\nYou won ${points * 35} points.`);
                    await addPoints(userID, points * 35);
                } else {
                    await interaction.reply(`The ball landed on green!\nYou lost ${points} points.`);
                    await addPoints(userID, -points);
                }
            } else if (randomNumber % 2 === 0) {
                // Black
                if (color === 'black') {
                    await interaction.reply(`The ball landed on black!\nYou won ${points} points.`);
                    await addPoints(userID, points);
                } else {
                    await interaction.reply(`The ball landed on black!\nYou lost ${points} points.`);
                    await addPoints(userID, -points);
                }
            } else {
                // Red
                if (color === 'red') {
                    await interaction.reply(`The ball landed on red!\nYou won ${points} points.`);
                    await addPoints(userID, points);
                } else {
                    await interaction.reply(`The ball landed on red!\nYou lost ${points} points.`);
                    await addPoints(userID, -points);
                }
            }
        }
    }
};