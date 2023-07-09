const { Events } = require('discord.js');
const sqlite3 = require('sqlite3').verbose();

const dbFilePath = './points.db';
const db = new sqlite3.Database(dbFilePath);

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
        // get connected guilds and ids
        const guilds = client.guilds.cache.map(guild => guild.name);
        const guildIds = client.guilds.cache.map(guild => guild.id);
        const guildsAndIds = guilds.map((guild, index) => `${guild} (${guildIds[index]})`);
        // log connected guilds and ids
        console.log(`Connected to:\n${guildsAndIds.join('\n')}`);
        // create points table if it doesn't exist
        db.run('CREATE TABLE IF NOT EXISTS points (username TEXT, userID TEXT, points INTEGER, incomeTimestamp INTEGER)');
    },
};
