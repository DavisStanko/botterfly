// Require the necessary discord.js classes
const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load commands
client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.warn(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// Load events
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Express server setup
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'https://davisstanko.com',
  methods: ['GET'],
  credentials: false
}));

let botStats = { guilds: 0, users: 0 };

function updateBotStats() {
  botStats.guilds = client.guilds.cache.size;
  botStats.users = client.guilds.cache.reduce(
    (acc, guild) => acc + guild.memberCount,
    0
  );
}

app.get("/botstats", (req, res) => {
  res.json(botStats);
});

// Start bot and web server
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  updateBotStats();
  setInterval(updateBotStats, 60 * 60 * 1000);

  app.listen(PORT, '127.0.0.1', () => {
    console.log(`Stats server listening on http://127.0.0.1:${PORT}`);
  });
});

client.login(token);
