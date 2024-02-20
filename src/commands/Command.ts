import { CommandInteraction, ChatInputApplicationCommandData, Client, SlashCommandBuilder } from 'discord.js';

export interface Command extends ChatInputApplicationCommandData {
    data: SlashCommandBuilder;
    run: (client: Client, interaction: CommandInteraction) => void;
}
