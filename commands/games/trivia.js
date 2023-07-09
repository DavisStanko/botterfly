const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { checkUserIDExists } = require('../../utils/db.js');
const { addPoints } = require('../../utils/db.js');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function htmlDecode(input) {
    var doc = new JSDOM(input);
    return doc.window.document.body.textContent;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trivia')
        .setDescription('Play trivia!'),
    async execute(interaction) {
        const userID = interaction.user.id;
        // Check if the user exists
        const userExists = await checkUserIDExists(userID);
        // If the user doesn't exist, return
        if (!userExists) {
            await interaction.reply("You don't have an account! Please run the `start` command.");
            return;
        }
        const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
        const data = await response.json();
        let question = data.results[0].question;
        let correctAnswer = data.results[0].correct_answer;
        let incorrectAnswers = data.results[0].incorrect_answers;
        let answers = shuffle([...incorrectAnswers, correctAnswer]);

        // html unescape
        question = htmlDecode(question);
        correctAnswer = htmlDecode(correctAnswer);
        answers = answers.map(htmlDecode);
        
        // Create the action row with answer buttons
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('0')
                    .setLabel(answers[0])
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('1')
                    .setLabel(answers[1])
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('2')
                    .setLabel(answers[2])
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('3')
                    .setLabel(answers[3])
                    .setStyle(ButtonStyle.Secondary),
            );
        // Reply with the question and answer buttons
        await interaction.reply({ content: "Answer this question in 15 seconds:\n" + question, components: [row] });
        // Create a filter to only listen for button clicks from the user who used the command
        const filter = i => i.user.id === userID;
        // Create a collector
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        // Listen for button clicks
        collector.on('collect', async i => {
            // If the user clicks an answer
            if (i.customId === answers.indexOf(correctAnswer).toString()) {
                await addPoints(userID, 10);
                await i.reply("Correct! You got 10 points!\nThe correct answer was: " + correctAnswer);
            } else {
                // Reply with a message saying they got it wrong
                await i.reply("Incorrect!\nThe correct answer was: " + correctAnswer);
            }
        }
        );
        // Listen for the collector to end
        collector.on('end', async collected => {
            // If the collector ends because of a timeout
            if (collected.size === 0) {
                // Reply with a message saying the user timed out
                await interaction.followUp("You didn't answer in time!\nThe correct answer was: " + correctAnswer);
            }
        }
        );
    },
};
