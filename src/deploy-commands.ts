import { REST, Routes } from "discord.js";

const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command folders from the commands directory
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory
	const commandsPath = path.join(foldersPath, folder);
	if (fs.existsSync(commandsPath) && fs.lstatSync(commandsPath).isDirectory()) {
		const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));
		// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath).default;
			if ('data' in command && 'run' in command) {
				commands.push(command.data.toJSON());
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "run" property.`);
			}
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// Deploy commands
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		) as Array<unknown>;

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();