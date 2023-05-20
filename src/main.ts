import dotenv from "dotenv"
dotenv.config();

import { Client, Events, GatewayIntentBits, REST, SlashCommandBuilder, Routes, EmbedBuilder } from "discord.js"

import { images } from "../images.json"

const client = new Client({ intents: GatewayIntentBits.Guilds });
const rest = new REST().setToken(process.env.TOKEN!);

const huxCommand = new SlashCommandBuilder().setName("hux").setDescription("Outputs a random Image of Hux");

(async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), { body: [ huxCommand.toJSON() ] })
    } catch (error) {
        console.log(error);
    }
})();

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);
})

client.on(Events.InteractionCreate, i => {
    if (!i.isChatInputCommand()) return;

    let n = getRandomInt(0, images.length - 1)

    const huxEmbed = new EmbedBuilder()
    .setImage(images[n])
    
    i.reply({embeds: [huxEmbed]})    
})

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.login(process.env.TOKEN)