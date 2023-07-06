const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Roll nDn dice!')
		.addIntegerOption(option =>
			option.setName('number')
				.setDescription('The number of dice to roll')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('sides')
				.setDescription('The number of sides on each die')
				.setRequired(true)),
        async execute(interaction) {
			// Get the number of dice
			const number = interaction.options.getInteger('number');
			// Get the number of sides
			const sides = interaction.options.getInteger('sides');
			// Roll the dice
			const dice = [];
			for (let i = 0; i < number; i++) {
				dice.push(Math.floor(Math.random() * sides) + 1);
			}
			// Sum the dice
			const sum = dice.reduce((a, b) => a + b);
			// Reply with the result
			await interaction.reply(`You rolled ${sum}\n(${dice.join(', ')})`);
		},
};