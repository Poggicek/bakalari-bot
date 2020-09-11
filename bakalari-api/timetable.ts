import { User } from '../types/user';
import Api from './api';
import fetch from 'node-fetch';
const dateFormat = require('dateformat');
let currentData: any = {}

import { TextChannel, MessageEmbed } from 'discord.js';

export class TimeTable {
	user: User;
	client: any

	constructor(client: any) {
		this.client = client

		this.checkTimetable()
		setInterval(() => {
			this.checkTimetable()
		}, 900000)
	}

	async checkTimetable () {
		if (!Api.user.access_token) return

		let res = await fetch(process.env.ENDPOINT + `/api/3/timetable/actual?date=${dateFormat(new Date(), "yyyy-mm-dd")}`, {
			method: 'GET', headers: { Authorization: 'Bearer ' + Api.user.access_token },
		})

		let body = await (res.json())
		if (!currentData.Hours) return currentData = body
		body.Days.forEach((r: any, i: any) => {
			r.Atoms.forEach((hour: any, x: any) => {
				if (JSON.stringify(currentData.Days[i].Atoms[x].Change) !== JSON.stringify(hour.Change)) {
					if (['Removed', 'Canceled'].includes(hour.Change?.ChangeType))
						this.manageMessage(currentData.Days[i].Atoms[x], hour, body)
				}
			})
		})
	}

	manageMessage (before: any, after: any, body: any) {
		const messageEmbed = new MessageEmbed()
			.setTitle('')
			.setDescription(`V **${new Date(after.Change.Day).toLocaleString('cs-Cz', { weekday: 'long', day: 'numeric', month: 'long' })}** odpadá ${before.Change.Hours} (${before.Change.Time}) **${body.Subjects.filter((r: any) => r.Id == before.SubjectId)[0].Name}**`)
		this.client.channels.fetch(process.env.DISCORD_ANNOUNCE_CHANNEL).then((channel: TextChannel) => {
			channel.send('https://cdn.frankerfacez.com/emoticon/61496/4')
			channel.send(messageEmbed)
		})
	}

}