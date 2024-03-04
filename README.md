# Dota 2 Discord Bot: Match Tracker and Profile Viewer

The Dota 2 Discord bot is designed to enhance your Dota 2 gaming experience by providing real-time information about your friends' recent matches, profiles, and ranks. Whether you're curious about their latest victories or want to strategize together, this bot has you covered.

## Features
1. **Recent Match Tracking**:
   - Get updates on your friends' most recent Dota 2 matches.
   - View match details, including heroes played, KDA, and game duration.

2. **Player Profiles**:
   - Retrieve detailed information about a player's Dota 2 profile.
   - Access stats, win rates, and favorite heroes.

3. **Rank Insights**:
   - Check your friends' MMR (Matchmaking Rating) and rank.
   - Stay informed about their progress in ranked matches.

## Commands
- `!last <player>`: Fetch the most recent match details for a specific player.
- `!profile <player>`: Display the Dota 2 profile of the specified player.
- `!rank <player>`: Retrieve the current rank and MMR for a player.

## Setup
1. **Create a Discord Bot**:
   - Visit the [Discord Developer Portal](https://discord.com/developers/docs/getting-started) and create a new bot.
   - Obtain your bot token.

2. **Clone this Repository**:
   - Clone this repository to your local machine.

3. **Configure Environment Variables**:
   - Create a `.env` file and add your tokens and server/channel ID:
     ```
     DISCORD_TOKEN=your-bot-token-here
     CLIENT_ID=your-discord-client-id
     GUILD_ID=discord-server-id
     TRACKER_CHANNEL_ID=discord-channel-id
     STRATZ_TOKEN=your-stratz-api-token-here
     ```

4. **Install Dependencies**:
   - Run `npm install` to install the necessary packages.

5. **Deploy commands to your server**:
   - Execute `npm deploy` to add bot commands to your server.

6. **Run the Bot**:
   - Execute `npm start` to start the bot.

## Contributing
Feel free to contribute to this project by adding new features, improving existing ones, or fixing bugs. Submit a pull request, and let's make this Dota 2 bot even better!

## Acknowledgments
Special thanks to the Dota 2 community and Valve for their amazing game!
