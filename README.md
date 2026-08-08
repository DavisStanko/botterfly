# Botterfly

Versatile Discord bot with extensive commands for entertainment and utility. Features a competitive economy system, minigames, and real-time data fetching.

Note: the official hosted version is no longer online. This repository is now maintained as an open-source project, for anyone who wants to host their own instance or learn from the codebase.

<p align="center">
  <img src="demo.png" alt="Botterfly screenshot" />
</p>

## How to use

All commands are slash commands. Type `/` in a Discord chat to find them. Type `/help` to see a list of all commands and their usage.

### Account Commands

- `/start` — create a new account. Run this before any other commands.
- `/points` — check your current points.
- `/leaderboard` — see the top users and their points.
- `/income` — claim free points every 30 minutes.
- `/give` — give points to another user.

### Game Commands

- `/trivia` — start a trivia game. Win points by answering questions correctly.
- `/roulette` — wager points on a game of roulette.
- `/slots` — wager points on a game of 3-column slots.
- `/roll` — roll dice in the format `#d#` (example: `1d6`).

### API Commands

- `/reddit` — get a random post from a specified subreddit.
- `/weather` — get the current weather for a specified city.
- `/news` — get a trending news article from a specified country.

### Utility Commands

- `/help` — show a list of all commands.
- `/info` — show information about the bot.
- `/invite` — get an invite link for the bot.
- `/ping` — check the bot's latency.

### Self-Hosting

To run your own instance, fork this repository. Run the bot with PM2 for process management:

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

Contributions are welcome through pull requests.

## How it works

This project began in 2018, as a way to learn Python. It was built with `Discord.py`. It has since been rewritten in `Discord.js`, due to more active development and better documentation. The original repository is at [DavisStanko/robot](https://github.com/DavisStanko/robot).

While running, the bot also hosts a small web server on port 3001. This server exposes bot statistics, like the number of servers and users, as a JSON object. Access it with a GET request to:

```
http://<your-server-ip>:3001/botstats
```

## License

This project uses the GPL-3.0 license. See the [LICENSE.md](LICENSE.md) file for details.