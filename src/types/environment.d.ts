declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_TOKEN: string;
            CLIENT_ID: string;
            GUILD_ID: string;
            TRACKER_CHANNEL_ID: string;
            STRATZ_TOKEN: string;
        }
    }
}
  
export {}