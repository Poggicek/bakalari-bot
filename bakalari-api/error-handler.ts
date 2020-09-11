import { Error } from '../types/error';

enum Errors {
	invalid_client = "Incorrect username or password",
}

export function throwError (err: Error) {
	err.translated = (<any>Errors)[err.error]
	throw new Error(`${err.translated} (${err.error_description})` || `Undocumented error: ${err.error} (${err.error_description})`);
}