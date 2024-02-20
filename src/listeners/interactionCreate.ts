import { CommandInteraction, Client, Interaction, Events } from 'discord.js';
import { Commands } from '../commands/Commands';

export default (client: Client): void => {
    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isUserContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(command => command.data.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: 'An error has occurred' });
        return;
    }

    slashCommand.run(client, interaction);
};
