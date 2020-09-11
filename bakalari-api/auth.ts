import { User, AuthParams } from '../types/user';
import { throwError } from './error-handler';
import Api from './api'
import fetch from 'node-fetch';

export class Authenticator {
	user: User;

	async login (user: User, looped?: Boolean) {
		const params: AuthParams = { client_id: 'ANDR', grant_type: 'password', username: user.username, password: user.password };
		let res = await fetch(process.env.ENDPOINT + '/api/login', {
			method: 'POST', body: new URLSearchParams(<any>params).toString(),
		})

		let body = await (res.json())
		if (res.status == 400) {
			throwError(body)
		}

		this.user = { ...user, ...body }

		if (!looped) {
			Api.events.emit('login')
		}

		setTimeout(() => this.login(this.user, true), this.user.expires_in * 1000)
	}

	get data () {
		return this.user
	}

}