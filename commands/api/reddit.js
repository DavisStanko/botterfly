const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reddit')
		.setDescription('Replies with a random meme!')
		.addStringOption(option =>
			option.setName('subreddit')
				.setDescription('The subreddit to get the meme from')
				.setRequired(true)),
        async execute(interaction) {
			// Get the subreddit
			const subreddit = interaction.options.getString('subreddit');
			// Fetch JSON data
			const url = await fetch(`https://meme-api.com/gimme/${subreddit}`)
				.then(response => response.json())
				.then(body => body.url);
			// Reply with the meme
			await interaction.reply(url);
		},
};