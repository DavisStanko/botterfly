const { SlashCommandBuilder } = require('discord.js');
const { getPoints } = require('../../utils/db.js');
const { addPoints } = require('../../utils/db.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slots')
        .setDescription('Play slots!')
        .addIntegerOption(option =>
            option.setName('points')
                .setDescription('The amount of points to bet')
                .setRequired(true)),
    async execute(interaction) {
        const userID = interaction.user.id;
        const points = interaction.options.getInteger('points');
        // If the user doesn't exist, return
        if (!points) {
            await interaction.reply("You don't have an account! Please run the `start` command.");
            return;
        }
        const userPoints = await getPoints(userID);
        if (points > userPoints) {
            await interaction.reply({ content: 'You don\'t have enough points!', ephemeral: true });
        } else if (points <= 0) {
            await interaction.reply({ content: 'Please bet a positive amount of points!', ephemeral: true });
        } else {
            // Roll 3 numbers from 0 to 5
            const numbers = [];
            for (let i = 0; i < 3; i++) {
                numbers.push(Math.floor(Math.random() * 6));
            }
            // Convert the numbers to emojis
            const emojis = numbers.map(number => {
                switch (number) {
                    case 0:
                        return ':grapes:';
                    case 1:
                        return ':cherries:';
                    case 2:
                        return ':lemon:';
                    case 3:
                        return ':tangerine:';
                    case 4:
                        return ':watermelon:';
                    case 5:
                        return ':strawberry:';
                }
            }
            );
            // Check if all emojis are the same
            if (emojis[0] === emojis[1] && emojis[1] === emojis[2]) {
                await interaction.reply(`${emojis.join(' ')}\nYou won ${points * 5} points!`);
                await addPoints(userID, points * 5);
            // Check if two emojis are the same
            } else if (emojis[0] === emojis[1] || emojis[1] === emojis[2] || emojis[0] === emojis[2]) {
                await interaction.reply(`${emojis.join(' ')}\nYou won ${points * 2} points!`);
                await addPoints(userID, points * 2);
            }
            // Otherwise, the user lost
            else {
                await interaction.reply(`${emojis.join(' ')}\nYou lost ${points} points!`);
                await addPoints(userID, -points);
            }
        }
    }
};