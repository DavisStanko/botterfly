const { SlashCommandBuilder } = require('discord.js');

// Load .env file
require('dotenv').config();
const token = process.env.NEWS_API_KEY

module.exports = {
    data: new SlashCommandBuilder()
        .setName('news')
        .setDescription('Check the news!')
        .addStringOption(option =>
            option.setName('country_code')
                .setDescription('The city to get the weather from')
                .setRequired(false)),
    async execute(interaction) {
        // If the country code is not provided, default to US
        if (!interaction.options.getString('country_code')) {
            countryCode = 'US';
        } else {
            // Get the country code
            countryCode = interaction.options.getString('country_code');
        }
        // Get the news data
        const news = await fetch(`https://newsdata.io/api/1/news?apikey=${token}&country=${countryCode}`)
            .then(response => response.json())
            .then(body => body.results);
        // Get one random news article
        const randomNews = news[Math.floor(Math.random() * news.length)];
        // Reply with the news
        try {
            await interaction.reply(`${randomNews.title} ${randomNews.link}`);
        } catch (TypeError) {
            await interaction.reply('Invalid country code!');
        }
    },
};