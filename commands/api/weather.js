const { SlashCommandBuilder } = require('discord.js');

// Load .env file
require('dotenv').config();
const token = process.env.WEATHER_API_KEY

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Check the weather!')
        .addStringOption(option =>
            option.setName('city')
                .setDescription('The city to get the weather from')
                .setRequired(true)),
        async execute(interaction) {
            // Get the city
            let city = interaction.options.getString('city');
            // Get the latitude and longitude of the city
            const geocoding = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${token}`)
                .then(response => response.json())
                .then(body => body[0]);
            // Get the weather data
            const weather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${geocoding.lat}&lon=${geocoding.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${token}`)
                .then(response => response.json())
                .then(body => body.current);
            // Convert the city to title case
            city = city.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            // Reply with the weather
            await interaction.reply(`${city} is ${weather.temp}°C with ${weather.weather[0].description}.`);
        },
};