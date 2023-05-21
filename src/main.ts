import dotenv from "dotenv"
dotenv.config();

import { Client, Events, GatewayIntentBits, REST, SlashCommandBuilder, Routes, EmbedBuilder, ActivityType } from "discord.js"

import { images } from "../images.json"

const client = new Client({ intents: GatewayIntentBits.Guilds });
const rest = new REST().setToken(process.env.TOKEN!);


const huxCommand = new SlashCommandBuilder().setName("hux").setDescription("Outputs a random Image of Hux");

rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
    { body: [huxCommand.toJSON()] }
)
    .catch((e) => {
        console.log(e);
    })


client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);
    client.user?.setPresence({ activities: [{name: "with Hux"}], status: "online"})

})

client.on(Events.InteractionCreate, i => {
    if (!i.isChatInputCommand()) return;

    if (i.commandName === "hux") {
        let n = getRandomInt(0, images.length - 1)

        const huxEmbed = new EmbedBuilder()
            .setImage(images[n])

        i.reply({ embeds: [huxEmbed] })
    } else {
        i.reply({ ephemeral: true, content: "Not implemented yet!" })
    }
})

let previousNumber: number | null = null;


function getRandomInt(min: number, max: number): number {
    let randomNumber: number;

    do {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (randomNumber === previousNumber);

    previousNumber = randomNumber;
    return randomNumber;
}

client.login(process.env.TOKEN)