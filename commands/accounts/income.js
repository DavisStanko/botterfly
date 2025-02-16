const { SlashCommandBuilder } = require("discord.js");
const {
  addPoints,
  getIncomeTimestamp,
  updateIncomeTimestamp,
} = require("../../utils/db.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("income")
    .setDescription("Claim your income! (100 points every 30 minutes)"),
  async execute(interaction) {
    const userID = interaction.user.id;
    try {
      const incomeTimestamp = await getIncomeTimestamp(userID);

      if (incomeTimestamp === null) {
        await interaction.reply(
          "You don't have an account! Please run the `start` command."
        );
        return;
      }

      const now = Date.now();
      const timeDifference = now - incomeTimestamp;
      const minutesPassed = Math.floor(timeDifference / 60000);
      const minutesLeft = 30 - minutesPassed;

      if (minutesLeft <= 0) {
        try {
          // Update the income timestamp first
          await updateIncomeTimestamp(userID, now);
          // Then add points
          await addPoints(userID, 100);
          await interaction.reply(
            "You have claimed your income of 100 points!"
          );
        } catch (error) {
          console.error("Error updating income:", error);
          await interaction.reply(
            "An error occurred while claiming your income."
          );
        }
      } else {
        await interaction.reply(
          `You can claim your income in ${minutesLeft} minutes!`
        );
      }
    } catch (error) {
      console.error("Error in income command:", error);
      await interaction.reply(
        "An error occurred while processing your command."
      );
    }
  },
};
