import fs from 'node:fs';
import path from 'node:path';
import { Command } from './Command';

export const Commands: Command[] = [];

const foldersPath = path.join(__dirname);
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	if (fs.existsSync(commandsPath) && fs.lstatSync(commandsPath).isDirectory()) {
		const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath).default;

			if ('data' in command && 'run' in command) {
				Commands.push(command);
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}
}
