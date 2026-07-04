import { db } from './db';

export class KeyStorage {
    static async save(privateKey: CryptoKey) {
        const database = await db;
        await database.put('keys', privateKey, 'private-key');
    }
    static async get() {
        const database = await db;

        return database.get('keys', 'private-key') as Promise<
            CryptoKey | undefined
        >;
    }
    static async delete() {
        const database = await db;
        await database.delete('keys', 'private-key');
    }
}
