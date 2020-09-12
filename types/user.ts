export interface User {
	username: string;
	password: string;
	access_token?: string;
	refresh_token?: string;
	expires_in?: number;
	"bak:UserId"?: number;
}

export interface AuthParams {
	client_id: string;
	grant_type: string;
	username?: string;
	password?: string;
	refresh_token?: string;
}