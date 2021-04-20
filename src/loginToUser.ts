import { ICredentials } from './models/credentials';
import { IEntry } from './models/entry';

export function loginToUser(params: ICredentials, db: Array<IEntry>): IEntry | undefined {
    for (let entity of db) {
        if (entity.username === params.username && entity.password === params.password) {
            return entity;
        }
    }
    return undefined;
}

