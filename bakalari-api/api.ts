import { User } from '../types/user';
import { Authenticator } from './auth'
import { EventEmitter } from 'events'

const eventEmitter = new EventEmitter();

const authenticator: Authenticator = new Authenticator()

class Api {

	login (user: User) {
		authenticator.login(user);
	}

	get user () {
		return authenticator.user;
	}

	get events () {
		return eventEmitter;
	}

}

export default new Api()