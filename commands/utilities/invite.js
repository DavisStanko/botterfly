const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Replies with the bot's invite link!"),
  async execute(interaction) {
    await interaction.reply(
      "https://discord.com/oauth2/authorize?client_id=1340496200952057866&permissions=2147483648&integration_type=0&scope=bot"
    );
  },
};
