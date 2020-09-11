/* Imports */

import { Client, Message, MessageAttachment, MessageEmbed } from 'discord.js';
import { Authenticator } from './bakalari-api/auth'
import { TimeTable } from './bakalari-api/timetable'
require('dotenv').config()

/* Declarations */
let timings = { start: Date.now() }
const client: Client = new Client();
const authenticator: Authenticator = new Authenticator(process.env.BAK_USERNAME, process.env.BAK_PASSWORD)
const timeTable: TimeTable = new TimeTable(authenticator, client)

client.on('ready', () => {
	console.log(`Bot logged in ${Date.now() - timings.start}ms as ${client.user.username} in ${client.guilds.cache.size} guilds`);
});

client.login(process.env.DISCORD_TOKEN);