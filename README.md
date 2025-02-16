# Discord-Bot

Botterfly is a Discord bot focused on fun and games! To add it to your server, [click here](https://discord.com/oauth2/authorize?client_id=1340496200952057866&permissions=2147483648&integration_type=0&scope=bot).

## Usage

All commands are slash commands and can be found by typing `/` in the chat. Typing `/help` will show a list of all commands and their usage.

### Account Commands

- `/start` - Create a new account. Run this command before any other commands.
- `/points` - Check your current points.
- `/leaderboard` - See the top users and their points.
- `/income` - Claim free points every 30 minutes.
- `/give` - Give points to another user.

### Game Commands

- `/trivia` - Start a trivia game. Win points by answering questions correctly.
- `/roulette` - Wager points on a game of roulette.
- `/slots` - Wager points on a game of 3 column slots.
- `/roll` - Roll dice in the format `#d#` (ex. `1d6`).

### API Commands

- `/reddit` - Get a random post from the specified subreddit.
- `/weather` - Get the current weather for the specified city.
- `/news` - Get a trending news article from the specified country.

### Utility Commands

- `/help` - Show a list of all commands.
- `/info` - Show information about the bot.
- `/invite` - Get an invite link for the bot.
- `/ping` - Check the bot's latency.

## History

This project was originally created in 2018 as a way to learn Python and as such it was made with `Discord.py`. I have since rewritten it in `Discord.js` due to it's more active development and better documentation. The original repo can be found here: [DavisStanko/Discord-Bot](https://github.com/DavisStanko/Discord-Bot)

## Self Hosting

If you'd like to run your own instance of the bot, you can fork this repository and host it yourself. The bot can be run using PM2 for process management:

1. Install PM2 globally:

```bash
npm install pm2 -g
```

2. Start the bot:

```bash
pm2 start index.js --name "discord-bot"
```

3. Other useful PM2 commands:

```bash
pm2 status              # Check status of all processes
pm2 logs discord-bot    # View bot logs
pm2 restart discord-bot # Restart the bot
pm2 stop discord-bot    # Stop the bot
```

Feel free to fork this project and make your own modifications. Contributions are welcome through pull requests!

## License

This project is licensed under the [GPL-3.0](LICENSE.md)
GNU General Public License - see the [LICENSE.md](LICENSE.md) file for
details.
