import { User, AuthParams } from '../types/user';
import { throwError } from './error-handler';
import fetch from 'node-fetch';

export class Authenticator {
	user: User;

	constructor(username: string, password: string) {
		this.user = { username: username, password: password }

		this.login(this.user)
	}

	async login (user: User) {
		const params: AuthParams = { client_id: 'ANDR', grant_type: 'password', username: user.username, password: user.password };
		let res = await fetch(process.env.ENDPOINT + '/api/login', {
			method: 'POST', body: new URLSearchParams(<any>params).toString(),
		})

		let body = await (res.json())
		if (res.status == 400) {
			throwError(body)
		}

		this.user = { ...user, ...body }
		setTimeout(() => this.login(this.user), this.user.expires_in * 1000)
	}

	get data () {
		return this.user
	}

}