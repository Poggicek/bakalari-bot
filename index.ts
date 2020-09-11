/* Imports */

import { Client } from 'discord.js';
import Api from './bakalari-api/api'
import { TimeTable } from './bakalari-api/timetable'
require('dotenv').config()

/* Declarations */
let timings = { start: Date.now() }
let timeTable: TimeTable
const client: Client = new Client();

/* Events */
client.on('ready', () => {
	console.log(`Bot logged in ${Date.now() - timings.start}ms as ${client.user.username} in ${client.guilds.cache.size} guilds`);
});

Api.events.on('login', () => {
	console.log(`Successfuly logged into ${process.env.ENDPOINT} in ${Date.now() - timings.start}ms`)
	timeTable = new TimeTable(client)
})

/* Login */
Api.login({ username: process.env.BAK_USERNAME, password: process.env.BAK_PASSWORD })
client.login(process.env.DISCORD_TOKEN);